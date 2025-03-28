import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import Link from "next/link";
import he from "he";

export const metadata: Metadata = {
  title: "My Blog",
  description:
    "Dive into my latest posts on web development, React, Next.js, and more.",
};

async function fetchPostsPage(page: number, perPage: number = 9) {
  const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
  const res = await fetch(
    `${WP_API_URL}/posts?per_page=${perPage}&page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);

  return {
    posts: await Promise.all(
      posts.map(
        async (post: {
          id: number;
          featured_media: number;
          title: { rendered: string };
          excerpt: { rendered: string };
          date: string;
          slug: string;
        }) => ({
          ...post,
          image: post.featured_media
            ? await fetchFeaturedImage(post.featured_media)
            : "/development-blog-placeholder.png",
        })
      )
    ),
    totalPages,
  };
}

async function fetchFeaturedImage(mediaId: number): Promise<string> {
  const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
  const res = await fetch(`${WP_API_URL}/media/${mediaId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "/development-blog-placeholder.png";
  const media = await res.json();
  return media.source_url || "/development-blog-placeholder.png";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams; // Await the Promise
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const { posts, totalPages } = await fetchPostsPage(page);

  return (
    <>
      <SEO
        title="My Blog"
        description="Dive into my latest posts on web development, React, Next.js, and more."
        url="/blog"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive into my latest posts on web development, React, Next.js, and
            more.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title.rendered}
              excerpt={
                      he
                        .decode(
                          post.excerpt.rendered
                            .replace(/<[^>]+>/g, "") // Remove HTML tags
                            .replace(/\[\s*\.{3}\s*\]/g, "") // Remove "[…]" or similar "read more" indicators
                        )
                        .trim() // Remove leading/trailing whitespace
                        .slice(0, 100) + // Optional: Limit to 150 characters for consistency
                        (post.excerpt.rendered.replace(/<[^>]+>/g, "").length > 100
                          ? "..."
                          : "") // Add ellipsis if truncated
                    }
              date={new Date(post.date).toLocaleDateString()}
              slug={post.slug}
              image={post.image || "/development-blog-placeholder.png"}
              isDetailed={true}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {page > 1 && (
            <Link href={`/blog?page=${page - 1}`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                Previous
              </button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/blog?page=${page + 1}`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                Next
              </button>
            </Link>
          )}
        </div>

        <BeehiivSubscribe />
      </div>
    </>
  );
}
