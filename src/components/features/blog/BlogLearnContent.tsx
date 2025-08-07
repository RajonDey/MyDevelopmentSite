"use client";

import { useState, useEffect, useMemo } from "react";
import { WPPost } from "@/types/blog";
import { BlogCard } from "@/components/features/blog/BlogCard";
import { BookOpen, FileText, Code, Database, Search } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/ui/tabs";
import FilterDropdown from "@/components/common/ui/FilterDropdown";

// Define content categories
const categories = [
  { id: "all", name: "All Content", icon: BookOpen },
  { id: "blog", name: "Blog Posts", icon: FileText },
  { id: "learn", name: "Learning", icon: Code },
  // Blog subcategories
  { id: "react", name: "React", icon: FileText },
  { id: "nextjs", name: "Next.js", icon: FileText },
  { id: "wordpress", name: "WordPress", icon: FileText },
  // Learning subcategories
  { id: "javascript", name: "JavaScript", icon: Code },
  { id: "database", name: "Databases", icon: Database },
];

// Extract unique category names for the filter dropdown
// (We use this directly in the FilterDropdown component)

export default function BlogLearnContent({
  posts,
  initialCategory,
}: {
  posts: WPPost[];
  initialCategory?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(initialCategory || "all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLearningView, setIsLearningView] = useState(
    initialCategory === "javascript" ||
      initialCategory === "database" ||
      initialCategory === "learn"
  );

  // Use memo for filtered posts based on search, tab, and category
  const filteredPosts = useMemo(() => {
    if (!posts || posts.length === 0) return [];

    return posts.filter((post) => {
      // Match search term in title or excerpt
      const matchesSearch =
        !searchTerm ||
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase());

      // Match primary tab category
      const matchesPrimaryCategory =
        activeTab === "all" ||
        (post.categories && post.categories.includes(activeTab)) ||
        post.title.rendered.toLowerCase().includes(activeTab.toLowerCase());

      // Match dropdown selected category
      const matchesDropdownCategory =
        !selectedCategory ||
        selectedCategory === "" ||
        (post.categories &&
          post.categories.some((cat) => {
            const category = categories.find((c) => c.id === cat);
            return category && category.name === selectedCategory;
          }));

      return matchesSearch && matchesPrimaryCategory && matchesDropdownCategory;
    });
  }, [searchTerm, activeTab, selectedCategory, posts]);

  // Set learning view flag when tab changes and handle initialCategory setting
  useEffect(() => {
    // Update learning view flag when tab changes
    setIsLearningView(
      activeTab === "javascript" ||
        activeTab === "database" ||
        activeTab === "learn"
    );

    // If initialCategory is provided but doesn't match any tab ID directly,
    // try to find a matching category by name or slug
    if (initialCategory && initialCategory !== activeTab) {
      const matchingCategory = categories.find(
        (cat) =>
          cat.id === initialCategory ||
          cat.id.toLowerCase() === initialCategory.toLowerCase() ||
          cat.name.toLowerCase() === initialCategory.toLowerCase()
      );

      if (matchingCategory) {
        setActiveTab(matchingCategory.id);
      }
    }
  }, [activeTab, initialCategory]);

  // Additional setup for learning view if needed
  useEffect(() => {
    // Any additional setup when switching to learning view
    // For now we just use the isLearningView flag to determine the UI layout
  }, [isLearningView]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="w-full md:w-auto">
            <FilterDropdown
              options={categories.map((cat) => cat.name)}
              onSelect={setSelectedCategory}
              placeholder="Filter by category"
              selectedValue={selectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="bg-white p-1 border border-gray-200 rounded-lg shadow-sm flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLearningView ? (
            // Learning View - Topic-based structured content
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl shadow-sm h-fit">
                <h3 className="text-xl font-semibold mb-4">
                  {activeTab === "javascript"
                    ? "JavaScript Topics"
                    : activeTab === "database"
                    ? "Database Topics"
                    : "Learning Topics"}
                </h3>
                <div className="space-y-2">
                  {filteredPosts.slice(0, 5).map((post, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-3 rounded-lg transition-colors duration-200 hover:bg-green-100"
                    >
                      {post.title.rendered}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">
                  {filteredPosts[0]?.title.rendered || "Select a topic"}
                </h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: filteredPosts[0]?.content.rendered || "",
                  }}
                />
              </div>
            </div>
          ) : // Blog View - Card-based content
          filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title.rendered}
                  excerpt={post.excerpt.rendered}
                  date={post.date}
                  slug={post.slug}
                  image={post.image || "/development-blog-placeholder.png"}
                  isDetailed={true}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No content found
              </h3>
              <p className="text-gray-500">
                {searchTerm && selectedCategory ? (
                  <>
                    No results for &ldquo;{searchTerm}&rdquo; in{" "}
                    {selectedCategory} category.
                  </>
                ) : searchTerm ? (
                  <>No results for &ldquo;{searchTerm}&rdquo;.</>
                ) : selectedCategory ? (
                  <>No content found in {selectedCategory} category.</>
                ) : (
                  <>Try adjusting your search or filter criteria.</>
                )}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setActiveTab("all");
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
