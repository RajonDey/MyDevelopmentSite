// components/service-details/SellerInfo.tsx
import Image from "next/image";

interface SellerInfoProps {
  seller: {
    name: string;
    avatar: string;
    rating: number;
    reviews_count: number;
  };
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">About the Seller</h2>
      <div className="flex items-center gap-4">
        <Image
          src={seller.avatar || "/placeholder.svg"}
          alt={seller.name}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h3 className="font-semibold">{seller.name}</h3>
          <p className="text-secondary">
            Full-stack developer with 8+ years of experience. I specialize in
            creating modern, user-friendly websites and applications.
          </p>
        </div>
      </div>
    </div>
  );
}
