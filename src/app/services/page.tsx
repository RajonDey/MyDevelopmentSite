import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { services } from "@/data/mock-data";
import { ServiceCard } from "@/components/sections/service-card"; // Single component

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Services</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the range of services I offer, from custom web development to
          e-commerce solutions, all tailored to meet your specific needs with
          modern technologies and best practices.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isDetailed={true} // Enable detailed view
            />
          ))}
        </div>
      </section>

      <section className="text-center">
        <Card className="p-6 inline-block">
          <h2 className="text-xl font-semibold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact me today to discuss your requirements or book a
            consultation!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={`https://wa.me/01737997143?text=Hi%20there,%20I%20am%20interested%20in%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Contact Me</Button>
            </a>
            <a
              href="https://calendly.com/rajondey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Book a Consultation</Button>
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
