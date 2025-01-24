// components/service-details/ServiceOverview.tsx
import Image from "next/image";

interface ServiceOverviewProps {
  service: {
    id: number;
    title: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
    image: string;
    seller: {
      name: string;
      avatar: string;
      rating: number;
      reviews_count: number;
    };
  };
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  // Remove HTML tags from the excerpt
  const description = service.excerpt.rendered.replace(/<[^>]+>/g, "");

  return (
    <div className="mb-8">
      <div className="relative h-96 mb-6">
        <div className="absolute inset-0">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title.rendered}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-4">{service.title.rendered}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={service.seller.avatar}
            alt={service.seller.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">{service.seller.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="font-medium">{service.seller.rating}</span>
          <span className="text-gray-500">
            ({service.seller.reviews_count})
          </span>
        </div>
      </div>
    </div>
  );
}
