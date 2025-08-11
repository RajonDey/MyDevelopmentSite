import { WPPost } from "@/types/post";

export async function fetchPosts(): Promise<WPPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    // During build time, return empty array instead of throwing
    if (process.env.NODE_ENV === "production") {
      console.warn("Returning empty posts array during build");
      return [];
    }
    throw error;
  }
}

export async function fetchPost(slug: string): Promise<WPPost> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    // During build time, return a default post instead of throwing
    if (process.env.NODE_ENV === "production") {
      console.warn("Returning default post during build");
      return {
        id: 0,
        slug: slug,
        title: { rendered: "Post not available during build" },
        content: { rendered: "This post will be available after deployment." },
        excerpt: { rendered: "Post loading..." },
        date: new Date().toISOString(),
        featured_media: 0,
        link: `/blog/${slug}`,
        image: "/development-blog-placeholder.png",
        category_ids: [],
        categories: [],
      };
    }
    throw error;
  }
}
