import type { FaqItem } from "@/content/rdx/design-system-demos";
import {
  organizationKnowsAbout,
  siteFaq,
} from "@/content/rdx/seo";
import { siteMetadata } from "@/content/rdx/metadata";
import { bundleOffer, serviceOffers } from "@/content/rdx/services";
import type { ServiceOffer, ServiceOfferDetail } from "@/types/rdx";

const ORG_ID = `${siteMetadata.siteUrl}/#organization`;
const WEBSITE_ID = `${siteMetadata.siteUrl}/#website`;
const SERVICE_ID = `${siteMetadata.siteUrl}/#professional-service`;

export function buildOrganizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    email: "contact@rajondey.com",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    knowsAbout: [...organizationKnowsAbout],
    sameAs: [] as string[],
  };
}

export function buildWebSiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteMetadata.siteUrl,
    name: siteMetadata.siteName,
    description: siteMetadata.description,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Free Website & Workflow Review",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteMetadata.siteUrl}/start`,
      },
    },
  };
}

export function buildProfessionalServiceNode() {
  return {
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    priceRange: "$1,000 – $5,000+",
    areaServed: "Worldwide",
    parentOrganization: { "@id": ORG_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RDX Technologies Services",
      itemListElement: serviceOffers.map((offer, index) => ({
        "@type": "Offer",
        position: index + 1,
        url: `${siteMetadata.siteUrl}/services/${offer.slug}`,
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.subtitle,
          provider: { "@id": ORG_ID },
        },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contact@rajondey.com",
      url: `${siteMetadata.siteUrl}/start`,
      availableLanguage: "English",
    },
  };
}

export function buildGlobalSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationNode(),
      buildWebSiteNode(),
      buildProfessionalServiceNode(),
    ],
  };
}

export function buildFaqSchema(items: readonly FaqItem[] = siteFaq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function tierOffers(service: ServiceOffer | ServiceOfferDetail) {
  return service.tiers
    .filter((tier) => tier.price !== null)
    .map((tier) => ({
      "@type": "Offer",
      name: `${service.name} — ${tier.label}`,
      price: String(tier.price),
      priceCurrency: "USD",
      url: `${siteMetadata.siteUrl}/services/${service.slug}`,
      availability: "https://schema.org/InStock",
    }));
}

export function buildServicePageSchema(service: ServiceOfferDetail) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.subtitle,
        url: `${siteMetadata.siteUrl}/services/${service.slug}`,
        provider: { "@id": ORG_ID },
        areaServed: "United States",
        offers: tierOffers(service),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteMetadata.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteMetadata.siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `${siteMetadata.siteUrl}/services/${service.slug}`,
          },
        ],
      },
    ],
  };
}

export function buildBundleOfferSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: bundleOffer.name,
    description: bundleOffer.summary,
    price: "5000",
    priceCurrency: "USD",
    url: `${siteMetadata.siteUrl}/services`,
    seller: { "@id": ORG_ID },
  };
}
