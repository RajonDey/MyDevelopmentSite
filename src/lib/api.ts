export async function fetchPosts() {
  const res = await fetch(
    "https://development-admin.rajondey.com/wp-json/wp/v2/posts"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
