import { siteMetadata } from "./metadata";

export const pageMeta = {
  start: {
    title: "Free Website & Workflow Review | RDX Technologies",
    description:
      "Estimate your scope, then request a free review. We'll send 3 specific fixes. Projects from $1,000.",
  },
  audit: {
    title: "Free Website & Workflow Review | RDX Technologies",
    description:
      "Tell us how your site and lead process work today. We'll send 3 specific fixes. Projects from $1,000.",
  },
  contact: {
    title: "Contact | RDX Technologies",
    description:
      "Get in touch with RDX Technologies for websites, CRM automation, and platforms. Global remote team.",
  },
  thankYou: {
    title: "Thank you | RDX Technologies",
    description: "We received your submission and will reply within 1 business day.",
  },
  home: {
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  services: {
    title: "Services | RDX Technologies",
    description:
      "Websites, lead automation, and AI tools. Fixed projects from $1,000 with public tier pricing for agencies and growth teams.",
  },
  estimate: {
    title: "Scope Estimator | RDX Technologies",
    description:
      "Estimate your project tier and budget band, then confirm exact scope on a free review call.",
  },
  work: {
    title: "Work | RDX Technologies",
    description:
      "Client deliveries, RDX products, and prior team-led experience. Named work, live URLs, honest attribution.",
  },
  process: {
    title: "Process | RDX Technologies",
    description:
      "How RDX delivers fixed-scope websites, automations, and platforms in four steps. Most Standard builds in 2–4 weeks; larger scopes in 2–3 months.",
  },
  about: {
    title: "About | RDX Technologies",
    description:
      "RDX Technologies is a global remote product and engineering company. Websites, CRM automation, and live products from $1,000.",
  },
  blog: {
    title: "Blog | RDX Technologies",
    description:
      "Notes on websites, lead automation, and modern web infrastructure for growth teams.",
  },
  newsletter: {
    title: "Newsletter | RDX Technologies",
    description:
      "Monthly notes on lead automation and modern web infrastructure. No spam.",
  },
  retainer: {
    title: "Care Plans | RDX Technologies",
    description:
      "Optional monthly care plans from $500/mo for site and automation support after project handoff.",
  },
  faq: {
    title: "FAQ | RDX Technologies",
    description:
      "Answers about website pricing, HubSpot and CRM automation, AI chat, and how to start a project with RDX.",
  },
} as const;
