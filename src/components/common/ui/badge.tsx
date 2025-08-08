import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-white ${className}`}
    >
      {children}
    </span>
  );
}
