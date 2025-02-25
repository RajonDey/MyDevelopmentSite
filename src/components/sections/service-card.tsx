import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  id: number;
  title: string;
  description?: string; // Optional for homepage
  price?: number; // Optional for homepage
  image: string;
  features?: string[]; // Optional for homepage
  platforms?: string[]; // Optional for homepage
  technologies?: string[]; // Optional for homepage
  isDetailed?: boolean; // Toggle between minimal and detailed views
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  image,
  features = [],
  platforms = [],
  technologies = [],
  isDetailed = false,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="relative h-48">
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
              {description && (
                <p className="text-muted-foreground text-sm mb-3">
                  {description}
                </p>
              )}
              {price !== undefined && (
                <p className="text-lg font-bold text-primary mb-3">${price}</p>
              )}
              {features.length > 0 && (
                <ul className="list-disc pl-4 text-sm text-muted-foreground mb-4">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              {(platforms.length > 0 || technologies.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {platforms.map((platform, index) => (
                    <Badge key={index} variant="secondary">
                      {platform}
                    </Badge>
                  ))}
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </>
          )}

          <Button variant="text">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
}
