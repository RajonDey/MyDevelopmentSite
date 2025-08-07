"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/badge";
import { TrendingUp } from "lucide-react";

interface EnhancedPortfolioCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies?: string[];
  completionDate?: string;
  results?: string[];
  priority?: boolean;
}

export function EnhancedPortfolioCard({
  title,
  description,
  image,
  category,
  technologies = [],
  completionDate,
  results = [],
  priority = false,
}: EnhancedPortfolioCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative h-60">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <Badge className="mb-2 bg-green-600 hover:bg-green-700">
              {category}
            </Badge>
            {completionDate && (
              <span className="text-xs text-gray-200 ml-2">
                {completionDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Results highlight */}
        {results.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center mb-1 text-green-700">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Project Impact:</span>
            </div>
            <p className="text-sm font-medium text-gray-700">{results[0]}</p>
          </div>
        )}

        {/* Tech stack pills */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                +{technologies.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
