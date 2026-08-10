import Image from "next/image";
import Link from "next/link";
import { siteMetadata } from "@/content/rdx/metadata";
import { rdxBrandAssets } from "@/content/rdx/brand";
import { cn } from "@/lib/utils";

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
  priority = false,
}: RdxLogoProps) {
  const label = wordmarkSuffix
    ? `${siteMetadata.siteName} ${wordmarkSuffix}`
    : siteMetadata.siteName;

  const inner = (
    <>
      <Image
        src={invert ? rdxBrandAssets.markOnDark : rdxBrandAssets.mark}
        alt=""
        width={140}
        height={156}
        className={cn(markSizes[size], "shrink-0 object-contain")}
        priority={priority}
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
