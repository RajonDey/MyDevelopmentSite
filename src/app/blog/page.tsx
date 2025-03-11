import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import { WPPost } from "@/types/post";

export const metadata: Metadata = {
  title: "My Blog",
  description:
    "Dive into my latest posts on web development, React, Next.js, and more.",
  openGraph: {
    title: "My Blog",
    description:
      "Dive into my latest posts on web development, React, Next.js, and more.",
    url: "https://development.rajondey.com/blog",
  },
};

// Define the shape of a WordPress post
async function fetchPosts(): Promise<WPPost[]> {
  const res = await fetch(
    "https://development-admin.rajondey.com/wp-json/wp/v2/posts",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <>
      <SEO
        title="My Blog"
        description="Dive into my latest posts on web development, React, Next.js, and more."
        url="/blog"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive into my latest posts on web development, React, Next.js, and
            more.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
              date={new Date(post.date).toLocaleDateString()}
              slug={post.slug}
              image={post.image || "/placeholder.svg"} 
              isDetailed={true}
            />
          ))}
        </div>
        <BeehiivSubscribe />
      </div>
    </>
  );
}
