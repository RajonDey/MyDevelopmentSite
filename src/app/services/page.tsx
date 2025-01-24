// app/services/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/sections/service-card";
import { getServices, getMediaById } from "@/lib/api";

export default async function ServicesPage() {
  let servicesWithImages = [];
  try {
    const services = await getServices();
    servicesWithImages = await Promise.all(
      services.map(async (service) => {
        const image = await getMediaById(service.featured_media);
        return {
          id: service.id,
          title: service.title.rendered,
          description: service.excerpt.rendered.replace(/<[^>]+>/g, ""),
          price: service.acf.price || 0,
          image,
        };
      })
    );
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return <div>Error loading services. Please try again later.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesWithImages.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            image={service.image}
          />
        ))}
      </div>
      <Link href="/services/order">
        <Button className="mt-8">Place an Order</Button>
      </Link>
    </div>
  );
}
