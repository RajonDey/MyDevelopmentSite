import { cn } from "@/lib/utils";

export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-rdx border border-rdx-border bg-rdx-paper",
        className
      )}
    >
      <div className="h-44 animate-pulse bg-rdx-border/40" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/4 animate-pulse rounded bg-rdx-border/40" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-rdx-border/40" />
        <div className="h-3 w-full animate-pulse rounded bg-rdx-border/40" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-rdx-border/40" />
      </div>
    </div>
  );
}
