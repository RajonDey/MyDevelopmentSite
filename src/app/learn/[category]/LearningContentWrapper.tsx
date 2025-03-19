"use client";

import LearningContent from "./LearningContent";

interface Post {
  id: number;
  title: string;
  content: string;
  categories: number[];
  image: string;
}

export default function LearningContentWrapper({
  posts,
  category,
}: {
  posts: Post[];
  category: string;
}) {

  // Filter posts based on the category
  const categoryPosts =
    category === "javascript"
      ? posts.filter(
          (post) => post.categories.includes(13) || post.categories.includes(50)
        ) // JavaScript: IDs 13, 50
      : posts.filter((post) => post.categories.includes(52)); // Database: ID 52

  const categorizedPosts = {
    [category === "javascript" ? "JavaScript" : "Database"]: categoryPosts,
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <LearningContent posts={categorizedPosts} />
    </div>
  );
}
