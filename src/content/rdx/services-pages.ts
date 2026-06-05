import type { FaqItem } from "./design-system-demos";

/** Per-page copy for Phase 11 service routes */

export const servicesOverviewContent = {
  hero: {
    badge: "From $1,000",
    headline: "Fixed-scope builds for growth teams.",
    subhead:
      "Websites, lead automation, and AI tools with public tier pricing. Primary focus: US marketing agencies. We also deliver for service businesses and education brands.",
    primaryCta: { label: "Free Website & Workflow Review", href: "/start" },
    secondaryCta: { label: "Estimate scope", href: "/start?step=scope" },
    footnote: "Most projects start at Standard · $2,500–$3,000",
  },
  standardHint:
    "Most clients start at Standard: Website $3,000 or Automation $2,500.",
  faq: [
    {
      question: "Do you show exact prices on the site?",
      answer:
        "Yes. Every service page lists full tiers in round numbers ($1,000, $3,000, etc.). Custom scope is quoted on the review call.",
    },
    {
      question: "Can I combine a website and automations?",
      answer:
        "Yes. Website Standard + Automation Standard bundle is $5,000 (save $500 vs buying separately). Scoped on your review call.",
    },
    {
      question: "What's not included in project tiers?",
      answer:
        "Copywriting, unlimited revisions, ads, SEO retainers, and open-ended support. Care plans from $500/mo cover post-launch needs.",
    },
    {
      question: "How do I pick the right tier?",
      answer:
        "Use the scope tool on /start. It suggests a tier based on pages, connections, or workflow count. We confirm exact scope on the call.",
    },
  ] satisfies FaqItem[],
} as const;

export const serviceOutcomeBySlug = {
  "agency-website":
    "A live marketing site with forms wired to your CRM or Slack. Reps stop copying leads from email.",
  "lead-automation":
    "Manual inbox-to-CRM steps replaced with automated capture, alerts, and follow-ups.",
  "ai-chat-search":
    "FAQ chat or semantic search on your content. Scoped fixed project; API usage billed separately.",
} as const;

export const agencyWebsiteContent = {
  hero: {
    badge: "From $1,000",
    headline: "Forms that reach your CRM.",
    subhead:
      "We build your agency marketing site and connect every form to HubSpot, Slack, Calendly, or email. Fixed tiers, no surprise invoices.",
    primaryCta: { label: "Free Website & Workflow Review", href: "/start?need=website" },
    secondaryCta: { label: "View all services", href: "/services" },
  },
  deliverables: [
    "Marketing pages on Next.js (tier-based page count)",
    "Form capture with field mapping to your tool",
    "Headless WordPress for blog and key editable pages (Standard+)",
    "GA4 baseline and conversion events (Standard+)",
    "Handoff docs, walkthrough, and support window",
  ],
  connectionsNote:
    "Pick one connection per slot: CRM capture · Slack/email alert · booking flow · follow-up trigger.",
} as const;

export const leadAutomationContent = {
  hero: {
    badge: "From $1,000",
    headline: "Stop copying leads into your CRM.",
    subhead:
      "We connect your forms, CRM, Slack, and follow-ups in n8n so new leads route to the right owner without manual steps.",
    primaryCta: { label: "Free Website & Workflow Review", href: "/start?need=automation" },
    secondaryCta: { label: "View all services", href: "/services" },
  },
  before: {
    title: "Before",
    steps: ["Form submit → shared inbox", "Rep copies into CRM", "Follow-up missed"],
  },
  after: {
    title: "After",
    steps: ["Form → CRM contact", "New lead → Slack alert", "48h no reply → reminder"],
  },
  standardExample: {
    title: "Standard tier example (3 workflows)",
    items: [
      "Website form → HubSpot contact with source tag",
      "New lead → dedicated Slack channel",
      "48 hours no reply → owner reminder workflow",
    ],
  },
} as const;

export const aiChatSearchContent = {
  hero: {
    badge: "From $3,000",
    headline: "AI chat and search for agency sites.",
    subhead:
      "FAQ bots, semantic site search, or a scoped custom tool. Fixed project pricing; you pay API usage separately.",
    primaryCta: { label: "Discuss on review call", href: "/start?interest=ai" },
    secondaryCta: { label: "Core services", href: "/services" },
  },
  advancedNote:
    "Advanced offer. Most agencies start with Website or Automation. AI projects are scoped after we review your content and traffic.",
  apiCallout:
    "Client pays API usage separately (OpenAI, Anthropic, etc.). We scope token budgets and guardrails on the review call.",
} as const;
