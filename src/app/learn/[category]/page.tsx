import { SEO } from "@/components/seo";
import LearningContent from "./LearningContent";
import Link from "next/link";

// Fetch Learning Posts (Server-side)
async function fetchLearningPosts() {
  const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
  const res = await fetch(`${WP_API_URL}/learning?per_page=100`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) throw new Error("Failed to fetch learning posts");
  const posts = await res.json();

  const fetchedPosts = await Promise.all(
    posts.map(
      async (post: {
        id: number;
        featured_media: number;
        title: { rendered: string };
        content: { rendered: string };
        categories: number[];
      }) => ({
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        categories: post.categories,
        image: post.featured_media
          ? await fetchFeaturedImage(post.featured_media)
          : "/placeholder.svg",
      })
    )
  );

  console.log(`Total posts fetched: ${fetchedPosts.length}`);
  console.log("Categories present:", [
    ...new Set(fetchedPosts.flatMap((post) => post.categories)),
  ]);
  return fetchedPosts;
}

async function fetchFeaturedImage(mediaId: number) {
  const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
  const res = await fetch(`${WP_API_URL}/media/${mediaId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "/placeholder.svg";
  const media = await res.json();
  return media.source_url || "/placeholder.svg";
}

// Static metadata as a fallback
export const metadata = {
  title: "Learning | Rajon Dey",
  description: "Explore tutorials on JavaScript and Databases.",
};

// Suppress the TypeScript error for Next.js type generation bug
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = await fetchLearningPosts();

  const categoryPosts =
    params.category === "javascript"
      ? posts.filter(
          (post) => post.categories.includes(13) || post.categories.includes(50)
        ) // JavaScript: IDs 13, 50
      : posts.filter((post) => post.categories.includes(52)); // Database: ID 52

  const categorizedPosts = {
    [params.category === "javascript" ? "JavaScript" : "Database"]:
      categoryPosts,
  };

  const category =
    params.category === "javascript" ? "JavaScript" : "Databases";

  return (
    <>
      <SEO
        title={`${category} | Learning | Rajon Dey`}
        description={`Explore tutorials on ${category}.`}
        url={`/learn/${params.category}`}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/learn"
          className="inline-flex items-center text-green-600 hover:underline mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Learn Page
        </Link>
        <div className="flex flex-col md:flex-row gap-8">
          <LearningContent posts={categorizedPosts} />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Showing {categoryPosts.length} posts in {params.category}.
        </p>
      </div>
    </>
  );
}
