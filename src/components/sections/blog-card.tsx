import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  // excerpt: string;
  date: string;
  slug: string;
  image: string;
  isDetailed?: boolean;
}

export function BlogCard({
  title,
  // excerpt,
  date,
  image,
  slug,
  isDetailed = false,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 min-h-[84px] min-h-84 overflow-auto">{title}</h3>
          {isDetailed && (
            <>
              {/* <p className="text-gray-600 text-sm mb-3">{excerpt}</p> */}
              <p className="text-sm text-gray-500 mb-3">{date}</p>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
