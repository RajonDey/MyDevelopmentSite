"use client";

import { useState, useEffect } from "react";
import { SEO } from "@/components/seo";
import { useRouter, useParams } from "next/navigation";
import LearningContentWrapper from "./LearningContentWrapper";

interface Post {
  id: number;
  title: string;
  content: string;
  categories: number[];
  image: string;
}

export default function ResourcesPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;

  // No longer redirecting - we'll use the learn page directly
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLearningPosts() {
      const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
      try {
        const res = await fetch(`${WP_API_URL}/learning?per_page=100`);
        if (!res.ok) throw new Error("Failed to fetch learning posts");
        const postsData = await res.json();

        const fetchedPosts = await Promise.all(
          postsData.map(
            async (post: {
              id: number;
              title: { rendered: string };
              content: { rendered: string };
              categories: number[];
              featured_media: number | null;
            }) => {
              const image = post.featured_media
                ? await fetchFeaturedImage(post.featured_media)
                : "/development-blog-placeholder.png";
              return {
                id: post.id,
                title: post.title.rendered,
                content: post.content.rendered,
                categories: post.categories,
                image,
              };
            }
          )
        );

        setPosts(fetchedPosts);
        console.log(`Total posts fetched: ${fetchedPosts.length}`);
        console.log("Categories present:", [
          ...new Set(fetchedPosts.flatMap((post) => post.categories)),
        ]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchFeaturedImage(mediaId: number) {
      const WP_API_URL = "https://development-admin.rajondey.com/wp-json/wp/v2";
      const res = await fetch(`${WP_API_URL}/media/${mediaId}`);
      if (!res.ok) return "/development-blog-placeholder.png";
      const media = await res.json();
      return media.source_url || "/development-blog-placeholder.png";
    }

    fetchLearningPosts();
  }, []);

  // Use category from URL params
  const topicCategory = params.category as string;
  const categoryName =
    topicCategory === "javascript"
      ? "JavaScript"
      : topicCategory === "databases"
      ? "Databases"
      : "Learning";

  return (
    <>
      <SEO
        title={`${categoryName} Learning Resources | Rajon Dey`}
        description={`Explore tutorials and guides on ${categoryName}.`}
        url={`/learn/${topicCategory}`}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {categoryName} Resources
        </h1>
        {loading ? (
          <p className="text-gray-500">Loading resources...</p>
        ) : (
          <LearningContentWrapper
            posts={posts}
            initialCategory={topicCategory}
          />
        )}
      </div>
    </>
  );
}
