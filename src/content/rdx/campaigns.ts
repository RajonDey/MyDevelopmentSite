import { agencyHeadlessPhaseOne } from "@/content/rdx/case-studies";
import type { ServiceNeed } from "@/types/rdx";

export type CampaignLanderContent = {
  slug: string;
  source: string;
  defaultNeed: ServiceNeed;
  meta: {
    title: string;
    description: string;
  };
  variants: {
    a: {
      eyebrow: string;
      headline: string;
      intro: string;
      bullets: readonly string[];
    };
    b: {
      eyebrow: string;
      headline: string;
      intro: string;
      bullets: readonly string[];
    };
  };
  caseSnippet: {
    quote: string;
    attribution: string;
    marginalia: string;
    href: string;
  };
  cta: {
    label: string;
  };
  footerNote: string;
};

export const forAgenciesCampaign: CampaignLanderContent = {
  slug: "for-agencies",
  source: "for-agencies",
  defaultNeed: "website",
  meta: {
    title: "For marketing agencies | RDX Technologies",
    description:
      "Fixed-scope agency websites with CRM-connected forms from $1,000. Built for US marketing agencies tired of leads stuck in inboxes.",
  },
  variants: {
    a: {
      eyebrow: "For US marketing agencies",
      headline: "Your site should send leads to HubSpot, not a shared inbox.",
      intro:
        "RDX builds agency marketing sites and wires your forms to HubSpot, Slack, or Calendly. Fixed tiers, public pricing, and a free review before you commit.",
      bullets: [
        "Fixed-scope builds from $1,000: Starter, Standard, and Premium tiers on the site",
        "Standard tier connects one CRM, Slack channel, or booking tool to every form",
        "Global remote team with async delivery, clear milestones, and handoff docs",
      ],
    },
    b: {
      eyebrow: "For US marketing agencies",
      headline: "Stop copying leads from email into your CRM.",
      intro:
        "If reps manually move form submissions into HubSpot, you are paying for a brochure site and a data-entry workflow. We rebuild the site and connect the pipes in one fixed scope.",
      bullets: [
        "Scope estimator on the review form: see tier and band before the call",
        "Representative builds for agencies like yours. No inflated metrics.",
        "Reply within 1 business day with 3 specific fixes, hire us or not",
      ],
    },
  },
  caseSnippet: {
    quote: agencyHeadlessPhaseOne.outcome,
    attribution: agencyHeadlessPhaseOne.clientType,
    marginalia: `${agencyHeadlessPhaseOne.serviceLabel} · team-led · headless CMS`,
    href: `/work/${agencyHeadlessPhaseOne.slug}`,
  },
  cta: {
    label: "Free Website & Workflow Review",
  },
  footerNote: "Projects from $1,000 · Global remote team",
};

export const campaignLanders = {
  "for-agencies": forAgenciesCampaign,
} as const;

export type CampaignSlug = keyof typeof campaignLanders;

export function getCampaignVariant(
  campaign: CampaignLanderContent,
  variantKey?: string
): CampaignLanderContent["variants"]["a"] {
  return variantKey === "b" ? campaign.variants.b : campaign.variants.a;
}
