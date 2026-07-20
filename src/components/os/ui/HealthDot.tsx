import type { Health } from "@/types/os";
import { cn } from "@/lib/utils";

type HealthDotProps = {
  health: Health;
  className?: string;
  label?: string;
};

const colors: Record<Health, string> = {
  green: "bg-os-green",
  yellow: "bg-os-yellow",
  red: "bg-os-red",
};

export function HealthDot({ health, className, label }: HealthDotProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      title={label ?? health}
    >
      <span
        className={cn("h-2 w-2 shrink-0 rounded-full", colors[health])}
        aria-hidden
      />
      {label ? (
        <span className="text-xs capitalize text-os-muted">{label}</span>
      ) : null}
    </span>
  );
}
