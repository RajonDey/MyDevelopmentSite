import { rdxIntegrations } from "@/content/rdx/integrations";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { cn } from "@/lib/utils";

type LogoIntegrationRowProps = {
  label?: string;
  integrations?: readonly { id: string; label: string }[];
  className?: string;
};

export function LogoIntegrationRow({
  label = "Connects with tools you already use",
  integrations = rdxIntegrations,
  className,
}: LogoIntegrationRowProps) {
  return (
    <div className={cn("border-y border-rdx-border", className)}>
      <RdxContainer className="py-6 md:py-8">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-rdx-subtle">
          {label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {integrations.map((item) => (
            <li
              key={item.id}
              className="text-sm font-semibold tracking-tight text-rdx-muted transition-colors hover:text-rdx-ink"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </RdxContainer>
    </div>
  );
}
