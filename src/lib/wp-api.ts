import { WPPost } from "@/types/post";

export async function fetchPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchPost(slug: string): Promise<WPPost> {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
