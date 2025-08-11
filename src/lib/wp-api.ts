import { WPPost } from "@/types/post";

export async function fetchPosts(): Promise<WPPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";

    // Check if we're trying to fetch from localhost during development
    if (
      baseUrl.includes("localhost") &&
      process.env.NODE_ENV === "development"
    ) {
      console.warn("Skipping WordPress API fetch during local development");
      return [];
    }

    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    // During build time or development, return empty array instead of throwing
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    ) {
      console.warn("Returning empty posts array during build/development");
      return [];
    }
    throw error;
  }
}

export async function fetchPost(slug: string): Promise<WPPost> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";

    // Check if we're trying to fetch from localhost during development
    if (
      baseUrl.includes("localhost") &&
      process.env.NODE_ENV === "development"
    ) {
      console.warn("Skipping WordPress API fetch during local development");
      return {
        id: 0,
        slug: slug,
        title: { rendered: "Post not available during development" },
        content: { rendered: "This post will be available in production." },
        excerpt: { rendered: "Post loading..." },
        date: new Date().toISOString(),
        featured_media: 0,
        link: `/blog/${slug}`,
        image: "/development-blog-placeholder.png",
        category_ids: [],
        categories: [],
      };
    }

    // If we have a WordPress API URL, fetch directly from it
    if (baseUrl.includes("wp-json")) {
      const res = await fetch(`${baseUrl}/posts?slug=${slug}&status=publish`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch post: ${res.status} ${res.statusText}`
        );
      }

      const posts = await res.json();

      if (posts && posts.length > 0) {
        const post = posts[0]; // Get the first (and should be only) post with this slug

        // Transform WordPress post to match our WPPost interface
        let imageUrl = "/development-blog-placeholder.png";

        if (post.featured_media) {
          try {
            // Fetch media metadata to get the actual image URL (same as homepage)
            const mediaRes = await fetch(
              `${baseUrl}/media/${post.featured_media}`
            );
            if (mediaRes.ok) {
              const mediaData = await mediaRes.json();
              imageUrl =
                mediaData.source_url || "/development-blog-placeholder.png";
              console.log("fetchPost: Media source URL:", imageUrl);
            }
          } catch (mediaError) {
            console.warn("Failed to fetch media for post", post.id, mediaError);
          }
        }

        return {
          id: post.id,
          slug: post.slug,
          title: { rendered: post.title.rendered },
          content: { rendered: post.content.rendered },
          excerpt: { rendered: post.excerpt.rendered },
          date: post.date,
          featured_media: post.featured_media,
          link: post.link,
          image: imageUrl,
          category_ids: post.categories || [],
          categories: post.categories || [],
        };
      } else {
        throw new Error(`Post with slug '${slug}' not found`);
      }
    }

    // Fallback to local API if no WordPress URL
    const res = await fetch(`${baseUrl}/api/posts/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    // During build time or development, return a default post instead of throwing
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    ) {
      console.warn("Returning default post during build/development");
      return {
        id: 0,
        slug: slug,
        title: { rendered: "Post not available during build/development" },
        content: { rendered: "This post will be available in production." },
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
