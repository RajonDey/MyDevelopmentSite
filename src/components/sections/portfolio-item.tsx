import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";

interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
}

export function PortfolioItem({
  title,
  description,
  image,
}: PortfolioItemProps) {
  return (
    <Card>
      <div className="relative h-64">
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
      </CardContent>
    </Card>
  );
}
