import { Metadata } from "next";
import { SEO } from "@/components/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { fetchPost, fetchPosts } from "@/lib/wp-api";
import { WPPost } from "@/types/post";
import he from "he";

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
      images: [{ url: post.image || "/development-blog-placeholder.png" }],
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

  // Clean excerpt text for display (remove HTML and Tailwind classes if present)
  const excerptText = post.excerpt.rendered
    .replace(/<[^>]+>/g, "")
    .replace(/class="[^"]*"/g, "");

  return (
    <>
      <SEO
        title={post.title.rendered}
        description={excerptText}
        url={`/blog/${post.slug}`}
        image={post.image || "/development-blog-placeholder.png"}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="blog-detail space-y-12">
          {/* Header */}
          <header className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {post.title.rendered}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base font-medium">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {post.image && (
              <div className="relative mt-8 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src={post.image || "/development-blog-placeholder.png"}
                  alt={post.title.rendered}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <section className="space-y-8 text-gray-700">
            <p className="text-lg sm:text-xl italic text-gray-600 leading-relaxed border-l-4 border-green-500 pl-4">
              {
                he
                  .decode(
                    post.excerpt.rendered
                      .replace(/<[^>]+>/g, "") // Remove HTML tags
                      .replace(/\[\s*\.{3}\s*\]/g, "") // Remove "[…]" or similar "read more" indicators
                  )
                  .trim() // Remove leading/trailing whitespace
                  .slice(0, 500) + // Optional: Limit to 150 characters for consistency
                  (post.excerpt.rendered.replace(/<[^>]+>/g, "").length > 500
                    ? "..."
                    : "") // Add ellipsis if truncated
              }
            </p>
            <div
              className="space-y-6 leading-relaxed text-base sm:text-lg font-normal text-gray-800 
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 
              [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-gray-800 [&_h3]:mt-6 
              [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-gray-800 [&_h4]:mt-4 
              [&_p]:leading-relaxed [&_p]:my-4 
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 
              [&_li]:my-2 
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-6 [&_blockquote]:text-gray-600 [&_blockquote]:italic 
              [&_code]:font-mono [&_code]:text-sm [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded 
              [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:font-mono [&_pre]:text-sm 
              [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse 
              [&_th]:bg-gray-100 [&_th]:font-semibold [&_th]:text-gray-800 [&_th]:px-4 [&_th]:py-3 [&_th]:border [&_th]:border-gray-300 
              [&_td]:px-4 [&_td]:py-3 [&_td]:border [&_td]:border-gray-300 [&_td]:text-gray-700 
              [&_figure]:max-w-full [&_figure]:mx-auto [&_figure]:my-8 
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md 
              [&_figcaption]:text-center [&_figcaption]:text-gray-600 [&_figcaption]:text-sm [&_figcaption]:mt-2 
              [&_a]:text-green-600 [&_a]:hover:underline [&_a]:transition-colors [&_a]:duration-200"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </section>

          {/* CTA Section */}
          <aside className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">
              Enjoyed This Post?
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 text-center">
              Let’s connect to discuss your next project or idea!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/order">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                  Order Services
                </Button>
              </a>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-gray-600 hover:text-green-600 border-gray-300 hover:border-green-400 hover:bg-green-50 font-semibold px-6 py-2.5 rounded-full transition-all duration-200"
                >
                  Back to Blog
                </Button>
              </Link>
            </div>
          </aside>
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
