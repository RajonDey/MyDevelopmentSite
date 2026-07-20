"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Layers,
  TrendingUp,
  Users,
  ClipboardList,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import type { OsMember } from "@/types/os";

const navItems = [
  { href: "/os", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/os/goals", label: "Goals", icon: Target, exact: false },
  { href: "/os/projects", label: "Projects", icon: Layers, exact: false },
  { href: "/os/progress", label: "Progress", icon: TrendingUp, exact: false },
  { href: "/os/team", label: "Team", icon: Users, exact: false },
  { href: "/os/review", label: "Review", icon: ClipboardList, exact: false },
];

type OsSidebarProps = {
  currentMember: OsMember;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function OsSidebar({
  currentMember,
  mobileOpen,
  onMobileClose,
}: OsSidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex h-14 items-center justify-between border-b border-os-border px-4">
        <Link href="/os" className="font-rdx-display text-lg text-os-text">
          RDX OS
        </Link>
        <button
          type="button"
          className="rounded-md p-1 text-os-muted hover:text-os-text md:hidden"
          onClick={onMobileClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-os-accent/15 text-os-text"
                  : "text-os-muted hover:bg-os-surface-raised hover:text-os-text"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-os-border p-4">
        <div className="flex items-center gap-3">
          <MemberAvatar member={currentMember} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-os-text">
              {currentMember.name}
            </p>
            <p className="truncate text-xs capitalize text-os-muted">
              {currentMember.role}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-label="Close menu overlay"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[var(--os-sidebar-width)] flex-col border-r border-os-border bg-os-surface transition-transform md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {content}
      </aside>
    </>
  );
}
