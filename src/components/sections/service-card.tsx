// components/sections/service-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ServiceCardProps {
  id: number; // Add an ID for routing
  title: string;
  description: string;
  price: number;
  image: string;
}

export function ServiceCard({
  id,
  title,
  description,
  price,
  image,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-sm text-secondary">{description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-semibold">From ${price}</span>
            <Button variant="secondary">View details</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
