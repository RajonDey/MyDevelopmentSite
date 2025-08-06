"use client";

import { useState } from "react";
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
  initialCategory = "javascript",
}: {
  posts: Post[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState<"javascript" | "databases">(
    initialCategory === "databases" ? "databases" : "javascript"
  );

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
    <div className="flex flex-col gap-8">
      {/* Category Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setCategory("javascript")}
          className={`px-4 py-2 rounded-lg ${
            category === "javascript"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => setCategory("databases")}
          className={`px-4 py-2 rounded-lg ${
            category === "databases"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Databases
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <LearningContent posts={categorizedPosts} />
      </div>
    </div>
  );
}
