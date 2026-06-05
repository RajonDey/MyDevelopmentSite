/** Sample FAQ items — used in design-system preview; pages import scoped copy in Phase 10+ */

export type FaqItem = {
  question: string;
  answer: string;
};

export const sampleFaqItems: FaqItem[] = [
  {
    question: "Who do you work with?",
    answer:
      "Primarily US marketing agencies (5–50 people). We also deliver for service businesses, education brands, and founders. Async-friendly with overlap for calls.",
  },
  {
    question: "Are prices fixed or hourly?",
    answer:
      "Fixed project tiers from $1,000–$5,000+. Scope is confirmed on the free review call before you commit.",
  },
  {
    question: "What tools do you connect?",
    answer:
      "HubSpot, Slack, Calendly, email, GA4, and n8n automations. We scope one or two connections per website tier.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Starter website tiers ship in about 10 days. Standard projects run 2–3 weeks. Timelines are fixed in the proposal.",
  },
] as const;

export const sampleStats = [
  { value: "$1K+", label: "Project floor" },
  { value: "2–4 wk", label: "Typical delivery" },
  { value: "1 CRM", label: "Connected on Standard" },
  { value: "Remote", label: "Global team" },
] as const;

export const sampleBentoItems = [
  {
    title: "Forms that reach your CRM",
    description:
      "Stop copying leads from email. We wire site forms to HubSpot, Slack, or Calendly.",
    className: "md:col-span-2",
  },
  {
    title: "Fixed tiers",
    description: "Round-number pricing on every service page — no surprise invoices.",
  },
  {
    title: "Headless CMS",
    description: "Blog and key pages you can edit without breaking the build.",
  },
  {
    title: "Automation sprints",
    description: "Lead capture, Slack alerts, and follow-up reminders in n8n.",
    className: "md:col-span-2",
  },
] as const;
