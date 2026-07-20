import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  size?: "sm" | "md";
};

export function ProgressBar({ value, className, size = "md" }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-os-border/60",
        size === "sm" ? "h-1.5" : "h-2",
        className
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-os-accent transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
