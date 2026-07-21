import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import he from "he";
import { fetchPost } from "@/lib/wp-api";
import type { WPPost } from "@/types/post";
import { siteMetadata } from "@/content/rdx/metadata";
import { blogContent } from "@/content/rdx/blog";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";

interface BlogParams {
  slug: string;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/class="[^"]*"/g, "");
}

function decodeTitle(title: string) {
  return he.decode(
    title
      .replace(/&#038;/g, "&")
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogParams>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchPost(slug);
    const description = stripHtml(post.excerpt.rendered).slice(0, 160);
    const image = post.image || `${siteMetadata.siteUrl}${siteMetadata.ogImage}`;

    return {
      title: `${decodeTitle(post.title.rendered)} | ${siteMetadata.siteName}`,
      description,
      openGraph: {
        title: decodeTitle(post.title.rendered),
        description,
        url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
        siteName: siteMetadata.siteName,
        images: [{ url: image }],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: decodeTitle(post.title.rendered),
        description,
        images: [image],
      },
    };
  } catch {
    const { slug } = await params;
    return {
      title: `Blog | ${siteMetadata.siteName}`,
      description: siteMetadata.description,
      openGraph: {
        title: `Blog | ${siteMetadata.siteName}`,
        url: `${siteMetadata.siteUrl}/blog/${slug}`,
        images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.ogImage}` }],
      },
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: WPPost;
  try {
    post = await fetchPost(slug);
  } catch {
    return notFound();
  }

  const excerptText = he
    .decode(stripHtml(post.excerpt.rendered).replace(/\[\s*\.{3}\s*\]/g, ""))
    .trim();

  return (
    <>
      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer className="max-w-3xl">
          <article className="space-y-10">
            <header className="space-y-4">
              <p className="text-sm text-rdx-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink md:text-4xl">
                {decodeTitle(post.title.rendered)}
              </h1>
              {post.image && (
                <div className="relative mt-6 h-56 overflow-hidden rounded-rdx border border-rdx-border sm:h-72 md:h-80">
                  <Image
                    src={post.image || "/development-blog-placeholder.png"}
                    alt={decodeTitle(post.title.rendered)}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}
            </header>

            {excerptText && (
              <p className="border-l-2 border-rdx-accent pl-4 text-base italic leading-relaxed text-rdx-muted md:text-lg">
                {excerptText.length > 500
                  ? `${excerptText.slice(0, 500)}…`
                  : excerptText}
              </p>
            )}

            <div
              className="space-y-5 text-base leading-relaxed text-rdx-ink
                [&_a]:text-rdx-accent [&_a]:underline-offset-2 hover:[&_a]:underline
                [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-rdx-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-rdx-muted
                [&_code]:rounded [&_code]:bg-rdx-surface [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm
                [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-rdx-muted
                [&_figure]:my-8 [&_figure]:mx-auto [&_figure]:max-w-full
                [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-rdx-ink
                [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-rdx-ink
                [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-rdx-ink
                [&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-rdx
                [&_li]:my-1.5
                [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
                [&_p]:my-4
                [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-rdx [&_pre]:bg-rdx-ink [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-rdx-paper
                [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse
                [&_td]:border [&_td]:border-rdx-border [&_td]:px-3 [&_td]:py-2
                [&_th]:border [&_th]:border-rdx-border [&_th]:bg-rdx-surface [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
                [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="bg-rdx-surface pt-0 pb-12">
        <RdxContainer className="max-w-3xl">
          <div className="rounded-rdx border border-rdx-border bg-rdx-paper p-6 md:p-8">
            <h2 className="text-lg font-semibold text-rdx-ink">
              {blogContent.auditCta.headline}
            </h2>
            <p className="mt-2 text-sm text-rdx-muted">
              {blogContent.auditCta.subhead}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <RdxButton href={blogContent.auditCta.href}>
                {blogContent.auditCta.label}
              </RdxButton>
              <RdxButton href="/blog" variant="secondary">
                Back to blog
              </RdxButton>
            </div>
            <p className="mt-4 text-xs text-rdx-muted">
              <Link href="/work" className="underline-offset-2 hover:underline">
                See recent work
              </Link>
            </p>
          </div>
        </RdxContainer>
      </RdxSection>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
