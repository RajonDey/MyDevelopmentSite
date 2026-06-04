import { Resend } from "resend";
import type { SubmitLeadInput } from "@/types/rdx/lead";
import { isQualifiedForReviewCall } from "@/lib/lead-qualification";
import {
  getBusinessEmail,
  getCalendlyUrl,
  salesOpsContent,
} from "@/content/rdx/sales-ops";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function getFromAddress(): string {
  return process.env.FROM_EMAIL?.trim() || getBusinessEmail();
}

function formatPayload(payload: Record<string, string>): string {
  return (
    Object.entries(payload)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n") || "(no additional fields)"
  );
}

function subjectPrefix(formType: SubmitLeadInput["formType"]): string {
  return formType === "start" || formType === "audit"
    ? "RDX Review Request"
    : "RDX Contact Inquiry";
}

async function sendAdminLeadNotification(
  input: SubmitLeadInput,
  qualified: boolean
) {
  const prefix = subjectPrefix(input.formType);
  const tag = qualified
    ? salesOpsContent.emails.adminQualifiedTag
    : salesOpsContent.emails.adminStandardTag;

  const text = [
    `${prefix} — ${tag}`,
    "",
    `Agency: ${input.agencyName}`,
    `Contact: ${input.contactName}`,
    `Email: ${input.email}`,
    "",
    formatPayload(input.payload),
    "",
    qualified
      ? `Calendly: ${getCalendlyUrl()}`
      : "Follow up by email within 1 business day.",
  ].join("\n");

  await resend!.emails.send({
    from: `RDX Technologies <${getFromAddress()}>`,
    to: [getBusinessEmail()],
    replyTo: input.email,
    subject: `${prefix} — ${input.agencyName}`,
    text,
  });
}

async function sendLeadConfirmation(
  input: SubmitLeadInput,
  qualified: boolean
) {
  const calendlyUrl = getCalendlyUrl();
  const prep = salesOpsContent.prepQuestions.map((q) => `• ${q}`).join("\n");

  const text = [
    `Hi ${input.contactName},`,
    "",
    "Thanks for reaching out to RDX Technologies — we received your review request.",
    "",
    `We reply within ${salesOpsContent.replySla} with next steps and specific fixes for your site or lead workflow.`,
    "",
    ...(qualified
      ? [
          "Your scope may qualify for a free 15-minute review call.",
          `Book a time: ${calendlyUrl}`,
          "",
          "Come prepared with:",
          prep,
          "",
        ]
      : []),
    "If you have urgent questions, reply to this email.",
    "",
    "— RDX Technologies",
    getBusinessEmail(),
  ].join("\n");

  await resend!.emails.send({
    from: `RDX Technologies <${getFromAddress()}>`,
    to: [input.email],
    replyTo: getBusinessEmail(),
    subject: salesOpsContent.emails.confirmSubject,
    text,
  });
}

export async function sendLeadEmails(input: SubmitLeadInput): Promise<{
  sent: boolean;
  qualified: boolean;
}> {
  if (!resend) {
    return { sent: false, qualified: false };
  }

  const qualified = isQualifiedForReviewCall(input.payload);

  await sendAdminLeadNotification(input, qualified);
  await sendLeadConfirmation(input, qualified);

  return { sent: true, qualified };
}

/** @deprecated use sendLeadEmails */
export async function sendLeadNotification(input: SubmitLeadInput) {
  const result = await sendLeadEmails(input);
  return { sent: result.sent };
}
