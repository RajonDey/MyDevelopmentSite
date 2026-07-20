import { cn } from "@/lib/utils";
import type { OsMember } from "@/types/os";

type MemberAvatarProps = {
  member: OsMember;
  size?: "sm" | "md";
  className?: string;
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function MemberAvatar({ member, size = "md", className }: MemberAvatarProps) {
  const dim = size === "sm" ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-os-accent/20 font-medium text-os-accent",
        dim,
        className
      )}
      title={member.name}
    >
      {initials(member.name)}
    </div>
  );
}
