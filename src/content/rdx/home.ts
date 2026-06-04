/** Homepage content — docs/RDX_Content_Copy_Bank.md */

export const homeContent = {
  hero: {
    headline: "RDX Technologies — websites and systems that keep leads moving.",
    subhead:
      "We build for marketing agencies, service businesses, and education brands — sites, forms, and CRM connections in fixed-scope projects. Most Standard builds ship in 2–4 weeks; larger scopes run 2–3 months with support when you need it.",
    primaryCta: {
      label: "Free Website & Workflow Review",
      href: "/start",
    },
    secondaryCta: {
      label: "View services",
      href: "/services",
    },
    footnote: "Global remote team",
  },
  priceFloorLabel: "From $1,000",
  services: {
    eyebrow: "Services",
    heading: "How we help growth teams",
    description:
      "Fixed tiers with public pricing — websites, automations, and AI tools.",
    viewAllLabel: "View all services",
  },
  work: {
    eyebrow: "Work",
    heading: "Selected work",
    description: "Representative builds with honest attribution — no inflated metrics.",
    viewAllLabel: "View all work",
    footnote: "From $1,000 · named client work and RDX products",
  },
  quote: {
    quote:
      "I'm extremely satisfied with the website created for Härlig Städ AB. The quotation form is smooth, and the whole experience was seamless from start to finish.",
    attribution: "Härlig Städ AB · Google review",
    marginalia: "Client delivery · Sweden · website & booking",
  },
  process: {
    eyebrow: "Process",
    heading: "How we work",
    description:
      "Review call → fixed proposal within 1 business day → build in 2–4 weeks for most Standard projects.",
  },
  finalCta: {
    headline: "Not sure where to start?",
    subhead:
      "Tell us how your site and lead process work today — we'll send 3 specific fixes (whether you hire us or not).",
    cta: {
      label: "Free Website & Workflow Review",
      href: "/start",
    },
  },
} as const;

export const processSteps = [
  {
    step: "1",
    title: "Review",
    description: "How your site and lead flow work today",
    timeline: "15-min call",
  },
  {
    step: "2",
    title: "Plan",
    description: "Fixed scope, timeline, and tool connections",
    timeline: "1 business day",
  },
  {
    step: "3",
    title: "Build",
    description: "Site and/or automations",
    timeline: "2–4 weeks",
  },
  {
    step: "4",
    title: "Handoff",
    description: "Docs, walkthrough, support window",
    timeline: "14 days support",
  },
] as const;
