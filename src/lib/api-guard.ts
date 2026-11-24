import { NextResponse } from "next/server";
import { site } from "@/content/site";

const MAX_BODY_BYTES = 20 * 1024;

/** Browsers always send Origin on cross-origin and same-origin POSTs; accept the site's own origins and localhost in development. */
function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;
  if (!origin) return true; // non-browser clients (no Origin) are still bound by validation and the rate limit
  try {
    const host = new URL(origin).host;
    const own = [new URL(site.url).host, new URL(site.url).host.replace(/^www\./, ""), request.headers.get("host") ?? ""];
    return own.includes(host) || (process.env.NODE_ENV !== "production" && /^localhost(:\d+)?$/.test(host));
  } catch {
    return false;
  }
}

/**
 * Shared checks for the JSON POST endpoints: same-origin (CSRF), JSON content type, and a body size cap.
 * Returns the parsed body, or a ready-made error response.
 */
export async function readJsonBody(request: Request): Promise<{ body: unknown } | { error: NextResponse }> {
  if (!originAllowed(request)) return { error: NextResponse.json({ message: "Forbidden." }, { status: 403 }) };
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return { error: NextResponse.json({ message: "Unsupported content type." }, { status: 415 }) };
  }
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return { error: NextResponse.json({ message: "Request too large." }, { status: 413 }) };
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return { error: NextResponse.json({ message: "Request too large." }, { status: 413 }) };
    return { body: JSON.parse(text) };
  } catch {
    return { error: NextResponse.json({ message: "Invalid request." }, { status: 400 }) };
  }
}
