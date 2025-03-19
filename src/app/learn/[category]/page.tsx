import { SEO } from "@/components/seo";
import Link from "next/link";
import LearningContentWrapper from "./LearningContentWrapper";

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

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = await fetchLearningPosts();

  return (
    <>
      <SEO
        title={`${
          params.category === "javascript" ? "JavaScript" : "Databases"
        } | Learning | Rajon Dey`}
        description={`Explore tutorials on ${
          params.category === "javascript" ? "JavaScript" : "Databases"
        }.`}
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
        <LearningContentWrapper posts={posts} category={params.category} />
      </div>
    </>
  );
}
