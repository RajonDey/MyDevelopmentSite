import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use h1 when this header is the page title */
  titleAs?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  titleAs = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
          {eyebrow}
        </p>
      )}
      {titleAs === "h1" ? (
        <h1 className="font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink md:text-[length:var(--rdx-text-4xl)]">
          {title}
        </h1>
      ) : (
        <h2 className="font-rdx-display text-[length:var(--rdx-text-3xl)] font-normal leading-[var(--rdx-leading-display)] tracking-tight text-rdx-ink">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-[var(--rdx-measure)] text-base leading-[var(--rdx-leading-body)] text-rdx-muted">
          {description}
        </p>
      )}
    </div>
  );
}
