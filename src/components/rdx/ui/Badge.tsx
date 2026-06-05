import { cn } from "@/lib/utils";

type RdxBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function RdxBadge({ children, className }: RdxBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-rdx-pill border border-rdx-border bg-rdx-surface px-2.5 py-0.5 text-xs font-medium text-rdx-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
