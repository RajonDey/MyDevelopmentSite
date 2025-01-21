// components/service-details/ServiceOverview.tsx
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";

interface ServiceOverviewProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    seller: {
      name: string;
      avatar: string;
      rating: number;
      reviews_count: number;
    };
  };
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Service Image */}
      <div className="relative h-96">
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Service Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg text-secondary mb-6">{service.description}</p>

        {/* Seller Details */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={service.seller.avatar || "/placeholder.svg"}
            alt={service.seller.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{service.seller.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary" />
              <span className="font-medium">{service.seller.rating}</span>
              <span className="text-muted-foreground">
                ({service.seller.reviews_count})
              </span>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold">Packages</h2>
          <div className="space-y-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Basic</h3>
              <p className="text-sm text-secondary mb-2">
                Perfect for small projects.
              </p>
              <p className="text-lg font-semibold">${service.price}</p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <Button className="w-full">Contact Me</Button>
      </div>
    </div>
  );
}