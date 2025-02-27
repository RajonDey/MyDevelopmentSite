import { blogPosts, staticPages } from "@/data/mock-data";
import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";

export const metadata: Metadata = {
  title: staticPages.blog.metaTitle,
  description: staticPages.blog.metaDescription,
  openGraph: {
    ...staticPages.blog,
    url: "https://development.rajondey.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <SEO
        title={staticPages.blog.metaTitle}
        description={staticPages.blog.metaDescription}
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
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} isDetailed={true} />
          ))}
        </div>
      </div>
    </>
  );
}
