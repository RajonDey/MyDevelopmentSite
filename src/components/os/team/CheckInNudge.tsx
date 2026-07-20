"use client";

import Link from "next/link";
import { OsCard } from "@/components/os/ui/OsCard";
import { MemberAvatar } from "@/components/os/ui/MemberAvatar";
import { useOsData } from "@/components/os/context/OsDataContext";
import { getMembersMissingCheckIn } from "@/lib/os/capacity";

export function CheckInNudge() {
  const { data, currentMember } = useOsData();
  const missing = getMembersMissingCheckIn(data.members, data.checkIns);
  const currentMissing = missing.some((m) => m.id === currentMember.id);

  if (missing.length === 0) return null;

  return (
    <OsCard className="border-os-yellow/30 bg-os-yellow/5">
      <p className="text-sm font-medium text-os-text">
        {missing.length} teammate{missing.length !== 1 ? "s" : ""} haven&apos;t
        checked in this week
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {missing.map((m) => (
          <div key={m.id} className="flex items-center gap-1.5">
            <MemberAvatar member={m} size="sm" />
            <span className="text-xs text-os-muted">{m.name}</span>
          </div>
        ))}
      </div>
      {currentMissing ? (
        <Link
          href="/os/team"
          className="mt-3 inline-block text-sm text-os-accent hover:underline"
        >
          Submit your check-in →
        </Link>
      ) : null}
    </OsCard>
  );
}
