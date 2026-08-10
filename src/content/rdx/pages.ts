import { siteMetadata } from "./metadata";

const brand = siteMetadata.siteName;

export const pageMeta = {
  start: {
    title: `Free Website & Workflow Review | ${brand}`,
    description:
      "Estimate your scope, then request a free review. We'll send 3 specific fixes. Projects from $1,000.",
  },
  audit: {
    title: `Free Website & Workflow Review | ${brand}`,
    description:
      "Tell us how your site and lead process work today. We'll send 3 specific fixes. Projects from $1,000.",
  },
  contact: {
    title: `Contact | ${brand}`,
    description:
      "Get in touch with RDXHIVE for websites, CRM automation, and platforms. Global remote team.",
  },
  thankYou: {
    title: `Thank you | ${brand}`,
    description: "We received your submission and will reply within 1 business day.",
  },
  home: {
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  services: {
    title: `Services | ${brand}`,
    description:
      "Websites, lead automation, and AI tools. Fixed projects from $1,000 with public tier pricing for agencies and growth teams.",
  },
  estimate: {
    title: `Scope Estimator | ${brand}`,
    description:
      "Estimate your project tier and budget band, then confirm exact scope on a free review call.",
  },
  work: {
    title: `Work | ${brand}`,
    description:
      "Client deliveries, RDXHIVE products, and prior team-led experience. Named work, live URLs, honest attribution.",
  },
  process: {
    title: `Process | ${brand}`,
    description:
      "How RDXHIVE delivers fixed-scope websites, automations, and platforms in four steps. Most Standard builds in 2–4 weeks; larger scopes in 2–3 months.",
  },
  about: {
    title: `About | ${brand}`,
    description:
      "RDXHIVE is a global remote product and engineering company. Websites, CRM automation, and live products from $1,000.",
  },
  blog: {
    title: `Blog | ${brand}`,
    description:
      "Notes on websites, lead automation, and modern web infrastructure for growth teams.",
  },
  newsletter: {
    title: `Newsletter | ${brand}`,
    description:
      "Monthly notes on lead automation and modern web infrastructure. No spam.",
  },
  retainer: {
    title: `Care Plans | ${brand}`,
    description:
      "Optional monthly care plans from $500/mo for site and automation support after project handoff.",
  },
  faq: {
    title: `FAQ | ${brand}`,
    description:
      "Answers about website pricing, HubSpot and CRM automation, AI chat, and how to start a project with RDXHIVE.",
  },
} as const;
