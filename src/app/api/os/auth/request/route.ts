import { NextResponse } from "next/server";
import { requestOsMagicLink } from "@/lib/os/send-magic-link";
import { normalizeOsEmail } from "@/lib/os/team-allowlist";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ ok: true });
  }

  const email = normalizeOsEmail(body.email ?? "");
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: true });
  }

  try {
    const result = await requestOsMagicLink(email);
    return NextResponse.json(result);
  } catch {
    // Never leak whether send failed vs not allowlisted
    return NextResponse.json({ ok: true });
  }
}
