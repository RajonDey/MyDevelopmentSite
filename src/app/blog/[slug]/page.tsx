// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/mock-data";
import Image from "next/image";

interface BlogDetailsPageProps {
  params: {
    slug: string,
  };
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="relative h-96 mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-500 mb-8">{post.date}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
