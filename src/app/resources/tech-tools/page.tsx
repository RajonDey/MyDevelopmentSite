import { Metadata } from "next";
import { SEO } from "@/components/seo";
import ToolsContent from "./ToolsContent";

export const metadata: Metadata = {
  title: "Tools & Gear | Rajon Dey",
  description:
    "Explore essential development tools and gear for coding, productivity, and more.",
};

export default function ToolsPage() {
  return (
    <>
      <SEO
        title="Tools & Gear | Rajon Dey"
        description="Explore essential development tools and gear for coding, productivity, and more."
        url="/tools"
      />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <ToolsContent />
      </div>
    </>
  );
}
