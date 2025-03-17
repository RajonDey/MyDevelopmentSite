import { Metadata } from "next";
import { SEO } from "@/components/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning | Rajon Dey",
  description: "Explore tutorials on Databases and JavaScript.",
};

export default function LearnPage() {
  return (
    <>
      <SEO
        title="Learning | Rajon Dey"
        description="Explore tutorials on Databases and JavaScript."
        url="/learn"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Learning
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Dive into tutorials on various topics to enhance your skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/learn/javascript"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border"
          >
            <h2 className="text-2xl font-semibold text-gray-900">JavaScript</h2>
            <p className="text-gray-600 mt-2">
              Master JavaScript with practical tutorials.
            </p>
          </Link>
          <Link
            href="/learn/database"
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Databases</h2>
            <p className="text-gray-600 mt-2">
              Learn about SQL, NoSQL, and database design.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
