import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import { WPPost } from "@/types/post";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Blog - Web Development Tutorials & Insights | Rajon Dey",
  description:
    "Learn web development with practical tutorials on React, Next.js, and modern web technologies. Expert insights from Rajon Dey.",
  keywords:
    "web development blog, React tutorials, Next.js guides, programming tips, software development",
};

// Blog categories for filtering
const categories = [
  { id: "all", name: "All Posts", icon: BookOpen },
  { id: "react", name: "React", icon: TrendingUp },
  { id: "nextjs", name: "Next.js", icon: Clock },
  { id: "wordpress", name: "WordPress", icon: BookOpen },
  { id: "ecommerce", name: "E-commerce", icon: TrendingUp },
  { id: "tutorials", name: "Tutorials", icon: BookOpen },
];

function BlogGrid({
  posts,
  searchTerm,
  selectedCategory,
}: {
  posts: WPPost[];
  searchTerm: string;
  selectedCategory: string;
}) {
  // Filter posts based on search term and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      post.categories?.includes(selectedCategory) ||
      post.title.rendered
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No posts found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosts.map((post, index) => (
        <BlogCard
          key={post.id}
          title={post.title.rendered}
          excerpt={post.excerpt.rendered}
          date={post.date}
          slug={post.slug}
          image={post.image}
          isDetailed={true}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}

async function getPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <SEO
        title="Blog - Web Development Tutorials & Insights | Rajon Dey"
        description="Learn web development with practical tutorials on React, Next.js, and modern web technologies. Expert insights from Rajon Dey."
        url="/blog"
        type="blog"
        tags={[
          "web development",
          "React",
          "Next.js",
          "tutorials",
          "programming",
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Web Development Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from practical tutorials, industry insights, and expert tips
            on React, Next.js, and modern web development technologies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">{posts.length}+ Articles</h3>
            <p className="text-sm text-muted-foreground">Expert insights</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">Weekly Updates</h3>
            <p className="text-sm text-muted-foreground">Fresh content</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold">5 Min Reads</h3>
            <p className="text-sm text-muted-foreground">Quick learning</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <BlogCard
                title={posts[0].title.rendered}
                excerpt={posts[0].excerpt.rendered}
                date={posts[0].date}
                slug={posts[0].slug}
                image={posts[0].image}
                isDetailed={true}
                priority={true}
              />
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <Suspense fallback={<BlogSkeleton />}>
            <BlogGrid posts={posts} searchTerm="" selectedCategory="all" />
          </Suspense>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-6 opacity-90">
            Get the latest web development tutorials and insights delivered to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </>
  );
}
