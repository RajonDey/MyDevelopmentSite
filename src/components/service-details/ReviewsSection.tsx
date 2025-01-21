// components/service-details/ReviewsSection.tsx
import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-start gap-4">
            <Image
              src={review.avatar || "/placeholder.svg"}
              alt={review.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-primary fill-current"
                            : "text-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-secondary">{review.date}</span>
              </div>
              <p className="mt-2 text-sm text-secondary">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
