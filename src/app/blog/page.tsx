import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import { WPPost } from "@/types/post";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog - Rajon Dey",
  description:
    "Read the latest articles about web development, programming, and technology.",
};

function BlogGrid({ posts }: { posts: WPPost[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          title={post.title.rendered}
          excerpt={post.excerpt.rendered}
          date={post.date}
          slug={post.slug}
          image={post.image}
          isDetailed={true}
          priority={index < 3} // Prioritize loading for first 3 images
        />
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}

async function getPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <SEO
        title="Blog - Rajon Dey"
        description="Read the latest articles about web development, programming, and technology."
        url="/blog"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        <Suspense fallback={<BlogSkeleton />}>
          <BlogGrid posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
