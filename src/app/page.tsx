import { fetchPosts } from "@/lib/api";
import BlogList from "@/components/blog/BlogList";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Welcome to My Site</h1>
      <BlogList posts={posts} />
    </div>
  );
}
