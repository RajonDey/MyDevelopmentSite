import { services, portfolio, blogPosts, staticPages } from "@/data/mock-data";

export async function GET() {
  const baseUrl = "https://development.rajondey.com"; 
  const staticUrls = Object.keys(staticPages).map(
    (key) => `${baseUrl}/${key === "home" ? "" : key}`
  );

  const serviceUrls = services.map(
    (service) => `${baseUrl}/services/${service.id}`
  );
  const portfolioUrls = portfolio.map(
    (proj) => `${baseUrl}/portfolio/${proj.id}`
  ); // Adjust if you don’t have /portfolio/[id]
  const blogUrls = blogPosts.map((post) => `${baseUrl}/blog/${post.slug}`);

  const allUrls = [
    ...staticUrls,
    ...serviceUrls,
    ...portfolioUrls,
    ...blogUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "text/xml" },
  });
}
