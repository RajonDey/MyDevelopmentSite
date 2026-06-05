import { redirect, notFound } from "next/navigation";

const RDX_SERVICE_SLUGS = new Set([
  "agency-website",
  "lead-automation",
  "ai-chat-search",
]);

type LegacyServicePageProps = {
  params: Promise<{ id: string }>;
};

/** Legacy numeric Fiverr IDs only — named slugs are separate static routes */
export default async function LegacyServicePage({ params }: LegacyServicePageProps) {
  const { id } = await params;

  if (RDX_SERVICE_SLUGS.has(id)) {
    notFound();
  }

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    redirect("/services");
  }

  if (numericId === 2 || numericId === 3) {
    redirect("/services/lead-automation");
  }
  if (numericId === 4 || numericId === 5) {
    redirect("/services/ai-chat-search");
  }
  redirect("/services/agency-website");
}
