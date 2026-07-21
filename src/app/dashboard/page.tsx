import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DashboardShell } from "@/components/rdx/admin/DashboardShell";
import { LeadDesk } from "@/components/rdx/admin/LeadDesk";
import { RdxContainer } from "@/components/rdx/layout/Container";
import { RdxSection } from "@/components/rdx/layout/Section";
import { authOptions, isAdminEmail } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Client desk",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/signin");
  }

  if (session.osAccess && !session.deskAccess) {
    redirect("/signin");
  }

  return (
    <RdxSection className="pt-4 md:pt-8">
      <RdxContainer className="max-w-6xl">
        <DashboardShell>
          <LeadDesk />
        </DashboardShell>
      </RdxContainer>
    </RdxSection>
  );
}
