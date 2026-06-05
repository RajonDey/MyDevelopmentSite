import type { MetadataRoute } from "next";
import { siteMetadata } from "@/content/rdx/metadata";

/** AI + LLM crawler hints — complements llms.txt */
export default function robots(): MetadataRoute.Robots {
  const base = siteMetadata.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/design-system",
          "/for-agencies",
          "/signin",
          "/signup",
          "/forgot-password",
          "/reset-password",
          "/thank-you",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/dashboard", "/design-system", "/signin", "/signup"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/dashboard", "/design-system"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/dashboard", "/design-system"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/dashboard", "/design-system"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/dashboard", "/design-system"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
