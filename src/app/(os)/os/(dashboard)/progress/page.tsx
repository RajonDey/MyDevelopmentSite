import { Metadata } from "next";
import { ProgressView } from "@/components/os/progress/ProgressView";

export const metadata: Metadata = {
  title: "Progress · RDXHIVE OS",
  robots: { index: false, follow: false },
};

export default function OsProgressPage() {
  return <ProgressView />;
}
