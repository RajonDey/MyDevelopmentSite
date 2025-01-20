import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export function ReviewCard({
  name,
  rating,
  comment,
  date,
  avatar,
}: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-primary"
                          : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
