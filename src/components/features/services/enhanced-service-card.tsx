"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Badge } from "@/components/common/ui/badge";
import { getServicePriceDescription } from "@/data/pricing";
import {
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Code,
  ShoppingCart,
  Layers,
  Globe,
  Mail,
  Wrench,
  Settings,
  LucideIcon,
} from "lucide-react";

interface EnhancedServiceCardProps {
  id: string | number; // Updated to support string IDs
  title: string;
  description?: string;
  price?: number;
  image: string;
  features?: string[];
  platforms?: string[];
  technologies?: string[];
  isRecommended?: boolean;
  iconName?: string;
  // New properties for enhanced service card
  benefits?: string[];
  expectedOutcome?: string;
}

export function EnhancedServiceCard({
  id,
  title,
  description,
  price,
  platforms = [],
  technologies = [],
  isRecommended = false,
  benefits = [],
  expectedOutcome,
  iconName,
}: EnhancedServiceCardProps) {
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
    <Card
      className={`group transition-all duration-300 hover:shadow-xl h-full flex flex-col ${
        isRecommended
          ? "border-green-500 relative shadow-lg"
          : "hover:-translate-y-1"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium z-10 shadow-md border border-green-500">
          Recommended
        </div>
      )}

      <CardContent
        className={`p-5 ${isRecommended ? "pt-7" : ""} flex flex-col h-full`}
      >
        <div className="flex items-start mb-4">
          {IconComponent && (
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mr-3 shadow-md transition-all duration-300 group-hover:scale-105 flex-shrink-0 ${
                isRecommended ? "bg-green-600" : "bg-gray-800"
              }`}
            >
              {IconComponent && (
                <IconComponent className="w-6 h-6 text-white" />
              )}
            </div>
          )}
          <div>
            <h3 className="font-bold text-xl mb-1">{title}</h3>
            {price !== undefined && (
              <p className="text-gray-700 font-medium">
                <span className="text-xl font-bold text-green-600">
                  {typeof id === "string"
                    ? `${getServicePriceDescription(id)}`
                    : `Starting at $${price}`}
                </span>
              </p>
            )}
          </div>
        </div>

        {description && <p className="text-gray-600 mb-4">{description}</p>}

        {expectedOutcome && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4">
            <p className="text-sm font-medium text-gray-800">
              <span className="text-green-600">Expected Outcome:</span>{" "}
              {expectedOutcome}
            </p>
          </div>
        )}

        {benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Key Benefits:</h4>
            <ul className="space-y-1">
              {benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </li>
              ))}
              {benefits.length > 3 && (
                <li className="text-sm text-gray-500 pl-6 italic">
                  + {benefits.length - 3} more benefits
                </li>
              )}
            </ul>
          </div>
        )}

        {(platforms.length > 0 || technologies.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-5">
            {platforms.slice(0, 3).map((platform, index) => (
              <Badge
                key={index}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-200 font-medium"
              >
                {platform}
              </Badge>
            ))}
            {platforms.length > 3 && (
              <span className="text-xs text-gray-500">
                +{platforms.length - 3}
              </span>
            )}
            {technologies.slice(0, 3).map((tech, index) => (
              <Badge
                key={index}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-200 font-medium"
              >
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs text-gray-500">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>

        <div className="flex flex-col sm:flex-row gap-1 mt-4">
          <Link href={`/services/${id}`} className="w-full sm:flex-1">
            <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center gap-1">
              View Details
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/hire?service=${id}`} className="w-full sm:flex-1">
            <Button
              className={`w-full flex items-center justify-center gap-2 ${
                isRecommended
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              Hire Me
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
