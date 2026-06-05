import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface" | "band";
  spacing?: "default" | "tight";
};

export function RdxSection({
  children,
  className,
  id,
  variant = "default",
  spacing = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacing === "default"
          ? "py-[var(--rdx-space-section)]"
          : "py-[var(--rdx-space-section-tight)]",
        variant === "surface" && "bg-rdx-surface",
        variant === "band" && "border-y border-rdx-border bg-rdx-surface",
        className
      )}
    >
      {children}
    </section>
  );
}
