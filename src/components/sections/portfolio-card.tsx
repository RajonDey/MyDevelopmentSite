import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies?: string[];
  client?: string;
  completionDate?: string;
  features?: string[];
  liveLink?: string | null;
  githubLink?: string | null;
  isDetailed?: boolean;
} 

export function PortfolioCard({
  title,
  description,
  image,
  category,
  liveLink,
  githubLink,
  isDetailed = false,
}: PortfolioCardProps) {
  return (
    <Link href="/portfolio">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-96">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          {isDetailed && (
            <>
              <p className="text-gray-600 text-sm mb-3">{description}</p>
              <Badge className="mb-3">{category}</Badge>
              <div className="flex gap-2">
                {liveLink && (
                  <Link
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">Live Demo</Button>
                  </Link>
                )}
                {githubLink && (
                  <Link
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">GitHub</Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
