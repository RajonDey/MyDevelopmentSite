import type { CaseStudy } from "@/types/rdx/case-study";
import { workImagePaths } from "@/content/rdx/case-study-images";

/**
 * Team-led deliveries under prior agency employment — anonymized, honest attribution.
 */

export const agencyHeadlessPhaseOne: CaseStudy = {
  slug: "agency-headless-phase-one",
  title: "Agency client site — Phase 1 on headless CMS",
  summary:
    "Public-facing marketing site for a US agency client — Next.js frontend with Contentful headless CMS, delivered Phase 1 under a fixed timeline.",
  clientType: "US agency end client (anonymous)",
  industryTag: "Prior · headless CMS",
  service: "agency-website",
  serviceLabel: "Website delivery",
  attribution: "team-led",
  attributionLabel:
    "Team-led delivery under agency employment — RDX was not the contracting party",
  category: "prior",
  visualLayout: "stack",
  stack: ["Next.js", "Contentful", "React", "Headless CMS"],
  challenge:
    "The agency needed a modern public site for their client — responsive, CMS-driven, and scoped as Phase 1 with room to extend later.",
  approach:
    "Led a two-developer team to build the Phase 1 site on Next.js and Contentful: page templates, CMS models, and handoff documentation within the agency’s fixed scope.",
  deliverables: [
    "Next.js marketing site — Phase 1 page set",
    "Contentful content models and editorial workflow",
    "Responsive layouts for core templates",
    "Developer handoff and foundation for future phases",
    "Delivery under agency timeline and QA process",
  ],
  outcome:
    "Phase 1 shipped on the agency timeline with a scalable headless foundation — the client team could update content without developer dependency for scoped pages.",
  visuals: [],
  heroVisual: {
    label: "Phase 1 marketing site",
    caption: "Next.js + Contentful — client branding anonymized",
    src: workImagePaths.priorExperience.headlessFullpage,
    alt: "Full-page view of anonymous agency client marketing site on headless CMS",
    frameMode: "scroll",
    scrollBehavior: "both",
  },
};

export const agencyMultiBrandEmail: CaseStudy = {
  slug: "agency-multi-brand-email",
  title: "Multi-brand email systems for a marketing agency",
  summary:
    "Responsive email template series for 7–10 client brands of a US marketing agency — team-led development and onboarding workflow.",
  clientType: "US marketing agency (anonymous)",
  industryTag: "Prior · email systems",
  service: "agency-website",
  serviceLabel: "Email delivery",
  attribution: "team-led",
  attributionLabel:
    "Development lead under agency employment — RDX was not the contracting party",
  category: "prior",
  visualLayout: "stack",
  stack: ["HTML", "CSS", "Email development", "Litmus", "Team leadership"],
  challenge:
    "The agency onboarded multiple client brands and needed consistent, cross-client-compatible email templates — not one-off designs per inbox.",
  approach:
    "Led a team of 3–5 developers to deliver initial template series per brand, with shared patterns for responsiveness, accessibility, and client handoff.",
  deliverables: [
    "Responsive templates across multiple agency client brands",
    "Cross-client compatibility testing workflow",
    "Brand-consistent patterns and reusable components",
    "Client onboarding documentation for ongoing campaigns",
    "Team coordination across parallel brand deliveries",
  ],
  outcome:
    "The agency could launch campaigns for new client brands without rebuilding templates from scratch each time — delivery stayed consistent across the roster.",
  visuals: [],
  heroVisual: {
    label: "Agency client campaign",
    caption: "Multi-brand email delivery — branding anonymized",
    src: workImagePaths.priorExperience.marketingAgencyFullpage,
    alt: "Full-page view of marketing agency client email or campaign template",
    frameMode: "scroll",
    scrollBehavior: "both",
  },
};

export const priorCaseStudies: CaseStudy[] = [
  agencyHeadlessPhaseOne,
  agencyMultiBrandEmail,
];

/** @deprecated Use agencyHeadlessPhaseOne */
export const marketingAgencySite = agencyHeadlessPhaseOne;
