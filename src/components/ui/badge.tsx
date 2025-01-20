import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "outline" &&
          "border border-input bg-background text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
