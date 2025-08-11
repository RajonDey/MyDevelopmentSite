import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Suspense } from "react";
import LearningContent from "./LearningContent";

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

async function getPosts(category: string): Promise<{
  [key: string]: Array<{
    id: number;
    title: string;
    content: string;
    categories: number[];
    image: string;
  }>;
}> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";

    // If we have a WordPress API URL, fetch directly from it
    if (baseUrl.includes("wp-json")) {
      const res = await fetch(`${baseUrl}/posts?per_page=100&status=publish`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch posts: ${res.status} ${res.statusText}`
        );
      }

      const posts = await res.json();

      // Transform WordPress posts to match LearningContent interface
      const transformedPosts = posts.map(
        (post: {
          id: number;
          title: { rendered: string };
          content: { rendered: string };
          categories: number[];
          featured_media: number;
        }) => ({
          id: post.id,
          title: post.title.rendered,
          content: post.content.rendered,
          categories: post.categories || [],
          image: post.featured_media
            ? (() => {
                // Extract the base domain from the WordPress API URL
                const baseDomain = baseUrl.replace("/wp-json/wp/v2", "");
                return `${baseDomain}/wp-json/wp/v2/media/${post.featured_media}`;
              })()
            : "/development-blog-placeholder.png",
        })
      );

      // Filter posts by category and group them
      const categoryPosts = transformedPosts.filter(() => {
        // For now, let's include all posts for the learning page
        // You can add category filtering logic here based on your WordPress categories
        return true;
      });

      // Group by category name for display
      const categoryName =
        category === "javascript"
          ? "JavaScript"
          : category === "database"
          ? "Databases"
          : category.charAt(0).toUpperCase() + category.slice(1);

      return {
        [categoryName]: categoryPosts,
      };
    }

    // Fallback to local API if no WordPress URL
    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
      return {};
    }

    const posts = await res.json();
    const categoryName =
      category === "javascript"
        ? "JavaScript"
        : category === "database"
        ? "Databases"
        : category.charAt(0).toUpperCase() + category.slice(1);

    return {
      [categoryName]: posts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {};
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
  const { category } = await params;
  const posts = await getPosts(category);

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
          <div className="max-w-7xl mx-auto">
            <LearningContent posts={posts} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
