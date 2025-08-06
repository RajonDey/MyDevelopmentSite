import { Button } from "@/components/ui/Button";
import { services, staticPages } from "@/data/mock-data";
import { SEO } from "@/components/seo";
import { Metadata } from "next";
import { ServiceCard } from "@/components/sections/service-card";

export const metadata: Metadata = {
  title: staticPages.services.metaTitle,
  description: staticPages.services.metaDescription,
  openGraph: {
    ...staticPages.services,
    url: "https://development.rajondey.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title={staticPages.services.metaTitle}
        description={staticPages.services.metaDescription}
        url="/services"
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">My Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the range of services I offer, from custom web development
            to e-commerce solutions, all tailored to meet your specific needs
            with modern technologies and best practices.
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

        <aside className="bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 text-center">
            Contact me today to discuss your requirements or book a
            consultation!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/order">
              <Button>Order Services</Button>
            </a>
            <a
              href="https://calendly.com/rajondey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Book a Consultation</Button>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
