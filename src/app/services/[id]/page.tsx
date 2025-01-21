// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import { services, reviews } from "@/data/mock-data";
import { ServiceOverview } from "@/components/service-details/ServiceOverview";
import { AboutService } from "@/components/service-details/AboutService";
import { SellerInfo } from "@/components/service-details/SellerInfo";
import { ReviewsSection } from "@/components/service-details/ReviewsSection";
import { FAQSection } from "@/components/service-details/FAQSection";

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  // Find the service by ID in the mock data
  const service = services.find((s) => s.id === parseInt(params.id));

  if (!service) {
    return notFound();
  }

  // Mock seller data
  const seller = {
    name: "Rajon Dey",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviews_count: 150,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ServiceOverview service={{ ...service, seller }} />
      <AboutService description={service.description} />
      <SellerInfo seller={seller} />
      <ReviewsSection reviews={reviews} />
      <FAQSection faqs={service.faqs} />
    </div>
  );
}
