import { Card } from "@/components/common/ui/Card";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    comment: "Rajon delivered an amazing website on time and within budget!",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Highly recommend Rajon for web development projects.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          What My Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <p className="text-gray-700 mb-4">
                &quot;{testimonial.comment}&quot;
              </p>
              <p className="text-[var(--color-primary)] font-semibold">
                - {testimonial.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
