import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Suspense } from "react";
import { WPPost } from "@/types/post";
import BlogLearnContent from "@/components/features/blog/BlogLearnContent";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName =
    category === "javascript"
      ? "JavaScript"
      : category === "databases"
      ? "Databases"
      : category === "react"
      ? "React"
      : category === "nextjs"
      ? "Next.js"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} Learning Resources | Rajon Dey`,
    description: `Learn ${categoryName} with tutorials, guides and resources by Rajon Dey. Expert insights and practical examples.`,
  };
}

async function getPosts(): Promise<WPPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";
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

export default async function CategoryPage({ params }: Props) {
  const posts = await getPosts();
  const { category } = await params;

  // Format the category name for display
  const categoryName =
    category === "javascript"
      ? "JavaScript"
      : category === "databases"
      ? "Databases"
      : category === "react"
      ? "React"
      : category === "nextjs"
      ? "Next.js"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <SEO
        title={`${categoryName} Learning Resources | Rajon Dey`}
        description={`Learn ${categoryName} with tutorials, guides and resources by Rajon Dey. Expert insights and practical examples.`}
        url={`/learn/${category}`}
        type="website"
        tags={[
          categoryName.toLowerCase(),
          "learning",
          "tutorials",
          "web development",
          "programming",
        ]}
      />
      <div className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {categoryName} Learning Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth tutorials, comprehensive guides, and structured learning
            paths for {categoryName.toLowerCase()}.
          </p>
        </div>

        {/* Content */}
        <Suspense fallback={<LearnSkeleton />}>
          <BlogLearnContent posts={posts} initialCategory={category} />
        </Suspense>
      </div>
    </>
  );
}
