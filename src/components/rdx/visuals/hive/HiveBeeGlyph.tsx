import { cn } from "@/lib/utils";

type HiveBeeGlyphProps = {
  className?: string;
};

/** Geometric bee — supporting character only, never the logo. */
export function HiveBeeGlyph({ className }: HiveBeeGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <ellipse
        cx="12"
        cy="14"
        rx="4.2"
        ry="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <line
        x1="9.2"
        y1="14"
        x2="14.8"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle
        cx="12"
        cy="8.2"
        r="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="7.2"
        cy="10.5"
        rx="3.4"
        ry="2"
        transform="rotate(-28 7.2 10.5)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <ellipse
        cx="16.8"
        cy="10.5"
        rx="3.4"
        ry="2"
        transform="rotate(28 16.8 10.5)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}
