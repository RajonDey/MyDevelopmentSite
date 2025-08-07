import { services, staticPages } from "@/data/mock-data";
import { SEO } from "@/components/seo";
import { Metadata } from "next";
import EnhancedServiceContent from "@/components/EnhancedServiceContent";

export const metadata: Metadata = {
  title: staticPages.services.metaTitle,
  description: staticPages.services.metaDescription,
  openGraph: {
    ...staticPages.services,
    url: "https://development.rajondey.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title={staticPages.services.metaTitle}
        description={staticPages.services.metaDescription}
        url="/services"
      />
      <EnhancedServiceContent services={services} />
    </>
  );
}
