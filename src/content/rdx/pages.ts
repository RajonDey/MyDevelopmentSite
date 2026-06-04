import { siteMetadata } from "./metadata";

export const pageMeta = {
  start: {
    title: "Free Website & Workflow Review | RDX Technologies",
    description:
      "Estimate your scope, then request a free review — we'll send 3 specific fixes. Projects from $1,000.",
  },
  audit: {
    title: "Free Website & Workflow Review | RDX Technologies",
    description:
      "Tell us how your site and lead process work today — we'll send 3 specific fixes. Projects from $1,000.",
  },
  contact: {
    title: "Contact | RDX Technologies",
    description:
      "Get in touch with RDX Technologies — websites, CRM automation, and platforms. Global remote team.",
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
      "Websites, lead automation, and AI tools — fixed projects from $1,000. Public tier pricing for agencies and growth teams.",
  },
  estimate: {
    title: "Scope Estimator | RDX Technologies",
    description:
      "Estimate your project tier and budget band — then confirm exact scope on a free review call.",
  },
  work: {
    title: "Work | RDX Technologies",
    description:
      "Client deliveries, RDX products, and prior team-led experience — named work, live URLs, honest attribution.",
  },
  process: {
    title: "Process | RDX Technologies",
    description:
      "How RDX delivers fixed-scope websites, automations, and platforms in four steps — most Standard builds in 2–4 weeks, larger scopes in 2–3 months.",
  },
  about: {
    title: "About | RDX Technologies",
    description:
      "RDX Technologies — global remote product & engineering company. Websites, CRM automation, and live products from $1,000.",
  },
  blog: {
    title: "Blog | RDX Technologies",
    description:
      "Notes on websites, lead automation, and modern web infrastructure for growth teams.",
  },
  newsletter: {
    title: "Newsletter | RDX Technologies",
    description:
      "Ops & AI systems — notes on lead automation and modern web infrastructure.",
  },
  retainer: {
    title: "Care Plans | RDX Technologies",
    description:
      "Optional monthly care plans from $500/mo — site and automation support after project handoff.",
  },
  faq: {
    title: "FAQ | RDX Technologies",
    description:
      "Answers about website pricing, HubSpot and CRM automation, AI chat, and how to start a project with RDX.",
  },
} as const;
