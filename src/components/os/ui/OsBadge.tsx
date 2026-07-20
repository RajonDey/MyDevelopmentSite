import { cn } from "@/lib/utils";

type OsBadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "p1" | "p2" | "p3" | "accent";
};

const variants: Record<NonNullable<OsBadgeProps["variant"]>, string> = {
  default: "border-os-border bg-os-surface-raised text-os-muted",
  p1: "border-os-red/40 bg-os-red/10 text-os-red",
  p2: "border-os-yellow/40 bg-os-yellow/10 text-os-yellow",
  p3: "border-os-border bg-os-surface-raised text-os-muted",
  accent: "border-os-accent/40 bg-os-accent/10 text-os-accent",
};

export function OsBadge({
  children,
  className,
  variant = "default",
}: OsBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-rdx-pill border px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
