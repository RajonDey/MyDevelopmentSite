import type { FaqItem } from "./design-system-demos";
import { siteMetadata } from "./metadata";
import { serviceOffers, bundleOffer } from "./services";
import { caseStudies } from "./case-studies";

/** SEO + AI discoverability — factual copy for metadata, schema, llms.txt */

export const seoKeywords = [
  "RDX Technologies",
  "marketing agency website development",
  "small business website development",
  "agency website HubSpot integration",
  "CRM lead automation for agencies",
  "marketing agency web development",
  "HubSpot form integration",
  "Slack lead alerts",
  "agency website Next.js",
  "lead routing automation",
  "US marketing agency developer",
  "fixed price agency website",
] as const;

export const organizationKnowsAbout = [
  "Marketing agency websites",
  "HubSpot CRM integration",
  "Slack lead notifications",
  "Calendly booking integration",
  "Lead and CRM automation",
  "n8n workflow automation",
  "Next.js agency sites",
  "Headless WordPress",
  "AI FAQ chat for websites",
  "Semantic site search",
] as const;

export const siteFaq: FaqItem[] = [
  {
    question: "What does RDX Technologies do?",
    answer:
      "RDX Technologies is a remote product and engineering company. We build websites, connect forms to HubSpot, Slack, Calendly, and email, and ship platforms so leads and operations are not stuck in inboxes and spreadsheets.",
  },
  {
    question: "Who is RDX Technologies for?",
    answer:
      "Primarily US marketing and digital agencies (5–50 people). We also work with service businesses, education brands, coaches, and founders who need a credible site or automation. Projects from $1,000 to $5,000+.",
  },
  {
    question: "How much does a website project cost?",
    answer:
      "Website tiers (see /services/agency-website): Starter $1,000 (up to 3 pages), Standard $3,000 (up to 6 pages + 1 CRM/Slack/booking connection), Premium $5,000 (up to 10 pages + 2 connections). Custom scope is quoted on a free review call.",
  },
  {
    question: "How much does lead and CRM automation cost?",
    answer:
      "Lead & CRM Automation tiers: Starter $1,000 (1 workflow), Standard $2,500 (3 workflows), Premium $4,000 (5 workflows). Example automations include form → HubSpot, new lead → Slack, and follow-up reminders.",
  },
  {
    question: "Does RDX offer AI chat or search?",
    answer:
      "Yes. AI Chat & Search starts at $3,000 for FAQ-style chat, $4,000 for semantic search, or custom scoped tools from $5,000+. API usage is billed separately from the fixed project fee.",
  },
  {
    question: "Where is RDX Technologies located?",
    answer:
      "RDX is a global remote company. We work async with clear milestones, Loom walkthroughs, and Slack or email, with overlap for review and handoff calls.",
  },
  {
    question: "How do I get a quote or start a project?",
    answer:
      "Submit the Free Website & Workflow Review form at /start. You will get a scope estimate, and we reply within 1 business day with 3 specific fixes. Qualified projects ($1,500+ bands) may receive a 15-minute review call.",
  },
  {
    question: "What integrations does RDX support?",
    answer:
      "HubSpot, Slack, Calendly, email, GA4, Headless WordPress, n8n, and common form tools. Connections are scoped per tier on website and automation projects.",
  },
];

/** Public routes for sitemap — exclude noindex/admin/campaign pages */
export const publicSitemapRoutes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/agency-website", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/lead-automation", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/ai-chat-search", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/start", changeFrequency: "monthly" as const, priority: 0.95 },
  { path: "/work", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/process", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/retainer", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/newsletter", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly" as const, priority: 0.3 },
];

export function buildLlmsTxt(short = true): string {
  const base = siteMetadata.siteUrl;
  const serviceLines = serviceOffers
    .map(
      (s) =>
        `- **${s.name}** (from $${s.startingPrice.toLocaleString()}): ${s.subtitle} — ${base}/services/${s.slug}`
    )
    .join("\n");

  const caseLines = caseStudies
    .map((c) => `- ${c.title} — ${base}/work/${c.slug}`)
    .join("\n");

  const faqLines = siteFaq
    .slice(0, short ? 5 : siteFaq.length)
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  const header = `# ${siteMetadata.siteName}

> ${siteMetadata.description}

Global remote team · Fixed projects ${siteMetadata.priceFloorLabel} · Primary market: US marketing agencies

## Services & pricing

${serviceLines}

**Bundle:** ${bundleOffer.name} — ${bundleOffer.priceLabel} (${bundleOffer.summary})

## Key pages

- [Home](${base}/): Agency positioning and work teaser
- [Services & pricing](${base}/services): Full tier tables
- [Free review / start project](${base}/start): Scope estimator + qualification form
- [Work / case studies](${base}/work): Representative agency builds
- [Process](${base}/process): Review → proposal → build → handoff
- [About](${base}/about): Team and communication model
- [FAQ](${base}/faq): Common questions
- [Care plans](${base}/retainer): Post-launch support from $500/mo

## Case studies

${caseLines}

## Contact

- Email: contact@rajondey.com
- Review form: ${base}/start
- Reply SLA: 1 business day

## Topics we help with

${organizationKnowsAbout.map((t) => `- ${t}`).join("\n")}
`;

  if (short) {
    return `${header}

## Quick FAQ

${faqLines}

## More detail

See ${base}/llms-full.txt for extended FAQ and positioning notes.
`;
  }

  return `${header}

## Extended FAQ

${faqLines}

## Positioning (for accurate citations)

- RDX Technologies is a product & engineering company (not a generic freelance marketplace profile).
- Pricing is fixed-tier and published on the site. No hidden page-count calculators.
- We specialize in connecting marketing agency websites to CRM and ops tools.
- Projects are scoped remotely with async delivery; most Standard builds ship in 2–4 weeks.
`;
}
