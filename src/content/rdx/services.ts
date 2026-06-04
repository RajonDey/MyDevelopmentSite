import type {
  BudgetBand,
  ServiceOffer,
  ServiceOfferDetail,
} from "@/types/rdx";

/** Client-facing service menu — source: docs/RDX_Services_and_Pricing.md */

export const serviceOffers: ServiceOffer[] = [
  {
    id: "agency-website",
    slug: "agency-website",
    name: "Agency Website",
    subtitle:
      "A modern website with your forms connected to HubSpot, Slack, Calendly, or email.",
    startingPrice: 1000,
    tiers: [
      {
        id: "starter",
        label: "Starter",
        price: 1000,
        priceLabel: "$1,000",
      },
      {
        id: "standard",
        label: "Standard",
        price: 3000,
        priceLabel: "$3,000",
        recommended: true,
      },
      {
        id: "premium",
        label: "Premium",
        price: 5000,
        priceLabel: "$5,000",
      },
      {
        id: "custom",
        label: "Custom",
        price: null,
        priceLabel: "Quote",
      },
    ],
  },
  {
    id: "lead-automation",
    slug: "lead-automation",
    name: "Lead & CRM Automation",
    subtitle:
      "Stop copying leads from email into your CRM — we connect your tools automatically.",
    startingPrice: 1000,
    tiers: [
      {
        id: "starter",
        label: "Starter",
        price: 1000,
        priceLabel: "$1,000",
      },
      {
        id: "standard",
        label: "Standard",
        price: 2500,
        priceLabel: "$2,500",
        recommended: true,
      },
      {
        id: "premium",
        label: "Premium",
        price: 4000,
        priceLabel: "$4,000",
      },
    ],
  },
  {
    id: "ai-chat-search",
    slug: "ai-chat-search",
    name: "AI Chat & Search",
    subtitle:
      "FAQ chat, site search, or a custom AI tool — connected to your content and workflows.",
    startingPrice: 3000,
    tiers: [
      {
        id: "starter",
        label: "Chat (FAQ bot)",
        price: 3000,
        priceLabel: "$3,000",
      },
      {
        id: "standard",
        label: "Search",
        price: 4000,
        priceLabel: "$4,000",
        recommended: true,
      },
      {
        id: "custom",
        label: "Custom AI tool",
        price: null,
        priceLabel: "$5,000+",
      },
    ],
  },
];

export const serviceDetails: ServiceOfferDetail[] = [
  {
    ...serviceOffers[0],
    tiers: [
      {
        id: "starter",
        label: "Starter",
        price: 1000,
        priceLabel: "$1,000",
        highlights: [
          "Up to 3 pages",
          "10-day timeline",
          "Form → email",
          "Static site",
          "7 days post-launch support",
        ],
      },
      {
        id: "standard",
        label: "Standard",
        price: 3000,
        priceLabel: "$3,000",
        recommended: true,
        highlights: [
          "Up to 6 pages",
          "2–3 week timeline",
          "1 CRM / Slack / booking connection",
          "Headless WP for blog & key pages",
          "GA4 basics + 14 days support",
        ],
      },
      {
        id: "premium",
        label: "Premium",
        price: 5000,
        priceLabel: "$5,000",
        highlights: [
          "Up to 10 pages",
          "3–4 week timeline",
          "2 tool connections",
          "Headless WP + content blocks",
          "GA4 event map + handoff call",
        ],
      },
      {
        id: "custom",
        label: "Custom",
        price: null,
        priceLabel: "Quote",
        highlights: [
          "Scoped pages & connections",
          "Custom timeline",
          "Multiple integrations",
          "Scoped support window",
        ],
      },
    ],
    notIncluded: [
      "Copywriting & brand design",
      "Unlimited revision rounds",
      "E-commerce builds",
      "Ads or SEO retainers",
      "WordPress-only maintenance fixes",
    ],
    addOns: [
      "Extra page — $250",
      "Extra connection — $600",
      "Copy polish — $700",
      "Care plan — $500/mo",
    ],
  },
  {
    ...serviceOffers[1],
    tiers: [
      {
        id: "starter",
        label: "Starter",
        price: 1000,
        priceLabel: "$1,000",
        highlights: [
          "1 automation workflow",
          "7–10 day timeline",
          "Example: form → CRM capture",
        ],
      },
      {
        id: "standard",
        label: "Standard",
        price: 2500,
        priceLabel: "$2,500",
        recommended: true,
        highlights: [
          "3 automation workflows",
          "2-week timeline",
          "Form → CRM · new lead → Slack · 48h reminder",
        ],
      },
      {
        id: "premium",
        label: "Premium",
        price: 4000,
        priceLabel: "$4,000",
        highlights: [
          "5 automation workflows",
          "3-week timeline",
          "Full lead ops coverage",
        ],
      },
    ],
    notIncluded: [
      "New website build",
      "Full CRM setup from scratch",
      "AI chatbots",
      "Unlimited change requests",
    ],
    addOns: [
      "Extra automation — $500",
      "Hosted n8n — $200/mo",
      "Care plan — $500/mo",
    ],
  },
  {
    id: "ai-chat-search",
    slug: "ai-chat-search",
    name: "AI Chat & Search",
    subtitle:
      "FAQ chat, site search, or a custom AI tool — connected to your content and workflows.",
    startingPrice: 3000,
    tiers: [
      {
        id: "starter",
        label: "Chat (FAQ bot)",
        price: 3000,
        priceLabel: "$3,000",
        highlights: [
          "FAQ-style chat trained on your site content",
          "Lead capture or handoff rules",
          "2–3 week delivery window",
        ],
      },
      {
        id: "standard",
        label: "Search",
        price: 4000,
        priceLabel: "$4,000",
        recommended: true,
        highlights: [
          "Semantic search across site and docs",
          "Result ranking tuned for agency content",
          "Analytics on top queries",
        ],
      },
      {
        id: "custom",
        label: "Custom AI tool",
        price: null,
        priceLabel: "$5,000+",
        highlights: [
          "Scoped internal or client-facing AI workflow",
          "Custom data sources and guardrails",
          "Timeline scoped on audit call",
        ],
      },
    ],
    notIncluded: [
      "Open-ended token spend — client pays API usage",
      "Full product R&D without scope",
      "Replacing your CRM or helpdesk",
    ],
    addOns: [
      "Extra knowledge source — scoped on call",
      "Monthly prompt tuning — via Care plan",
    ],
  },
];

export const bundlePrice = 5000;

export const bundleOffer = {
  name: "Website + Automation bundle",
  priceLabel: "$5,000",
  summary:
    "Website Standard + Automation Standard — scoped on the audit call (save $500 vs separate).",
} as const;

export const servicesOverview = {
  title: "Services",
  intro:
    "Fixed-scope projects for marketing agencies — websites, lead automation, and AI tools, priced in round numbers.",
  bundleNote: bundleOffer.summary,
} as const;

export const budgetBands: BudgetBand[] = [
  { id: "under-1500", label: "Under $1,500", min: 0, max: 1500 },
  { id: "1500-3000", label: "$1,500 – $3,000", min: 1500, max: 3000 },
  { id: "3000-5000", label: "$3,000 – $5,000", min: 3000, max: 5000 },
  { id: "5000-plus", label: "$5,000+", min: 5000, max: null },
];

export function getServiceDetail(slug: string): ServiceOfferDetail | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}

export function getServiceOffer(slug: string): ServiceOffer | undefined {
  return serviceOffers.find((service) => service.slug === slug);
}
