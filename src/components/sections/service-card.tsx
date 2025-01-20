import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export function ServiceCard({
  title,
  description,
  price,
  image,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
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
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-semibold">From ${price}</span>
        <Button variant="outline" size="sm">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
