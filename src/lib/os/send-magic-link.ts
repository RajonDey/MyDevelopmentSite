import { Resend } from "resend";
import { resendFromFallback } from "@/content/rdx/contact";
import {
  createOsMagicToken,
  resolveOsAllowlistedMember,
} from "@/lib/os/magic-link";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function siteOrigin(): string {
  return (
    process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

/**
 * Request an OS magic link. Always returns ok:true for allowlisted and
 * non-allowlisted emails (enumeration-safe). Only sends mail when allowed.
 */
export async function requestOsMagicLink(email: string): Promise<{
  ok: true;
  /** Dev-only verify URL when Resend is missing */
  devVerifyUrl?: string;
}> {
  const member = resolveOsAllowlistedMember(email);
  if (!member) {
    return { ok: true };
  }

  const token = await createOsMagicToken(member.email);
  const verifyUrl = `${siteOrigin()}/os/verify?token=${encodeURIComponent(token)}`;

  if (!resend) {
    if (process.env.NODE_ENV === "development") {
      console.info("[os-auth] Magic link (no RESEND_API_KEY):", verifyUrl);
      return { ok: true, devVerifyUrl: verifyUrl };
    }
    return { ok: true };
  }

  const from = process.env.FROM_EMAIL?.trim() || resendFromFallback;

  await resend.emails.send({
    from: `RDXHIVE OS <${from}>`,
    to: [member.email],
    subject: "Your RDXHIVE OS sign-in link",
    text: [
      "Sign in to RDXHIVE OS (core team only).",
      "",
      verifyUrl,
      "",
      "This link expires in 20 minutes and can only be used once (when DB tokens are enabled).",
      "If you did not request this, ignore the email.",
    ].join("\n"),
    html: `<p>Sign in to <strong>RDXHIVE OS</strong> (core team only).</p>
<p><a href="${verifyUrl}">Open RDXHIVE OS</a></p>
<p style="color:#666;font-size:13px">Expires in 20 minutes. If you did not request this, ignore the email.</p>`,
  });

  return { ok: true };
}
