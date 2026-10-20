import { NextResponse } from "next/server";
import { escapeHtml, sendMail } from "@/lib/mailer";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 600) } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Please correct the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  // Honeypot filled → pretend success so bots get no signal.
  if (data.company) return NextResponse.json({ ok: true });

  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "—";
  const rows: Array<[string, string]> = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", phone],
    ["Message", data.message || "—"],
  ];

  try {
    await sendMail({
      subject: `New contact form submission — ${data.firstName} ${data.lastName}`,
      replyTo: data.email,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2>New contact form submission</h2><table>${rows
        .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
        .join("")}</table>`,
    });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ message: "We couldn't send your message right now. Please email support@axonadhd.com." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
