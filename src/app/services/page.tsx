// app/services/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/sections/service-card";
import { services } from "@/data/mock-data";

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}
