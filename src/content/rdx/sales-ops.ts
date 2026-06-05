/** Sales ops copy — Phase 13 */

export const salesOpsContent = {
  replySla: "1 business day",
  calendlyEventLabel: "15-minute Website & Workflow Review",
  prepQuestions: [
    "Your site URL and who owns forms today",
    "Which CRM or inbox leads land in now",
    "One workflow step you wish happened automatically",
  ],
  thankYou: {
    standard: {
      title: "Review request received",
      body: "We'll reply within 1 business day with next steps and 3 specific fixes for your site or lead flow.",
    },
    qualified: {
      title: "Review request received",
      body: "Your scope looks like a fit for a short review call. Book a slot below, or wait for our email. We'll still send written fixes within 1 business day.",
      calendlyIntro: "Optional: book your 15-minute review now",
    },
  },
  emails: {
    confirmSubject: "We received your RDX review request",
    adminQualifiedTag: "QUALIFIED — offer review call",
    adminStandardTag: "Reply by email — review call optional",
  },
} as const;

export function getCalendlyUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ||
    "https://calendly.com/rajondey"
  );
}

export function getBusinessEmail(): string {
  return process.env.BUSINESS_EMAIL?.trim() || "contact@rajondey.com";
}
