import { cn } from "@/lib/utils";

type HiveHexProps = {
  className?: string;
  filled?: boolean;
};

/** Pointy-top hex. Color via `currentColor`. Decorative — pair with aria on parent. */
export function HiveHex({ className, filled = false }: HiveHexProps) {
  return (
    <svg
      viewBox="0 0 32 36"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <polygon
        points="16,1.5 30.5,9.5 30.5,26.5 16,34.5 1.5,26.5 1.5,9.5"
        fill={filled ? "currentColor" : "none"}
        fillOpacity={filled ? 0.06 : undefined}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        className="transition-[stroke-width,fill-opacity] duration-200 group-hover:[stroke-width:1.85] group-hover:[fill-opacity:0.1]"
      />
    </svg>
  );
}
