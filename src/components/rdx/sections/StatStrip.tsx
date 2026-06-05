import { RdxContainer } from "@/components/rdx/layout/Container";
import { cn } from "@/lib/utils";

export type StatItem = {
  value: string;
  label: string;
};

type StatStripProps = {
  stats: readonly StatItem[];
  className?: string;
};

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div className={cn("border-y border-rdx-border bg-rdx-surface", className)}>
      <RdxContainer className="py-8 md:py-10">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="space-y-1 md:border-l md:border-rdx-border md:pl-8 first:md:border-l-0 first:md:pl-0"
            >
              <dt className="font-rdx-display text-[length:var(--rdx-text-2xl)] font-normal tracking-tight text-rdx-ink">
                {stat.value}
              </dt>
              <dd className="text-sm text-rdx-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </RdxContainer>
    </div>
  );
}
