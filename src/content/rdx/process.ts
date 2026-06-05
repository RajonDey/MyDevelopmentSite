/** Process page — Phase 12 expanded */

export type ProcessStepDetail = {
  step: string;
  title: string;
  description: string;
  timeline: string;
  youDo: readonly string[];
  weDo: readonly string[];
  deliverables: readonly string[];
};

export const processPageContent = {
  hero: {
    eyebrow: "Process",
    title: "Fixed scope from review call to handoff",
    description:
      "Every project follows four steps: clear roles, round-number pricing, and a documented handoff.",
  },
  pricingLink: {
    label: "View public tier pricing",
    href: "/services",
  },
  steps: [
    {
      step: "1",
      title: "Review",
      description: "How your site and lead flow work today",
      timeline: "15-minute call",
      youDo: [
        "Share your site URL and current tools (CRM, forms, Slack)",
        "Walk through where leads get stuck today",
      ],
      weDo: [
        "Map forms, inboxes, and CRM handoffs",
        "Identify 3 specific fixes, even if you do not hire us",
      ],
      deliverables: ["Call notes with recommended next steps"],
    },
    {
      step: "2",
      title: "Plan",
      description: "Fixed scope, timeline, and tool connections",
      timeline: "1 business day",
      youDo: [
        "Confirm tier, pages or workflows, and connection slots",
        "Approve written scope before build starts",
      ],
      weDo: [
        "Send fixed proposal with tier price in round numbers",
        "Document pages, automations, integrations, and timeline",
      ],
      deliverables: [
        "Written scope doc",
        "Tier price ($1,000 – $5,000+)",
        "Kickoff date",
      ],
    },
    {
      step: "3",
      title: "Build",
      description: "Site and/or automations against approved scope",
      timeline: "2–4 weeks typical",
      youDo: [
        "Provide content access and tool credentials",
        "Review staging on agreed checkpoints",
      ],
      weDo: [
        "Ship site pages and/or n8n workflows",
        "Wire forms to CRM, Slack, or booking tools",
        "No surprise add-ons mid-sprint",
      ],
      deliverables: [
        "Staging site or live automations",
        "Connection test records",
        "Change log against scope",
      ],
    },
    {
      step: "4",
      title: "Handoff",
      description: "Docs, walkthrough, and support window",
      timeline: "14 days support (tier-based)",
      youDo: [
        "Join walkthrough call",
        "Confirm your team can run day-one ops",
      ],
      weDo: [
        "Deliver handoff docs and Loom walkthrough",
        "Fix launch issues inside support window",
      ],
      deliverables: [
        "Handoff documentation",
        "Walkthrough recording",
        "Support window dates",
      ],
    },
  ] satisfies ProcessStepDetail[],
} as const;
