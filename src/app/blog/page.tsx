import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCardSkeleton } from "@/components/common/ui/skeleton";
import { WPPost } from "@/types/post";
import { Suspense } from "react";
import { Button } from "@/components/common/ui/Button";
import { BookOpen, Clock, TrendingUp } from "lucide-react";
import BlogLearnContent from "@/components/features/blog/BlogLearnContent";

export const metadata: Metadata = {
  title: "Blog & Learn - Web Development Tutorials & Resources | Rajon Dey",
  description:
    "Learn web development with practical tutorials, courses and guides on React, Next.js, databases, and modern web technologies. Expert insights from Rajon Dey.",
  keywords:
    "web development blog, React tutorials, Next.js guides, programming tips, software development, learning resources, database tutorials",
};

function BlogSkeleton() {
  return (
    <div className="p-8 text-center">
      <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-full bg-gray-200 rounded-md mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
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
        title="Blog & Learn - Web Development Tutorials & Resources | Rajon Dey"
        description="Learn web development with practical tutorials, courses and guides on React, Next.js, databases, and modern web technologies. Expert insights from Rajon Dey."
        url="/blog"
        type="blog"
        tags={[
          "web development",
          "React",
          "Next.js",
          "tutorials",
          "programming",
          "learning resources",
          "database tutorials",
        ]}
      />
      <div className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from practical tutorials, industry insights, comprehensive
            guides, and expert tips on React, Next.js, databases and modern web
            development technologies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">{posts.length}+ Articles</h3>
            <p className="text-sm text-muted-foreground">Expert insights</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Weekly Updates</h3>
            <p className="text-sm text-muted-foreground">Fresh content</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">5 Min Reads</h3>
            <p className="text-sm text-muted-foreground">Quick learning</p>
          </div>
        </div>

        {/* Content with filtering */}
        <Suspense fallback={<BlogSkeleton />}>
          <BlogLearnContent posts={posts} />
        </Suspense>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl text-center mt-12 max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-6 opacity-90">
            Get the latest web development tutorials and insights delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </>
  );
}
