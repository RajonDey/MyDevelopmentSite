import { Metadata } from "next";
import { CommandCenterView } from "@/components/os/home/CommandCenterView";

export const metadata: Metadata = {
  title: "Command Center · RDX OS",
  robots: { index: false, follow: false },
};

export default function OsHomePage() {
  return <CommandCenterView />;
}
