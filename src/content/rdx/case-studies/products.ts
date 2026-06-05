import type { CaseStudy } from "@/types/rdx/case-study";
import { workImagePaths } from "@/content/rdx/case-study-images";

export const ieltsReady: CaseStudy = {
  slug: "ieltsready",
  title: "IELTSReady — global practice test platform",
  summary:
    "RDX-owned IELTS practice platform — inspired by education delivery experience, built for a worldwide audience. Beta live; domain launch forthcoming.",
  clientType: "RDX product",
  industryTag: "Product · beta",
  service: "agency-website",
  serviceLabel: "SaaS product",
  attribution: "rdx-led",
  attributionLabel: "Built and operated by RDX Technologies",
  category: "product",
  status: "beta",
  liveUrl: "https://ieltsready.vercel.app/",
  visualLayout: "stack",
  stack: ["Next.js", "IELTS practice flows", "Admin portal", "Vercel"],
  challenge:
    "Test-takers need accessible online practice beyond a single region — with admin tooling to manage content and delivery at scale.",
  approach:
    "Shipped landing, auth, and admin surfaces on a preview URL first — iterating toward public launch and custom domain this year.",
  deliverables: [
    "Public landing and sign-in",
    "Practice test experience",
    "Admin portal for operations",
    "Launch-ready beta deployment",
  ],
  outcome:
    "A near-launch product that demonstrates RDX can ship full platforms — not only client sites.",
  visuals: [
    {
      label: "Admin portal",
      caption: "Operations and content management",
      src: workImagePaths.ieltsReady.admin,
      alt: "IELTSReady admin portal",
      frameMode: "scroll",
      scrollBehavior: "both",
    },
    {
      label: "Sign in",
      caption: "Learner access",
      src: workImagePaths.ieltsReady.signin,
      alt: "IELTSReady sign in",
      frameMode: "crop",
    },
  ],
  heroVisual: {
    label: "Landing",
    caption: "ieltsready.vercel.app · launching soon",
    src: workImagePaths.ieltsReady.landing,
    alt: "IELTSReady landing homepage",
    frameMode: "scroll",
    scrollBehavior: "both",
  },
};

export const yearInReview: CaseStudy = {
  slug: "yearinreview",
  title: "YearInReview — yearly planning & reflection SaaS",
  summary:
    "Live product: one system for plan, weekly rhythm, daily habits, and year-end proof — Next.js and PostgreSQL, shipping under the RDX team.",
  clientType: "RDX product",
  industryTag: "Product · live",
  service: "agency-website",
  serviceLabel: "SaaS product",
  attribution: "rdx-led",
  attributionLabel: "Built and operated by RDX Technologies",
  category: "product",
  status: "live",
  liveUrl: "https://www.yearinreview.online/",
  visualLayout: "split-main-mobile",
  stack: ["Next.js", "PostgreSQL", "SaaS", "Reflection UX"],
  challenge:
    "Annual goals scatter across notes and apps — people want one calm loop from intention through weekly rhythm to year-end proof.",
  approach:
    "Designed and built the full product loop: Wheel of Life planning, weekly check-ins, daily Today surface, and recap cards — dogfooded before broader marketing.",
  deliverables: [
    "Public marketing site and onboarding",
    "Plan · Live · Review product loop",
    "Dashboard and Wheel of Life",
    "Responsive product UI",
  ],
  outcome:
    "A running SaaS that proves delivery depth — the same engineering standards RDX brings to client work.",
  visuals: [
    {
      label: "Dashboard",
      caption: "Plan and progress in one place",
      src: workImagePaths.yearInReview.dashboard,
      alt: "YearInReview dashboard",
      frameMode: "scroll",
      scrollBehavior: "both",
      placement: "main",
    },
    {
      label: "Wheel of Life",
      caption: "Annual planning surface",
      src: workImagePaths.yearInReview.wheel,
      alt: "YearInReview Wheel of Life",
      frameMode: "scroll",
      scrollBehavior: "both",
      placement: "main",
    },
    {
      label: "Responsive product",
      caption: "Mobile and desktop",
      src: workImagePaths.yearInReview.responsive,
      alt: "YearInReview responsive layouts",
      frameMode: "mobile",
      scrollBehavior: "both",
      placement: "sidebar",
    },
  ],
  heroVisual: {
    label: "Homepage",
    caption: "yearinreview.online",
    src: workImagePaths.yearInReview.homepage,
    alt: "YearInReview marketing homepage",
    frameMode: "scroll",
    scrollBehavior: "both",
    placement: "main",
  },
};

export const mediHelp: CaseStudy = {
  slug: "medi-help",
  title: "Medi Help — AI healthcare assistant (public demo)",
  summary:
    "Educational AI assistant for general health questions, clinician discovery, and appointment flows — RDX-built public demo; similar scoped work delivered under NDA for a healthcare client.",
  clientType: "RDX build · public demo",
  industryTag: "Health tech",
  service: "both",
  serviceLabel: "AI assistant",
  attribution: "rdx-led",
  attributionLabel:
    "RDX public demo — related healthcare delivery exists under client NDA",
  category: "demo",
  status: "preview",
  liveUrl: "https://medi-help-beta.vercel.app/",
  stack: ["Next.js", "AI chat", "Appointment flows", "Health UX"],
  challenge:
    "Users need guided health information and booking paths without replacing professional care — with clear disclaimers and trustworthy UX.",
  approach:
    "Built chat-first flows with suggested prompts, clinician discovery, and appointment management patterns suitable for education-only guidance.",
  deliverables: [
    "AI chat with guided prompts",
    "Clinician and appointment flows",
    "Educational disclaimer and trust copy",
    "Preview deployment for portfolio",
  ],
  outcome:
    "Demonstrates RDX AI product capability — while confidential client work stays under NDA.",
  visuals: [
    {
      label: "AI chat",
      caption: "Guided health Q&A surface",
      src: workImagePaths.mediHelp.chat,
      alt: "Medi Help AI chat feature",
      frameMode: "scroll",
      scrollBehavior: "both",
    },
  ],
  heroVisual: {
    label: "Medi Help",
    caption: "medi-help-beta.vercel.app",
    src: workImagePaths.mediHelp.hero,
    alt: "Medi Help AI healthcare assistant homepage",
    frameMode: "crop",
  },
};

export const rdxProducts: CaseStudy[] = [ieltsReady, yearInReview, mediHelp];
