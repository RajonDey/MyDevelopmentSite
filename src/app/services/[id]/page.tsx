// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import { getServiceById, getMediaById } from "@/lib/api";
import { ServiceOverview } from "@/components/service-details/ServiceOverview";
import { AboutService } from "@/components/service-details/AboutService";
import { SellerInfo } from "@/components/service-details/SellerInfo";
import { ReviewsSection } from "@/components/service-details/ReviewsSection";
import { FAQSection } from "@/components/service-details/FAQSection";
import { reviews } from "@/data/mock-data";

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  let service;
  try {
    // Fetch the service by ID
    service = await getServiceById(Number(params.id));

    // Fetch the featured image for the service
    const image = await getMediaById(service.featured_media);

    // Add the image URL to the service object
    service.image = image;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return notFound();
  }

  // Mock seller data (replace with dynamic data if available)
  const seller = {
    name: "Rajon Dey",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviews_count: 150,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ServiceOverview service={{ ...service, seller }} />
      <AboutService description={service.excerpt.rendered} />
      <SellerInfo seller={seller} />
      <ReviewsSection reviews={reviews} />
      <FAQSection faqs={[]} />
    </div>
  );
}
