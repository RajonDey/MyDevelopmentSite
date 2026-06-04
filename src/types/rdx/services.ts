export type ServiceTierName = "starter" | "standard" | "premium" | "custom";

export type ServiceTier = {
  id: ServiceTierName;
  label: string;
  price: number | null;
  priceLabel: string;
  recommended?: boolean;
};

export type ServiceTierDetail = ServiceTier & {
  highlights: readonly string[];
};

export type ServiceOffer = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  startingPrice: number;
  tiers: ServiceTier[];
};

export type ServiceOfferDetail = Omit<ServiceOffer, "tiers"> & {
  tiers: ServiceTierDetail[];
  notIncluded: readonly string[];
  addOns: readonly string[];
};

export type BudgetBandId =
  | "under-1500"
  | "1500-3000"
  | "3000-5000"
  | "5000-plus";

export type BudgetBand = {
  id: BudgetBandId;
  label: string;
  min: number;
  max: number | null;
};

export type ServiceNeed = "website" | "automation" | "both";

export type WebsiteScope = "entry" | "core" | "premium" | "custom";

export type AutomationScope = "single" | "pipeline" | "full";

export type ScopeEstimate = {
  tierName: string;
  priceLabel: string;
  bandLabel: string;
  summary: string;
  auditPath: string;
};
