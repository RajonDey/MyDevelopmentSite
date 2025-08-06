import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { BlogCard } from "@/components/sections/blog-card";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import { WPPost } from "@/types/post";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Code,
  Database,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Blog & Learn - Web Development Tutorials & Resources | Rajon Dey",
  description:
    "Learn web development with practical tutorials, courses and guides on React, Next.js, databases, and modern web technologies. Expert insights from Rajon Dey.",
  keywords:
    "web development blog, React tutorials, Next.js guides, programming tips, software development, learning resources, database tutorials",
};

// Blog and learning categories for filtering
const categories = [
  { id: "all", name: "All Content", icon: BookOpen },
  { id: "blog", name: "Blog Posts", icon: TrendingUp },
  { id: "learn", name: "Learning", icon: Clock },
  // Blog categories
  { id: "react", name: "React", icon: TrendingUp },
  { id: "nextjs", name: "Next.js", icon: Clock },
  { id: "wordpress", name: "WordPress", icon: BookOpen },
  { id: "ecommerce", name: "E-commerce", icon: TrendingUp },
  // Learning categories
  { id: "javascript", name: "JavaScript", icon: BookOpen },
  { id: "database", name: "Databases", icon: BookOpen },
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
        title="Blog & Learn - Web Development Tutorials & Resources | Rajon Dey"
        description="Learn web development with practical tutorials, courses and guides on React, Next.js, databases, and modern web technologies. Expert insights from Rajon Dey."
        url="/blog"
        type="blog"
        tags={[
          "web development",
          "React",
          "Next.js",
          "tutorials",
          "programming",
          "learning resources",
          "database tutorials",
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog & Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from practical tutorials, industry insights, comprehensive
            guides, and expert tips on React, Next.js, databases and modern web
            development technologies.
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

        {/* Content Categories */}
        <div className="mb-8">
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/blog">
              <Button
                variant="secondary"
                className="border-b-2 border-green-500 text-green-700"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                All Articles
              </Button>
            </Link>
            <Link href="/learn/javascript">
              <Button variant="secondary">
                <Code className="w-5 h-5 mr-2" />
                JavaScript
              </Button>
            </Link>
            <Link href="/learn/databases">
              <Button variant="secondary">
                <Database className="w-5 h-5 mr-2" />
                Databases
              </Button>
            </Link>
            <Link href="/blog?category=react">
              <Button variant="secondary">
                <FileText className="w-5 h-5 mr-2" />
                React
              </Button>
            </Link>
            <Link href="/blog?category=nextjs">
              <Button variant="secondary">
                <FileText className="w-5 h-5 mr-2" />
                Next.js
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Posts section removed */}

        {/* Learning Topics Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Learning Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* JavaScript Topic Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-semibold">JavaScript</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn JavaScript fundamentals, advanced techniques, and modern
                ES6+ features.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium">Topics include:</div>
                <ul className="text-sm text-gray-600 pl-5 list-disc">
                  <li>Promises & Async/Await</li>
                  <li>ES6+ Features</li>
                  <li>DOM Manipulation</li>
                </ul>
              </div>
              <Link href="/learn/javascript">
                <Button variant="outline" className="w-full">
                  View JavaScript Resources
                </Button>
              </Link>
            </div>

            {/* Database Topic Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold">Databases</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn about SQL and NoSQL databases, data modeling, and
                optimization techniques.
              </p>
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium">Topics include:</div>
                <ul className="text-sm text-gray-600 pl-5 list-disc">
                  <li>SQL Fundamentals</li>
                  <li>MongoDB & NoSQL</li>
                  <li>Data Modeling</li>
                </ul>
              </div>
              <Link href="/learn/databases">
                <Button variant="outline" className="w-full">
                  View Database Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>

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
