import { siteMetadata } from "./metadata";

/** OG image patterns per route type — use in page metadata from Phase 10+ */

export type OgImageVariant = "default" | "service" | "work" | "start";

export const ogImageConfig: Record<
  OgImageVariant,
  { path: string; alt: string; width: number; height: number }
> = {
  default: {
    path: siteMetadata.ogImage,
    alt: siteMetadata.siteName,
    width: 1200,
    height: 630,
  },
  service: {
    path: siteMetadata.ogImage,
    alt: `${siteMetadata.siteName} | Services`,
    width: 1200,
    height: 630,
  },
  work: {
    path: siteMetadata.ogImage,
    alt: `${siteMetadata.siteName} | Work`,
    width: 1200,
    height: 630,
  },
  start: {
    path: siteMetadata.ogImage,
    alt: `${siteMetadata.siteName} | Free Review`,
    width: 1200,
    height: 630,
  },
};

export function buildOgMeta(variant: OgImageVariant = "default") {
  const config = ogImageConfig[variant];
  return {
    images: [
      {
        url: config.path,
        width: config.width,
        height: config.height,
        alt: config.alt,
      },
    ],
  };
}
