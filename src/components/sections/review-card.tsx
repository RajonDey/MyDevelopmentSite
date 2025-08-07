import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/common/ui/Card";
import Image from "next/image";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  company?: string;
  platform?: string;
}

export function ReviewCard({
  name,
  rating,
  comment,
  date,
  avatar,
  company,
  platform,
}: ReviewCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent>
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
                {company && <p className="text-xs text-gray-600">{company}</p>}
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "text-primary fill-current"
                          : "text-secondary"
                      }`}
                    />
                  ))}
                  {platform && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-2">
                      {platform}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-secondary">{date}</span>
            </div>
            <p className="mt-2 text-sm text-secondary">{comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
