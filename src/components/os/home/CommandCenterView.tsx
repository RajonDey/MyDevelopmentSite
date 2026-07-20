"use client";

import { NorthStarBanner } from "@/components/os/home/NorthStarBanner";
import { TeamCapacityBar } from "@/components/os/home/TeamCapacityBar";
import { FocusStrip } from "@/components/os/home/FocusStrip";
import { CategorySummary } from "@/components/os/home/CategorySummary";
import { BacklogPreview } from "@/components/os/home/BacklogPreview";
import { WinsStrip } from "@/components/os/home/ProjectLists";

export function CommandCenterView() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <NorthStarBanner />
      <TeamCapacityBar />
      <FocusStrip />
      <CategorySummary />
      <BacklogPreview />
      <WinsStrip />
    </div>
  );
}
