/** RDX site metadata — single source for layout, SEO, Schema.org */

export const siteMetadata = {
  siteUrl: "https://development.rajondey.com",
  siteName: "RDX Technologies",
  title: "RDX Technologies | Websites, CRM & Product Builds",
  description:
    "RDX Technologies is a remote product and engineering company. We build websites, form automation, and platforms for marketing agencies, service businesses, and education brands. Fixed projects from $1,000.",
  ogImage: "/opengraph-image",
  locale: "en_US",
  tagline: "Websites & systems for growth-focused teams",
  priceFloorLabel: "From $1,000",
} as const;

export type SiteMetadata = typeof siteMetadata;
