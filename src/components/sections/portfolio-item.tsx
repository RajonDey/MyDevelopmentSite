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
    <Card className="overflow-hidden">
      <div className="relative h-64">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
