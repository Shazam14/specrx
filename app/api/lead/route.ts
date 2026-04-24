import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  fullName?: unknown;
  email?: unknown;
  message?: unknown;
  humanCheck?: unknown;
  startedAt?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max = 5000) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = asString(body.fullName, 200);
  const email = asString(body.email, 320);
  const message = asString(body.message, 4000);
  const humanCheck = asString(body.humanCheck, 10);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  if (!fullName || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (humanCheck !== "5") {
    return NextResponse.json({ error: "Quick check failed." }, { status: 400 });
  }
  if (startedAt && Date.now() - startedAt < 3000) {
    return NextResponse.json({ error: "Submission was too fast." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "leads@quadgrowth.com.au";
  const to = process.env.LEAD_EMAIL_TO ?? "ecuadra@quadgrowth.com.au";

  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY not set — enquiry logged only");
    console.info("[lead] payload", { fullName, email, message });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message || "(no message)").replace(/\n/g, "<br>");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New QuadGrowth enquiry — ${fullName}`,
    html: `
      <h2>New enquiry from quadgrowth.com.au</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong><br>${safeMessage}</p>
    `,
    text: [
      "New enquiry from quadgrowth.com.au",
      `Name: ${fullName}`,
      `Email: ${email}`,
      "",
      message || "(no message)",
    ].join("\n"),
  });

  if (error) {
    console.error("[lead] resend error", error);
    return NextResponse.json({ error: "Could not send enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
