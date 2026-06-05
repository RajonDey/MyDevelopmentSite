import { cn } from "@/lib/utils";

type HairlineRuleProps = {
  className?: string;
};

export function HairlineRule({ className }: HairlineRuleProps) {
  return (
    <hr
      className={cn("border-0 border-t border-rdx-border", className)}
      aria-hidden
    />
  );
}
