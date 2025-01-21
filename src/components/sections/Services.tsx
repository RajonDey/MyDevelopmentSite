import { Card } from "@/components/ui/Card";

const services = [
  {
    id: 1,
    title: "Website Development",
    description: "Custom websites built with modern technologies.",
    price: "$100",
  },
  {
    id: 2,
    title: "WordPress Optimization",
    description: "Speed up and secure your WordPress site.",
    price: "$150",
  },
];

export default function Services() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <p className="text-[var(--color-primary)] font-semibold">
                  {service.price}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
