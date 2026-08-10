/** RDXHIVE site metadata — single source for layout, SEO, Schema.org */

export const siteMetadata = {
  siteUrl: "https://rdxhive.com",
  siteName: "RDXHIVE",
  title: "RDXHIVE | Agency Websites & CRM Automation",
  description:
    "RDXHIVE builds agency websites and connects them to your CRM — HubSpot, Slack, Calendly, and more. Fixed projects from $1,000.",
  ogImage: "/opengraph-image",
  locale: "en_US",
  tagline: "Many minds. One direction.",
  serviceLine: "Websites & CRM automation for marketing agencies",
  priceFloorLabel: "From $1,000",
} as const;

export type SiteMetadata = typeof siteMetadata;
