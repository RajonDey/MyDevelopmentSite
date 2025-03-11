import { Metadata } from "next";
import { SEO } from "@/components/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchPost, fetchPosts } from "@/lib/wp-api";
import { WPPost } from "@/types/post";
interface BlogParams {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      url: `https://development.rajondey.com/blog/${post.slug}`,
      images: [{ url: "/placeholder.svg" }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let post: WPPost;
  try {
    post = await fetchPost(resolvedParams.slug);
  } catch {
    return notFound();
  }

  return (
    <>
      <SEO
        title={post.title.rendered}
        description={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
        url={`/blog/${post.slug}`}
        image={post.image || "/placeholder.svg"} // Update with featured image later
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title.rendered}
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title.rendered}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-800 mb-8">
            <p className="text-gray-600 italic mb-6">
              {post.excerpt.rendered.replace(/<[^>]+>/g, "")}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          {/* CTA */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Enjoyed This Post?</h3>
            <p className="text-gray-600 mb-4">
              Let’s connect to discuss your next project or idea!
            </p>
            <a
              href={`https://wa.me/01737997143?text=Hi%20Rajon,%20I%20loved%20your%20post%20on%20${encodeURIComponent(
                post.title.rendered
              )}!`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Contact Me
              </Button>
            </a>
            <Link href="/blog">
              <Button variant="outline" className="ml-4">
                Back to Blog
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
