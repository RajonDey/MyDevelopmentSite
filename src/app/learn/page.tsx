import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Suspense } from "react";
import { WPPost } from "@/types/post";
import BlogLearnContent from "@/components/features/blog/BlogLearnContent";

export const metadata: Metadata = {
  title: "Learning Resources | Rajon Dey",
  description:
    "Comprehensive learning resources and tutorials on web development, programming, and more.",
};

async function getPosts(): Promise<WPPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts`, {
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

function LearnSkeleton() {
  return (
    <div className="p-8 text-center">
      <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-8 animate-pulse"></div>
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-full bg-gray-200 rounded-md mb-8 animate-pulse"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="col-span-2 h-96 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default async function LearnPage() {
  const posts = await getPosts();

  return (
    <>
      <SEO
        title="Learning Resources | Rajon Dey"
        description="Comprehensive learning resources and tutorials on web development, programming, and more."
        url="/learn"
        type="website"
        tags={[
          "learning",
          "tutorials",
          "web development",
          "programming",
          "education",
        ]}
      />
      <div className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth tutorials, comprehensive guides, and structured learning
            paths for web development and programming concepts.
          </p>
        </div>

        {/* Content */}
        <Suspense fallback={<LearnSkeleton />}>
          <BlogLearnContent posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
