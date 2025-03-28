import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import he from "he";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image: string;
  isDetailed?: boolean;
}

export function BlogCard({
  title,
  excerpt,
  date,
  image,
  slug,
  isDetailed = false,
}: BlogCardProps) {
  // Process excerpt when isDetailed is true
  const processedExcerpt = isDetailed
    ? he
        .decode(
          excerpt
            .replace(/<[^>]+>/g, "") // Remove HTML tags
            .replace(/\[\s*\.{3}\s*\]/g, "") // Remove "[…]" or similar "read more" indicators
        )
        .trim() // Remove leading/trailing whitespace
        .slice(0, 150) + // Limit to 150 characters as per comment
      (excerpt.replace(/<[^>]+>/g, "").length > 150 ? "..." : "") // Add ellipsis if truncated
    : "";

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48">
          <Image
            src={image || "/development-blog-placeholder.png"}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 min-h-[84px] overflow-auto">
            {title}
          </h3>
          {isDetailed && (
            <>
              <p className="text-gray-600 text-sm mb-3">{processedExcerpt}</p>
              <p className="text-sm text-gray-500 mb-3">{date}</p>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
