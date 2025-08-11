"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/common/ui/Card";
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
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          {/* Loading skeleton */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${
              isLoading ? "block" : "hidden"
            }`}
          />

          {/* Error fallback */}
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs">Image unavailable</p>
              </div>
            </div>
          )}

          {/* Main image */}
          <Image
            src={image || "/development-blog-placeholder.png"}
            alt={he.decode(title)}
            fill
            priority={priority}
            className={`object-cover transition-all duration-500 ${
              isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
            {he.decode(
              title
                .replace(/&#038;/g, "&")
                .replace(/&#8217;/g, "'")
                .replace(/&#8216;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")
            )}
          </h3>

          <p className="text-gray-500 text-sm mb-3 font-medium">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {isDetailed && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-1">
              {he.decode(excerpt.replace(/<[^>]+>/g, ""))}
            </p>
          )}

          {/* Read more indicator */}
          <div className="mt-auto pt-3">
            <span className="inline-flex items-center text-green-600 text-sm font-medium group-hover:text-green-700 transition-colors">
              Read more
              <svg
                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
