/** Care plans — docs/RDX_Services_and_Pricing.md · Phase 12 */

export const retainerContent = {
  hero: {
    eyebrow: "Care plans",
    title: "After your project ships",
    description:
      "Optional monthly support for agencies that want steady ops help — not a substitute for a scoped website or automation project.",
  },
  whenToBuy: {
    title: "Project vs Care plan",
    project: {
      heading: "Start with a project when…",
      items: [
        "You need a new site or automation build",
        "Forms are not reaching your CRM yet",
        "You want fixed tier pricing ($1,000 – $5,000+)",
      ],
      cta: { label: "Start a project", href: "/start" },
    },
    care: {
      heading: "Add a Care plan when…",
      items: [
        "The site or workflows are live and stable",
        "You want bug fixes and small updates covered",
        "You need a monthly ops check-in, not a new build",
      ],
      cta: { label: "Discuss on review call", href: "/start" },
    },
  },
  plans: [
    {
      id: "maintain",
      name: "Maintain",
      priceLabel: "$500/mo",
      summary: "Keep your site and automations running smoothly.",
      includes: [
        "Bug fixes and small content updates",
        "Form and connection health checks",
        "Email support with 2-business-day response",
      ],
      recommended: false,
    },
    {
      id: "grow",
      name: "Grow",
      priceLabel: "$1,000/mo",
      summary: "Maintain plus iterative improvements to your lead stack.",
      includes: [
        "Everything in Maintain",
        "One small automation or page change per month",
        "Monthly 30-minute ops check-in",
      ],
      recommended: true,
    },
  ],
  notIncluded: [
    "New full website builds",
    "Unlimited scope changes",
    "Ad management or SEO campaigns",
  ],
  cta: {
    label: "Discuss on review call",
    href: "/start",
  },
} as const;
