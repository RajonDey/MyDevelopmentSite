import { WPPost } from "@/types/post"; // Adjust path to match your types file

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://development-admin.rajondey.com/wp-json/wp/v2";

export async function fetchPosts(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API_URL}/posts`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts = await res.json();

  return Promise.all(
    posts.map(async (post: WPPost) => ({
      ...post,
      image: post.featured_media
        ? await fetchFeaturedImage(post.featured_media)
        : "/placeholder.svg",
    }))
  );
}

export async function fetchPost(slug: string): Promise<WPPost> {
  const res = await fetch(`${WP_API_URL}/posts?slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  const posts = await res.json();
  if (!posts.length) throw new Error("Post not found");

  const post = posts[0];
  return {
    ...post,
    image: post.featured_media
      ? await fetchFeaturedImage(post.featured_media)
      : "/placeholder.svg",
  };
}

async function fetchFeaturedImage(mediaId: number): Promise<string> {
  const res = await fetch(`${WP_API_URL}/media/${mediaId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "/placeholder.svg";
  const media = await res.json();
  return media.source_url || "/placeholder.svg";
}