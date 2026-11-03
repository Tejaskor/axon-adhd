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

  const mail = sendMail({
    subject: `New contact form submission — ${data.firstName} ${data.lastName}`,
    replyTo: data.email,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<h2>New contact form submission</h2><table>${rows
      .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${k}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>`,
  });

  // The Make.com webhook is the system of record when configured; email is then a best-effort copy.
  const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    const [hook, mailResult] = await Promise.allSettled([
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          countryCode: data.countryCode,
          phone: data.phone,
          fullPhone: data.phone ? `${data.countryCode} ${data.phone}` : "",
          message: data.message,
          pageUrl: request.headers.get("referer") ?? "",
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(10_000),
      }).then((res) => {
        if (!res.ok) throw new Error(`Make webhook responded ${res.status}`);
      }),
      mail,
    ]);
    if (mailResult.status === "rejected") console.error("[contact] email copy failed", mailResult.reason);
    if (hook.status === "rejected") {
      console.error("[contact] webhook failed", hook.reason);
      return NextResponse.json({ message: "We couldn't send your message right now. Please email support@axonadhd.com." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  try {
    await mail;
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ message: "We couldn't send your message right now. Please email support@axonadhd.com." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
