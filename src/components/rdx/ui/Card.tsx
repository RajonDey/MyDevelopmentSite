import { cn } from "@/lib/utils";

type RdxCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function RdxCard({ children, className }: RdxCardProps) {
  return (
    <div
      className={cn(
        "rounded-rdx border border-rdx-border bg-rdx-paper p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
