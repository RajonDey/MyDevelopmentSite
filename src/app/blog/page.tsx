import { Metadata } from "next";
import { Suspense } from "react";
import { blogContent } from "@/content/rdx/blog";
import { pageMeta } from "@/content/rdx/pages";
import { siteMetadata } from "@/content/rdx/metadata";
import type { WPPost } from "@/types/post";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";
import { BlogFeed } from "@/components/rdx/blog/BlogFeed";
import { BlogCardSkeleton } from "@/components/rdx/blog/BlogCardSkeleton";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { RdxButton } from "@/components/rdx/ui/Button";
import { RdxCard } from "@/components/rdx/ui/Card";

export const metadata: Metadata = {
  title: pageMeta.blog.title,
  description: pageMeta.blog.description,
  openGraph: {
    title: pageMeta.blog.title,
    description: pageMeta.blog.description,
    url: `${siteMetadata.siteUrl}/blog`,
    siteName: siteMetadata.siteName,
    images: [{ url: `${siteMetadata.siteUrl}${siteMetadata.ogImage}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageMeta.blog.title,
    description: pageMeta.blog.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.ogImage}`],
  },
};

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}

async function getPosts(): Promise<WPPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:3000";

    if (baseUrl.includes("wp-json")) {
      const res = await fetch(`${baseUrl}/posts?per_page=100&status=publish`, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch posts: ${res.status} ${res.statusText}`
        );
      }

      const posts = await res.json();

      return Promise.all(
        posts.map(
          async (post: {
            id: number;
            slug: string;
            title: { rendered: string };
            content: { rendered: string };
            excerpt: { rendered: string };
            date: string;
            featured_media: number;
            link: string;
            categories: number[];
          }) => {
            let imageUrl = "/development-blog-placeholder.png";

            if (post.featured_media) {
              try {
                const mediaRes = await fetch(
                  `${baseUrl}/media/${post.featured_media}`
                );
                if (mediaRes.ok) {
                  const mediaData = await mediaRes.json();
                  imageUrl =
                    mediaData.source_url || "/development-blog-placeholder.png";
                }
              } catch (mediaError) {
                console.warn(
                  "Failed to fetch media for post",
                  post.id,
                  mediaError
                );
              }
            }

            return {
              id: post.id,
              slug: post.slug,
              title: { rendered: post.title.rendered },
              content: { rendered: post.content.rendered },
              excerpt: { rendered: post.excerpt.rendered },
              date: post.date,
              featured_media: post.featured_media,
              link: post.link,
              image: imageUrl,
              category_ids: post.categories || [],
              categories: post.categories || [],
            };
          }
        )
      );
    }

    const res = await fetch(`${baseUrl}/api/posts`, {
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
      <RdxSection className="pt-4 md:pt-8">
        <RdxContainer>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-rdx-ink md:text-4xl">
              {blogContent.title}
            </h1>
            <p className="text-base leading-relaxed text-rdx-muted">
              {blogContent.intro}
            </p>
          </div>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="bg-rdx-surface pt-0">
        <RdxContainer>
          <RdxCard className="border-rdx-accent/20">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-rdx-ink">
                  {blogContent.auditCta.headline}
                </h2>
                <p className="mt-1 text-sm text-rdx-muted">
                  {blogContent.auditCta.subhead}
                </p>
              </div>
              <RdxButton href={blogContent.auditCta.href} className="shrink-0">
                {blogContent.auditCta.label}
              </RdxButton>
            </div>
          </RdxCard>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="pt-8">
        <RdxContainer>
          <Suspense fallback={<BlogSkeleton />}>
            <BlogFeed posts={posts} />
          </Suspense>
        </RdxContainer>
      </RdxSection>

      <RdxSection className="pt-0 pb-12">
        <RdxContainer className="max-w-2xl">
          <BeehiivSubscribe />
        </RdxContainer>
      </RdxSection>
    </>
  );
}
