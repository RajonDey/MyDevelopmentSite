"use client";

import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState(
    `${category}-${posts[category][0]?.id}`
  );

  return (
    <>
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
        <Tabs posts={posts} activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4">
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
    </>
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
      <ul className="space-y-2">
        {posts[category].map((post) => (
          <li key={post.id}>
            <button
              onClick={() => setActiveTab(`${category}-${post.id}`)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeTab === `${category}-${post.id}`
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {post.title}
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
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const firstParagraph =
      doc.querySelector("p")?.textContent || "No excerpt available.";
    return firstParagraph;
  };

  return (
    <div>
      {activePost ? (
        <article className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {activePost.title}
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
