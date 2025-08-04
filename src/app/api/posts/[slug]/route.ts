import { NextResponse } from "next/server";
import { headers } from "next/headers";

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://development-admin.rajondey.com/wp-json/wp/v2";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const res = await fetch(
      new URL(`${WP_API_URL}/posts?slug=${params.slug}`),
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    const posts = await res.json();
    if (!posts.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[0];
    const image = post.featured_media
      ? await fetchFeaturedImage(post.featured_media)
      : "/development-blog-placeholder.png";

    return NextResponse.json({ ...post, image });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

async function fetchFeaturedImage(mediaId: number): Promise<string> {
  try {
    const res = await fetch(`${WP_API_URL}/media/${mediaId}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return "/development-blog-placeholder.png";
    }

    const media = await res.json();
    return media.source_url || "/development-blog-placeholder.png";
  } catch (error) {
    console.error("Error fetching featured image:", error);
    return "/development-blog-placeholder.png";
  }
}
