import { Metadata } from "next";
import { ReviewView } from "@/components/os/review/ReviewView";

export const metadata: Metadata = {
  title: "Quarterly review · RDX OS",
  robots: { index: false, follow: false },
};

export default function OsReviewPage() {
  return <ReviewView />;
}
