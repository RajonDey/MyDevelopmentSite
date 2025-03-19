import { WPPost } from "@/types/post";

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://development-admin.rajondey.com/wp-json/wp/v2";

export async function fetchPosts(): Promise<WPPost[]> {
  const posts: WPPost[] = [];
  let page = 1;
  const perPage = 100; // Max allowed by WordPress API

  while (true) {
    const res = await fetch(
      `${WP_API_URL}/posts?per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    posts.push(...data);

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    if (page >= totalPages) break;
    page++;
  }

  return Promise.all(
    posts.map(async (post: WPPost) => ({
      ...post,
      image: post.featured_media
        ? await fetchFeaturedImage(post.featured_media)
        : "/development-blog-placeholder.png",
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
      : "/development-blog-placeholder.png",
  };
}

async function fetchFeaturedImage(mediaId: number): Promise<string> {
  const res = await fetch(`${WP_API_URL}/media/${mediaId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "/development-blog-placeholder.png";
  const media = await res.json();
  return media.source_url || "/development-blog-placeholder.png";
}