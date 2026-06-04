import type { MetadataRoute } from "next";
import { siteMetadata } from "@/content/rdx/metadata";
import { publicSitemapRoutes } from "@/content/rdx/seo";
import { caseStudies } from "@/content/rdx/case-studies";
import { getBlogSitemapEntries } from "@/lib/rdx/blog-sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteMetadata.siteUrl;
  const fallbackModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicSitemapRoutes.map(
    (route) => ({
      url: `${base}${route.path}`,
      lastModified: fallbackModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })
  );

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${base}/work/${study.slug}`,
    lastModified: fallbackModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogEntries = await getBlogSitemapEntries();
  const blogSitemapEntries: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogSitemapEntries];
}
