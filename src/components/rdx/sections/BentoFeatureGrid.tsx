import { RdxCard } from "@/components/rdx/ui/Card";
import { cn } from "@/lib/utils";

export type BentoFeatureItem = {
  title: string;
  description: string;
  className?: string;
};

type BentoFeatureGridProps = {
  items: readonly BentoFeatureItem[];
  className?: string;
};

export function BentoFeatureGrid({ items, className }: BentoFeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <RdxCard
          key={item.title}
          className={cn(
            "flex flex-col justify-between bg-rdx-surface",
            item.className
          )}
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-rdx-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed text-rdx-muted">
              {item.description}
            </p>
          </div>
        </RdxCard>
      ))}
    </div>
  );
}
