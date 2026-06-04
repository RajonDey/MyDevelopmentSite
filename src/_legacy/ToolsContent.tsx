"use client";

import { useState } from "react";
import Link from "next/link";

// Sample tools data (replace with your own or fetch from an API)
const toolsData = [
  {
    category: "Software",
    items: [
      {
        name: "Visual Studio Code",
        description: "A lightweight, powerful code editor with extensions.",
        image: "/tools/vscode.png", // Add your own images or use placeholders
        affiliateLink: "https://code.visualstudio.com", // Replace with affiliate link if available
      },
      {
        name: "Git",
        description: "Version control system for tracking code changes.",
        image: "/tools/git.png",
        affiliateLink: null,
      },
    ],
  },
  {
    category: "Hardware",
    items: [
      {
        name: "Dell XPS 13",
        description: "A developer-friendly laptop with great performance.",
        image: "/tools/xps13.png",
        affiliateLink: "https://amzn.to/your-affiliate-link", // Example Amazon link
      },
      {
        name: "Logitech MX Keys",
        description: "Comfortable keyboard for long coding sessions.",
        image: "/tools/mxkeys.png",
        affiliateLink: "https://amzn.to/your-affiliate-link",
      },
    ],
  },
  {
    category: "Learning Resources",
    items: [
      {
        name: "Pluralsight",
        description: "Online courses for developers.",
        image: "/tools/pluralsight.png",
        affiliateLink: "https://pluralsight.pxf.io/your-affiliate-link",
      },
    ],
  },
];

export default function ToolsContent() {
  const [selectedCategory, setSelectedCategory] = useState(
    toolsData[0].category
  );

  const currentCategory = toolsData.find(
    (cat) => cat.category === selectedCategory
  );

  return (
    <>
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Gear</h2>
        <ul className="space-y-2">
          {toolsData.map((category) => (
            <li key={category.category}>
              <button
                onClick={() => setSelectedCategory(category.category)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  selectedCategory === category.category
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.category}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {selectedCategory}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover tools and gear to boost your development workflow.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentCategory?.items.map((tool) => (
            <div
              key={tool.name}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              {tool.affiliateLink ? (
                <Link
                  href={tool.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-green-600 hover:underline"
                >
                  Get it here
                </Link>
              ) : (
                <span className="text-gray-500">No link available</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
