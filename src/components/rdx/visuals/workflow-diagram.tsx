import { cn } from "@/lib/utils";

type WorkflowColumnProps = {
  title: string;
  steps: readonly string[];
  variant: "before" | "after";
};

function WorkflowColumn({ title, steps, variant }: WorkflowColumnProps) {
  return (
    <div
      className={cn(
        "rounded-rdx border p-5",
        variant === "before"
          ? "border-rdx-border bg-rdx-paper"
          : "border-rdx-accent/30 bg-rdx-surface"
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.12em]",
          variant === "after" ? "text-rdx-accent" : "text-rdx-subtle"
        )}
      >
        {title}
      </p>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm text-rdx-muted">
            <span className="font-rdx-display text-base text-rdx-ink">{index + 1}.</span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

type WorkflowDiagramProps = {
  before: { title: string; steps: readonly string[] };
  after: { title: string; steps: readonly string[] };
  className?: string;
};

export function WorkflowDiagram({ before, after, className }: WorkflowDiagramProps) {
  return (
    <div
      className={cn("grid gap-4 md:grid-cols-2 md:gap-6", className)}
      role="img"
      aria-label="Before and after lead workflow comparison"
    >
      <WorkflowColumn title={before.title} steps={before.steps} variant="before" />
      <WorkflowColumn title={after.title} steps={after.steps} variant="after" />
    </div>
  );
}
