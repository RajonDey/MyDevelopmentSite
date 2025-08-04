"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import he from "he";
import { useState } from "react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  isDetailed?: boolean;
  priority?: boolean;
}

export function BlogCard({
  title,
  excerpt,
  date,
  slug,
  image,
  isDetailed = false,
  priority = false,
}: BlogCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48">
          <div
            className={`absolute inset-0 bg-gray-200 animate-pulse ${
              isLoading ? "block" : "hidden"
            }`}
          />
          <Image
            src={image || "/development-blog-placeholder.png"}
            alt={he.decode(title)}
            fill
            priority={priority}
            className={`object-cover rounded-t-lg transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{he.decode(title)}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {isDetailed && (
            <p className="text-gray-600 text-sm">
              {he.decode(excerpt.replace(/<[^>]+>/g, ""))}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
