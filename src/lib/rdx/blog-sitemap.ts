type WpPostSitemap = {
  slug: string;
  modified?: string;
};

/** Published blog slugs for sitemap — WordPress REST API when configured */
export async function getBlogSitemapEntries(): Promise<
  { path: string; lastModified: Date }[]
> {
  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL?.trim();
  if (!baseUrl?.includes("wp-json")) {
    return [];
  }

  try {
    const res = await fetch(
      `${baseUrl}/posts?per_page=100&status=publish&_fields=slug,modified`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return [];
    }

    const posts = (await res.json()) as WpPostSitemap[];

    return posts
      .filter((post) => post.slug)
      .map((post) => ({
        path: `/blog/${post.slug}`,
        lastModified: post.modified
          ? new Date(post.modified)
          : new Date(),
      }));
  } catch {
    return [];
  }
}
