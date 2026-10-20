import { NextResponse } from "next/server";
import { getNewsletterProvider } from "@/lib/newsletter";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid email." }, { status: 422 });
  if (parsed.data.company) return NextResponse.json({ ok: true });

  try {
    await getNewsletterProvider().subscribe(parsed.data.email);
  } catch (err) {
    console.error("[newsletter] subscribe failed", err);
    return NextResponse.json({ message: "Subscription failed. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
