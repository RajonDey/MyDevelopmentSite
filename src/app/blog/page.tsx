// app/blog/page.tsx
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { blogPosts } from "@/data/mock-data";
import Image from "next/image";

export default function BlogPage() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
