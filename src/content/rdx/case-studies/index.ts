import type { CaseStudy, CaseStudyVisual, WorkCategory } from "@/types/rdx/case-study";
import { harligStad } from "@/content/rdx/case-studies/harlig-stad";
import { hexaEducation } from "@/content/rdx/case-studies/hexa-education";
import { rdxProducts } from "@/content/rdx/case-studies/products";
import {
  agencyHeadlessPhaseOne,
  agencyMultiBrandEmail,
  marketingAgencySite,
  priorCaseStudies,
} from "@/content/rdx/case-studies/prior";

export {
  harligStad,
  hexaEducation,
  rdxProducts,
  agencyHeadlessPhaseOne,
  agencyMultiBrandEmail,
  marketingAgencySite,
  priorCaseStudies,
};

export const clientCaseStudies: CaseStudy[] = [harligStad, hexaEducation];

export const productCaseStudies: CaseStudy[] = rdxProducts;

export const caseStudies: CaseStudy[] = [
  ...clientCaseStudies,
  ...productCaseStudies,
  ...priorCaseStudies,
];

export function getCaseStudyHeroVisual(study: CaseStudy): CaseStudyVisual {
  return (
    study.heroVisual ??
    study.visuals[0] ?? {
      label: study.title,
      caption: study.summary,
    }
  );
}

export function getWorkBrowserUrl(study: CaseStudy): string {
  if (study.liveUrl) {
    try {
      return new URL(study.liveUrl).hostname;
    } catch {
      return study.liveUrl;
    }
  }
  return `${study.slug.replace(/-/g, ".")}.com`;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudies(limit = 2): CaseStudy[] {
  return clientCaseStudies.slice(0, limit);
}

export function getCaseStudiesByCategory(category: WorkCategory): CaseStudy[] {
  return caseStudies.filter((study) => study.category === category);
}

export function getServicePath(service: CaseStudy["service"]): string {
  if (service === "agency-website") return "/services/agency-website";
  if (service === "lead-automation") return "/services/lead-automation";
  return "/services";
}

export const workSections = {
  clients: {
    eyebrow: "Client delivery",
    title: "Named client work",
    description:
      "Sites and platforms delivered by RDX, with public URLs and honest attribution.",
  },
  products: {
    eyebrow: "Products",
    title: "Built by RDX",
    description:
      "Live and beta products we operate. Proof we ship full stacks, not only client sites.",
  },
  prior: {
    eyebrow: "Prior experience",
    title: "Team-led under prior employment",
    description:
      "Real deliveries through US marketing agencies, anonymized where RDX was not the contracting party.",
  },
} as const;
