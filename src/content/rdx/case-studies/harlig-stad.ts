import type { CaseStudy } from "@/types/rdx/case-study";
import { workImagePaths } from "@/content/rdx/case-study-images";

export const harligStad: CaseStudy = {
  slug: "harlig-stad",
  title: "Härlig Städ AB: website and booking automation",
  summary:
    "Swedish cleaning company site with bilingual UX, instant quote flow, and a full booking form. Delivered by RDX with verified Google reviews.",
  clientType: "Härlig Städ AB · Sweden",
  industryTag: "Local services",
  service: "both",
  serviceLabel: "Website & forms",
  attribution: "rdx-led",
  attributionLabel: "Delivered by RDX Technologies",
  category: "client",
  status: "live",
  liveUrl: "https://www.harligstad.se/sv",
  visualLayout: "split-main-mobile",
  stack: ["Next.js", "Responsive UI", "Form automation", "SV / EN"],
  challenge:
    "Härlig Städ needed a professional digital presence in Swedish and English — fast quotes, clear services, and a booking path that felt trustworthy for homeowners and businesses.",
  approach:
    "Built the marketing site and automated booking flow: service selection, scheduling fields, RUT-aware pricing display, and confirmation workflow — with clean handoff for their team to confirm by phone.",
  deliverables: [
    "Marketing site — services, trust signals, bilingual navigation",
    "1-minute quote CTA on homepage",
    "Booking form at /sv/book with estimate panel",
    "Mobile-first layouts across core templates",
    "Post-launch support when needed",
  ],
  outcome:
    "A live, client-owned site with smooth quotation and booking — backed by verified Google reviews citing professionalism and the form experience.",
  visuals: [
    {
      label: "Booking & automation",
      caption: "Full booking flow with price estimate",
      src: workImagePaths.harligStad.booking,
      alt: "Härlig Städ booking form with service selection and RUT pricing",
      frameMode: "scroll",
      scrollBehavior: "both",
      placement: "main",
    },
    {
      label: "Service detail",
      caption: "Individual service pages",
      src: workImagePaths.harligStad.service,
      alt: "Härlig Städ single service page",
      frameMode: "scroll",
      scrollBehavior: "both",
      placement: "main",
    },
    {
      label: "Mobile experience",
      caption: "Core flows on small screens",
      src: workImagePaths.harligStad.mobile,
      alt: "Härlig Städ site on mobile",
      frameMode: "mobile",
      scrollBehavior: "both",
      placement: "sidebar",
    },
  ],
  heroVisual: {
    label: "Homepage",
    caption: "harligstad.se — Swedish market",
    src: workImagePaths.harligStad.hero,
    alt: "Härlig Städ AB homepage — professional cleaning services Sweden",
    frameMode: "scroll",
    scrollBehavior: "both",
    placement: "main",
  },
};
