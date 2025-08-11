import { NextResponse } from "next/server";
import { WPCategory } from "@/types/post";

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://development-admin.rajondey.com/wp-json/wp/v2";

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

    // Fetch categories data to have both IDs and names
    const categoriesRes = await fetch(`${WP_API_URL}/categories?per_page=100`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    let categories: WPCategory[] = [];
    if (categoriesRes.ok) {
      categories = await categoriesRes.json();
    } else {
      console.error(
        "Failed to fetch categories:",
        categoriesRes.status,
        categoriesRes.statusText
      );
    }

    // Fetch featured images for all posts and add category information
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        try {
          // Get featured image
          const image = post.featured_media
            ? await fetchFeaturedImage(post.featured_media)
            : "/development-blog-placeholder.png";

          // Map category IDs to category slugs that can be used as filter identifiers
          const categoryIds: number[] = post.categories || [];
          const categoryDetails = categoryIds
            .map((id: number) => {
              const category = categories.find(
                (cat: WPCategory) => cat.id === id
              );
              return category ? category.slug : null;
            })
            .filter(Boolean);

          return {
            ...post,
            image,
            categories: categoryDetails,
          };
        } catch (error) {
          console.error("Error fetching featured image:", error);
          return {
            ...post,
            image: "/development-blog-placeholder.png",
            categories: [],
          };
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
