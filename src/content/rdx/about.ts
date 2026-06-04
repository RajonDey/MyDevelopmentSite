/** About page — docs/RDX_Content_Copy_Bank.md · Phase 12 */

export const aboutContent = {
  hero: {
    eyebrow: "About",
    title: "RDX Technologies",
    description:
      "A global remote product & engineering company — client sites, platforms, and automation in fixed projects from $1,000.",
  },
  story: [
    "We combine senior full-stack engineering (Next.js, React, Node.js) with practical automation (n8n, Make.com, CRM integrations). Most Standard builds ship in 2–4 weeks; larger fixed scopes run 2–3 months with support when you need it — round numbers, not open-ended hourly work.",
    "We work with US marketing agencies, service businesses, and education brands that need a credible site and systems that do not depend on copying forms from email into a CRM.",
  ],
  founder:
    "Founded by a senior full-stack engineer with agency and enterprise delivery experience — team-led builds on headless CMS, email systems, and product SaaS.",
  communication: {
    title: "How we work remotely",
    items: [
      {
        label: "Async by default",
        detail: "Written updates in Slack or email — no standing daily meetings unless you want them.",
      },
      {
        label: "Loom walkthroughs",
        detail: "Build progress and handoffs recorded so your team can review on their schedule.",
      },
      {
        label: "Overlap for calls",
        detail: "Review, kickoff, and handoff calls scheduled with US-friendly overlap.",
      },
    ],
  },
  extendedPortfolio: {
    label: "Full technical portfolio →",
    href: "https://portfolio.rajondey.com/projects?sort=impact",
  },
  productProof: {
    eyebrow: "Product proof",
    title: "We ship our own SaaS too",
    description:
      "YearInReview is a live product we built on Next.js and PostgreSQL — the same stack and delivery standards we bring to agency projects.",
    cta: {
      label: "View YearInReview",
      href: "https://www.yearinreview.online/",
    },
  },
  locationLine: "Global remote team",
  priceLine: "Projects from $1,000",
} as const;
