"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { WPPost } from "@/types/post";
import { BlogPostCard } from "@/components/rdx/blog/BlogPostCard";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "react", name: "React" },
  { id: "nextjs", name: "Next.js" },
  { id: "wordpress", name: "WordPress" },
  { id: "web-development", name: "Web Development" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "devops", name: "DevOps" },
  { id: "tools", name: "Tools" },
  { id: "industry", name: "Industry" },
  { id: "case-studies", name: "Case Studies" },
] as const;

type BlogFeedProps = {
  posts: WPPost[];
};

export function BlogFeed({ posts }: BlogFeedProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!posts?.length) return [];

    return posts.filter((post) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.rendered.toLowerCase().includes(q) ||
        post.excerpt.rendered.toLowerCase().includes(q);

      const matchesCategory =
        category === "all" ||
        post.categories?.includes(category) ||
        post.title.rendered.toLowerCase().includes(category.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative w-full md:max-w-md">
          <span className="sr-only">Search posts</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rdx-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-rdx border border-rdx-border bg-rdx-paper py-2.5 pl-10 pr-3 text-sm text-rdx-ink placeholder:text-rdx-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rdx-accent"
          />
        </label>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "shrink-0 rounded-rdx border px-3 py-1.5 text-sm transition",
              category === cat.id
                ? "border-rdx-ink bg-rdx-ink text-rdx-paper"
                : "border-rdx-border bg-rdx-paper text-rdx-muted hover:border-rdx-ink/30 hover:text-rdx-ink"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <BlogPostCard
              key={post.id}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered}
              date={post.date}
              slug={post.slug}
              image={post.image || "/development-blog-placeholder.png"}
              priority={index < 3}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-rdx border border-rdx-border bg-rdx-surface px-6 py-12 text-center">
          <p className="text-base font-semibold text-rdx-ink">No posts found</p>
          <p className="mt-2 text-sm text-rdx-muted">
            Try a different search or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
            className="mt-4 text-sm font-medium text-rdx-accent underline-offset-2 hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
