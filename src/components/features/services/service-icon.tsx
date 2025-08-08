"use client";

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

interface ServiceIconProps {
  iconName?: string;
  className?: string;
}

export function ServiceIcon({
  iconName,
  className = "w-8 h-8 text-green-600",
}: ServiceIconProps) {
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

  if (!IconComponent) {
    return <div className={className} />;
  }

  return <IconComponent className={className} />;
}
