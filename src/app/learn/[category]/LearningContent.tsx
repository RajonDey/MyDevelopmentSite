"use client";

import { useState, useEffect } from "react";

// Helper function to decode HTML entities (safe for SSR)
function decodeHtmlEntities(text: string): string {
  if (typeof window === "undefined") {
    // Server-side: return text as-is
    return text;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

interface Post {
  id: number;
  title: string;
  content: string;
  categories: number[];
  image: string;
}

interface CategorizedPosts {
  [key: string]: Post[];
}

export default function LearningContent({
  posts,
}: {
  posts: CategorizedPosts;
}) {
  const category = Object.keys(posts)[0];
  const [activeTab, setActiveTab] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Set initial active tab after hydration
  useEffect(() => {
    if (posts[category] && posts[category].length > 0) {
      setActiveTab(`${category}-${posts[category][0].id}`);
      setIsHydrated(true);
    }
  }, [posts, category]);

  // Show loading state while hydrating
  if (!isHydrated || !activeTab) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
            {category} Posts
          </h2>
          <div className="space-y-3">
            {posts[category]?.map((post) => (
              <div
                key={post.id}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-100 animate-pulse"
              >
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
      {/* Sidebar */}
      <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
          {category} Posts
        </h2>
        <Tabs posts={posts} activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {category}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {category === "JavaScript"
            ? "Master JavaScript with practical tutorials."
            : "Learn about SQL, NoSQL, and database design."}
        </p>
        <Content posts={posts} activeTab={activeTab} />
      </main>
    </div>
  );
}

// Client-side Tabs Component
function Tabs({
  posts,
  activeTab,
  setActiveTab,
}: {
  posts: CategorizedPosts;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const category = Object.keys(posts)[0];
  return (
    <div>
      <ul className="space-y-3">
        {posts[category].map((post) => (
          <li key={post.id}>
            <button
              onClick={() => setActiveTab(`${category}-${post.id}`)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                activeTab === `${category}-${post.id}`
                  ? "bg-green-500 text-white shadow-lg border-green-600 transform scale-105"
                  : "text-gray-700 hover:bg-gray-100 hover:border-gray-300 border-gray-200 bg-white"
              }`}
            >
              <div className="font-medium text-sm leading-tight">
                {decodeHtmlEntities(post.title)}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Client-side Content Component
function Content({
  posts,
  activeTab,
}: {
  posts: CategorizedPosts;
  activeTab: string;
}) {
  const [category, postId] = activeTab.split("-");
  const activePost = posts[category].find(
    (post) => post.id === parseInt(postId)
  );

  const getExcerpt = (content: string) => {
    if (typeof window === "undefined") {
      // Server-side: simple text extraction
      const textOnly = content.replace(/<[^>]*>/g, "");
      const firstParagraph = textOnly.split("\n")[0];
      return firstParagraph.length > 150
        ? firstParagraph.substring(0, 150) + "..."
        : firstParagraph || "No excerpt available.";
    }

    // Client-side: full HTML processing
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Get first paragraph or first 150 characters
    const firstParagraph = textContent.split("\n")[0];
    return firstParagraph.length > 150
      ? firstParagraph.substring(0, 150) + "..."
      : firstParagraph || "No excerpt available.";
  };

  return (
    <div>
      {activePost ? (
        <article className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {decodeHtmlEntities(activePost.title)}
          </h2>
          <p className="text-lg italic text-gray-600 leading-relaxed border-l-4 border-green-500 pl-4 mb-6">
            {getExcerpt(activePost.content)}
          </p>
          <div
            className="space-y-6 leading-relaxed text-base sm:text-lg font-normal text-gray-800 
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 
              [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-gray-800 
              [&_p]:leading-relaxed 
              [&_ul]:list-disc [&_ul]:pl-6 
              [&_ol]:list-decimal [&_ol]:pl-6 
              [&_figure]:max-w-full [&_figure]:mx-auto [&_figure]:my-8 
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md 
              [&_figcaption]:text-center [&_figcaption]:text-gray-600 [&_figcaption]:text-sm [&_figcaption]:mt-2 
              [&_a]:text-green-600 [&_a]:hover:underline 
              [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto 
              [&_code]:font-mono [&_code]:text-sm"
            dangerouslySetInnerHTML={{ __html: activePost.content }}
          />
        </article>
      ) : (
        <p className="text-gray-500">
          Select a topic from the sidebar to view content.
        </p>
      )}
    </div>
  );
}
