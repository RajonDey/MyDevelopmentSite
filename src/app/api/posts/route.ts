import { NextResponse } from "next/server";

const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `${WP_API_URL}/posts?per_page=${perPage}&page=${page}`;
      console.log("Fetching from URL:", url); // Debug log

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.error("Failed to fetch posts:", res.status, res.statusText);
        throw new Error(
          `Failed to fetch posts: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      posts.push(...data);

      const totalPages = parseInt(
        res.headers.get("X-WP-TotalPages") || "1",
        10
      );
      if (page >= totalPages) break;
      page++;
    }

    // Fetch featured images for all posts
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        try {
          const image = post.featured_media
            ? await fetchFeaturedImage(post.featured_media)
            : "/development-blog-placeholder.png";
          return { ...post, image };
        } catch (error) {
          console.error("Error fetching featured image:", error);
          return { ...post, image: "/development-blog-placeholder.png" };
        }
      })
    );

    return NextResponse.json(postsWithImages);
  } catch (error) {
    console.error("Error in GET /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

async function fetchFeaturedImage(mediaId: number): Promise<string> {
  try {
    const url = `${WP_API_URL}/media/${mediaId}`;
    console.log("Fetching featured image from URL:", url); // Debug log

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch featured image:",
        res.status,
        res.statusText
      );
      return "/development-blog-placeholder.png";
    }

    const media = await res.json();
    return media.source_url || "/development-blog-placeholder.png";
  } catch (error) {
    console.error("Error fetching featured image:", error);
    return "/development-blog-placeholder.png";
  }
}
