import Link from "next/link";
import { siteMetadata } from "@/content/rdx/metadata";
import { cn } from "@/lib/utils";
import { RdxMark } from "@/components/rdx/brand/RdxMark";

const markSizes = {
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-10 w-auto",
} as const;

type RdxLogoProps = {
  href?: string | null;
  invert?: boolean;
  showWordmark?: boolean;
  wordmarkSuffix?: string;
  size?: keyof typeof markSizes;
  className?: string;
  priority?: boolean;
};

export function RdxLogo({
  href = "/",
  invert = false,
  showWordmark = true,
  wordmarkSuffix,
  size = "md",
  className,
}: RdxLogoProps) {
  const label = wordmarkSuffix
    ? `${siteMetadata.siteName} ${wordmarkSuffix}`
    : siteMetadata.siteName;

  const inner = (
    <>
      <RdxMark
        className={cn(markSizes[size], invert ? "text-white" : "text-current")}
      />
      {showWordmark ? (
        <span className="font-rdx-display tracking-tight">{label}</span>
      ) : null}
    </>
  );

  const classes = cn("inline-flex items-center gap-2", className);

  if (!href) {
    return (
      <span className={classes} aria-label={label}>
        {inner}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={classes}>
      {inner}
    </Link>
  );
}
