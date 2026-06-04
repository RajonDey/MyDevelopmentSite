import type {
  AutomationScope,
  ScopeEstimate,
  ServiceNeed,
  WebsiteScope,
} from "@/types/rdx";
import { bundleOffer, bundlePrice } from "@/content/rdx/services";

export const websiteScopeOptions = [
  {
    id: "entry" as const,
    label: "Small site, email only",
    description: "Up to a few pages with forms routed to email.",
  },
  {
    id: "core" as const,
    label: "Site + CRM connection",
    description: "Marketing site with one CRM, Slack, or booking hookup.",
  },
  {
    id: "premium" as const,
    label: "Large site + 2 connections",
    description: "More pages plus two live tool connections.",
  },
  {
    id: "custom" as const,
    label: "Complex scope or rush timeline",
    description: "Needs a scoped quote on the audit call.",
  },
];

export const automationScopeOptions = [
  {
    id: "single" as const,
    label: "One manual step to automate",
    description: "Replace a single copy-paste or inbox handoff.",
  },
  {
    id: "pipeline" as const,
    label: "Lead pipeline (3 workflows)",
    description: "Capture, notify, and follow up on new leads.",
  },
  {
    id: "full" as const,
    label: "Full ops coverage (5 workflows)",
    description: "Broader automation across your lead ops stack.",
  },
];

export function priceToBandLabel(price: number | null): string {
  if (price === null || price >= 5000) return "$5,000+";
  if (price >= 3000) return "$3,000 – $5,000";
  if (price >= 1500) return "$1,500 – $3,000";
  return "$1,000 – $1,500";
}

export function estimateWebsiteScope(scope: WebsiteScope): ScopeEstimate {
  const map: Record<WebsiteScope, ScopeEstimate> = {
    entry: {
      tierName: "Agency Website · Starter",
      priceLabel: "$1,000",
      bandLabel: priceToBandLabel(1000),
      summary: "Small site with forms routed to email.",
      auditPath: "/start",
    },
    core: {
      tierName: "Agency Website · Standard",
      priceLabel: "$3,000",
      bandLabel: priceToBandLabel(3000),
      summary: "Site plus one CRM, Slack, or booking connection.",
      auditPath: "/start",
    },
    premium: {
      tierName: "Agency Website · Premium",
      priceLabel: "$5,000",
      bandLabel: priceToBandLabel(5000),
      summary: "Larger site with two live tool connections.",
      auditPath: "/start",
    },
    custom: {
      tierName: "Agency Website · Custom",
      priceLabel: "$5,000+",
      bandLabel: priceToBandLabel(null),
      summary: "Complex scope or rush timeline — confirm on the audit call.",
      auditPath: "/start",
    },
  };

  return map[scope];
}

export function estimateAutomationScope(scope: AutomationScope): ScopeEstimate {
  const map: Record<AutomationScope, ScopeEstimate> = {
    single: {
      tierName: "Lead & CRM Automation · Starter",
      priceLabel: "$1,000",
      bandLabel: priceToBandLabel(1000),
      summary: "One workflow to remove a manual lead step.",
      auditPath: "/start",
    },
    pipeline: {
      tierName: "Lead & CRM Automation · Standard",
      priceLabel: "$2,500",
      bandLabel: priceToBandLabel(2500),
      summary: "Three workflows covering capture, alerts, and follow-up.",
      auditPath: "/start",
    },
    full: {
      tierName: "Lead & CRM Automation · Premium",
      priceLabel: "$4,000",
      bandLabel: priceToBandLabel(4000),
      summary: "Five workflows for broader lead ops coverage.",
      auditPath: "/start",
    },
  };

  return map[scope];
}

export function estimateBundle(): ScopeEstimate {
  return {
    tierName: bundleOffer.name,
    priceLabel: bundleOffer.priceLabel,
    bandLabel: priceToBandLabel(bundlePrice),
    summary: bundleOffer.summary,
    auditPath: "/start",
  };
}

export function estimateScope(
  need: ServiceNeed,
  scope: WebsiteScope | AutomationScope
): ScopeEstimate {
  if (need === "both") {
    return estimateBundle();
  }

  if (need === "website") {
    return estimateWebsiteScope(scope as WebsiteScope);
  }

  return estimateAutomationScope(scope as AutomationScope);
}
