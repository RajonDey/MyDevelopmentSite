import { Metadata } from "next";
import { TeamView } from "@/components/os/team/TeamView";

export const metadata: Metadata = {
  title: "Team · RDX OS",
  robots: { index: false, follow: false },
};

export default function OsTeamPage() {
  return <TeamView />;
}
