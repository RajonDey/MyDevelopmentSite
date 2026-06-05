import { budgetBands } from "./services";
import { siteMetadata } from "./metadata";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpwpzgzq";

export const auditFormContent = {
  title: "Free Website & Workflow Review",
  intro:
    "Tell us how your site and lead process work today. We'll send 3 specific fixes, whether you hire us or not.",
  floorCopy: "Projects from $1,000.",
  submitLabel: "Request free review",
  budgetBands: budgetBands.map((band) => ({
    value: band.id,
    label: band.label,
  })),
} as const;

export const contactFormContent = {
  title: "Contact RDX",
  intro:
    "Share a few details about your project. We'll reply within 1 business day.",
  submitLabel: "Send message",
} as const;

export const companyNameFieldLabel = "Company / agency name";

export const startFormContent = {
  title: "Free Website & Workflow Review",
  intro:
    "Pick your scope, then tell us about your team and site. We'll send 3 specific fixes, whether you hire us or not.",
  continueLabel: "Continue to details",
  submitLabel: "Request free review",
  floorCopy: "Projects from $1,000.",
  companyNameLabel: companyNameFieldLabel,
} as const;

export const teamSizeOptions = [
  { value: "1-5", label: "1–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-30", label: "16–30" },
] as const;

export const needOptions = [
  { value: "website", label: "Website" },
  { value: "automation", label: "Automation" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const contactBudgetOptions = [
  { value: "1000-1500", label: "$1K–$1.5K" },
  { value: "1500-3000", label: "$1.5K–$3K" },
  { value: "3000-5000", label: "$3K–$5K" },
  { value: "5000-plus", label: "$5K+" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-4-weeks", label: "1–4 weeks" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const thankYouContent = {
  start: {
    title: "Review request received",
    body: "We'll reply within 1 business day. Qualified projects may get a 15-minute walkthrough.",
  },
  audit: {
    title: "Review request received",
    body: "We'll reply within 1 business day. Qualified projects may get a 15-minute walkthrough.",
  },
  contact: {
    title: "Message sent",
    body: "We'll reply within 1 business day with next steps.",
  },
} as const;

export function thankYouRedirect(type: "start" | "audit" | "contact") {
  return `${siteMetadata.siteUrl}/thank-you?type=${type}`;
}
