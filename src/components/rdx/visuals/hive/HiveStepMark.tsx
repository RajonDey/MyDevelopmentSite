import { cn } from "@/lib/utils";
import { HiveHex } from "./HiveHex";

type HiveStepMarkProps = {
  step: string;
  className?: string;
  /** Kept for call-site compatibility; unused (marks stay static). */
  index?: number;
};

/** Process step hex — static number cell. No ambient motion. */
export function HiveStepMark({ step, className }: HiveStepMarkProps) {
  return (
    <span
      className={cn(
        "group relative inline-flex h-10 w-9 shrink-0 items-center justify-center text-rdx-accent",
        className,
      )}
      aria-hidden
    >
      <HiveHex className="absolute inset-0" filled />
      <span className="relative font-rdx-display text-lg leading-none">
        {step}
      </span>
    </span>
  );
}
