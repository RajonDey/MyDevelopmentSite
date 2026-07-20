import { Metadata } from "next";
import { GoalsView } from "@/components/os/goals/GoalsView";

export const metadata: Metadata = {
  title: "Goals · RDX OS",
  robots: { index: false, follow: false },
};

export default function OsGoalsPage() {
  return <GoalsView />;
}
