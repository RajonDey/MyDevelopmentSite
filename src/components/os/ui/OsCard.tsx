import { cn } from "@/lib/utils";

type OsCardProps = {
  children: React.ReactNode;
  className?: string;
  raised?: boolean;
};

export function OsCard({ children, className, raised }: OsCardProps) {
  return (
    <div className={cn(raised ? "os-card-raised" : "os-card", "p-5", className)}>
      {children}
    </div>
  );
}
