import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Resources | Rajon Dey",
  description:
    "Comprehensive learning resources and tutorials on web development, programming, and more.",
};

// Learning page doesn't need to fetch blog posts
// It will use dedicated learning content from the [category] folder

function LearnSkeleton() {
  return (
    <div className="p-8 text-center">
      <div className="h-8 w-48 bg-gray-200 rounded-md mx-auto mb-8 animate-pulse"></div>
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-full bg-gray-200 rounded-md mb-8 animate-pulse"></div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 h-96 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="col-span-2 h-96 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <>
      <SEO
        title="Learning Resources | Rajon Dey"
        description="Comprehensive learning resources and tutorials on web development, programming, and more."
        url="/learn"
        type="website"
        tags={[
          "learning",
          "tutorials",
          "web development",
          "programming",
          "education",
        ]}
      />
      <div className="px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth tutorials, comprehensive guides, and structured learning
            paths for web development and programming concepts.
          </p>
        </div>

        {/* Learning Content */}
        <Suspense fallback={<LearnSkeleton />}>
          <div className="max-w-7xl mx-auto">
            {/* Learning Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* JavaScript Category */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">JS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">
                    JavaScript
                  </h3>
                  <p className="text-green-700 mb-6">
                    Master modern JavaScript with ES6+, async programming, and
                    real-world applications.
                  </p>
                  <Link
                    href="/learn/javascript"
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                  >
                    Start Learning →
                  </Link>
                </div>
              </div>

              {/* Database Category */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">DB</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">
                    Databases
                  </h3>
                  <p className="text-blue-700 mb-6">
                    Learn SQL optimization, NoSQL solutions, and database design
                    principles.
                  </p>
                  <Link
                    href="/learn/database"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Learning →
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Learning Resources */}
            <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                More Learning Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    📚 Interactive Tutorials
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Hands-on coding exercises and interactive examples to
                    reinforce your learning.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Step-by-step code examples</li>
                    <li>• Practice exercises</li>
                    <li>• Real-world projects</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    🎯 Structured Learning Paths
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Curated learning paths designed to take you from beginner to
                    advanced levels.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Progressive difficulty levels</li>
                    <li>• Prerequisite knowledge</li>
                    <li>• Certification paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}
