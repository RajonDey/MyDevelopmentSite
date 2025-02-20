// app/blog/[slug]/page.tsx
import { blogPosts } from "@/data/mock-data";
import Image from "next/image";
import { notFound } from "next/navigation";

// Define the params interface
interface BlogParams {
  slug: string;
}

// Use Next.js Page props type structure
export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogParams>;
}) {
  // Await the params since they're a Promise in Next.js 15
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          <div className="relative h-96 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="prose prose-lg">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-6">{post.date}</p>
            <p className="text-gray-700 mb-6">{post.excerpt}</p>
            <div className="text-gray-800">
              {/* Render the full content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

// Update generateStaticParams to return the correct type
export async function generateStaticParams(): Promise<BlogParams[]> {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
