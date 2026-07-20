import { OsCard } from "@/components/os/ui/OsCard";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import type { CommandCenterData } from "@/types/os";
import { getMemberLoads } from "@/lib/os/selectors";
import { cn } from "@/lib/utils";

type TeamLoadProps = {
  data: CommandCenterData;
};

export function TeamLoad({ data }: TeamLoadProps) {
  const loads = getMemberLoads(data);

  return (
    <OsCard>
      <h3 className="text-sm font-medium text-os-text">Team load</h3>
      <p className="mt-0.5 text-xs text-os-muted">
        Active + blocked projects per person
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        {loads.map(({ member, activeCount }) => {
          const overloaded = activeCount >= 4;
          const watch = activeCount === 3;

          return (
            <div
              key={member.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2",
                overloaded
                  ? "border-os-red/40 bg-os-red/5"
                  : watch
                    ? "border-os-yellow/40 bg-os-yellow/5"
                    : "border-os-border bg-os-surface-raised"
              )}
            >
              <MemberAvatar member={member} size="sm" />
              <div>
                <p className="text-sm font-medium text-os-text">{member.name}</p>
                <p
                  className={cn(
                    "text-xs",
                    overloaded
                      ? "text-os-red"
                      : watch
                        ? "text-os-yellow"
                        : "text-os-muted"
                  )}
                >
                  {activeCount} active
                  {overloaded ? " · overloaded" : watch ? " · watch" : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </OsCard>
  );
}
