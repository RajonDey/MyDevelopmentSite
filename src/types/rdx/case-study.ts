export type CaseStudyAttribution = "agency-team" | "team-led" | "rdx-led";

export type CaseStudyService =
  | "agency-website"
  | "lead-automation"
  | "both";

export type WorkCategory = "client" | "product" | "prior" | "demo";

export type WorkStatus = "live" | "beta" | "preview";

export type WorkFrameMode = "crop" | "scroll" | "mobile";

export type WorkScrollBehavior = "auto" | "manual" | "both";

/** Detail page gallery layout */
export type WorkVisualLayout = "grid" | "split-main-mobile" | "stack";

export type VisualPlacement = "main" | "sidebar";

export type VisualChrome = "browser" | "device";

export type CaseStudyVisual = {
  label: string;
  caption?: string;
  /** Path under public/, e.g. /work/harlig-stad/hero.png */
  src?: string;
  alt?: string;
  frameMode?: WorkFrameMode;
  scrollBehavior?: WorkScrollBehavior;
  objectPosition?: "top" | "center";
  /** Split layout: main column vs mobile-only sidebar */
  placement?: VisualPlacement;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  clientType: string;
  industryTag: string;
  service: CaseStudyService;
  serviceLabel: string;
  attribution: CaseStudyAttribution;
  attributionLabel: string;
  category: WorkCategory;
  status?: WorkStatus;
  liveUrl?: string;
  /** Extra public links on the case study detail page */
  relatedLinks?: readonly { label: string; href: string }[];
  stack: readonly string[];
  challenge: string;
  approach: string;
  deliverables: readonly string[];
  outcome: string;
  visuals: readonly CaseStudyVisual[];
  heroVisual?: CaseStudyVisual;
  /** Defaults to grid (3-col) when omitted */
  visualLayout?: WorkVisualLayout;
};
