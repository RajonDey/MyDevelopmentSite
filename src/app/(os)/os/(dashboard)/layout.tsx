import { Metadata } from "next";
import { getCommandCenter } from "@/lib/os/data";
import { OsShell } from "@/components/os/shell/OsShell";

export const metadata: Metadata = {
  title: "RDX OS",
  robots: { index: false, follow: false },
};

export default async function OsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getCommandCenter();

  return <OsShell initialData={data}>{children}</OsShell>;
}
