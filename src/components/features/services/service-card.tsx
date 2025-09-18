import Link from "next/link";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Badge } from "@/components/common/ui/badge";
import { getServicePriceDescription } from "@/data/pricing";
import {
  Code,
  ShoppingCart,
  Layers,
  Globe,
  Mail,
  Wrench,
  Settings,
  LucideIcon,
} from "lucide-react";

interface ServiceCardProps {
  id: string | number; // Updated to support string IDs
  title: string;
  description?: string;
  price?: number;
  image: string;
  features?: string[];
  platforms?: string[];
  technologies?: string[];
  isDetailed?: boolean;
  iconName?: string;
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  features = [],
  platforms = [],
  technologies = [],
  isDetailed = false,
  iconName,
}: ServiceCardProps) {
  // Map icon names to actual components
  const getIconComponent = (name?: string): LucideIcon | null => {
    if (!name) return null;

    const iconMap: Record<string, LucideIcon> = {
      Code,
      ShoppingCart,
      Layers,
      Globe,
      Mail,
      Wrench,
      Settings,
    };

    return iconMap[name as keyof typeof iconMap] || null;
  };

  const IconComponent = iconName ? getIconComponent(iconName) : null;
  return (
    <Link href={`/services/${id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {isDetailed ? (
          // Detailed view (used on /services page)
          <>
            <CardContent className="p-4 max-h-[480px] min-h-[480px] custom-scrollbar">
              {IconComponent && (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black mr-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-800 mb-2 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2 min-h-14">{title}</h3>
              {description && (
                <p className="text-muted-foreground text-sm mb-3">
                  {description}
                </p>
              )}
              {price !== undefined && (
                <p className="text-lg font-bold text-primary mb-3">
                  {getServicePriceDescription(`${id}`)}
                </p>
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
                    <Badge
                      key={index}
                      className="bg-secondary text-secondary-foreground"
                    >
                      {platform}
                    </Badge>
                  ))}
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      className="border border-input bg-background"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="mt-auto">
                <Button
                  variant="outline"
                  className="transition-all duration-300 group-hover:scale-105 group-hover:text-primary w-full"
                >
                  View Details
                </Button>
                <div className="text-xs text-gray-400 text-center mt-2">
                  Powered by RDX Technologies
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          // Minimal view (used on homepage)
          <CardContent className="p-6">
            {IconComponent && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black mr-3 transition-all duration-300 group-hover:scale-105 group-hover:bg-gray-800 mb-2 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)]">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 min-h-14 mb-2">
                {title}
              </h3>
              {description && (
                <p className="text-gray-600 text-sm min-h-20 mt-1 mb-3">
                  {description}
                </p>
              )}
            </div>
            {price !== undefined && (
              <p className="text-gray-600 text-sm mb-4">
                {getServicePriceDescription(`${id}`)}
              </p>
            )}
            <div>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
              <div className="text-xs text-gray-400 text-center mt-2">
                Powered by RDX Technologies
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
