"use client";

import Image from "next/image";
import Link from "next/link";
import he from "he";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  priority?: boolean;
};

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

export function BlogPostCard({
  title,
  excerpt,
  date,
  slug,
  image,
  priority = false,
}: BlogPostCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const plainExcerpt = he.decode(excerpt.replace(/<[^>]+>/g, ""));

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-rdx border border-rdx-border bg-rdx-paper transition hover:border-rdx-ink/20"
    >
      <div className="relative h-44 overflow-hidden bg-rdx-surface">
        {!loaded && !error && (
          <div className="absolute inset-0 animate-pulse bg-rdx-border/40" />
        )}
        {error ? (
          <div className="flex h-full items-center justify-center text-xs text-rdx-muted">
            Image unavailable
          </div>
        ) : (
          <Image
            src={image || "/development-blog-placeholder.png"}
            alt={decodeTitle(title)}
            fill
            priority={priority}
            className={cn(
              "object-cover transition duration-300 group-hover:scale-[1.02]",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(true);
              setError(true);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium text-rdx-muted">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="text-base font-semibold leading-snug text-rdx-ink line-clamp-2">
          {decodeTitle(title)}
        </h3>
        <p className="text-sm leading-relaxed text-rdx-muted line-clamp-3">
          {plainExcerpt}
        </p>
        <span className="mt-auto pt-2 text-sm font-medium text-rdx-accent">
          Read more →
        </span>
      </div>
    </Link>
  );
}
