import { notFound } from "next/navigation";
import Image from "next/image";
import { services, reviews } from "@/data/mock-data";
import { Metadata } from "next";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import Script from "next/script";

interface ServiceParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServiceParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((svc) => svc.id === Number(resolvedParams.id));
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://development.rajondey.com/services/${service.id}`, // Your domain
      images: [
        { url: service.image, width: 800, height: 400, alt: service.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const service = services.find((svc) => svc.id === Number(resolvedParams.id));
  if (!service) return notFound();

  const schemaOrgService = {
    "@context": "http://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Person",
      name: "Rajon Dey",
      url: "https://development.rajondey.com",
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock", // Adjust based on your availability
    },
    category:
      service.technologies.length > 0
        ? "Software Development"
        : "Web Development",
    serviceType: service.title,
    image: service.image,
    url: `https://development.rajondey.com/services/${service.id}`,
  };

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        url={`/services/${service.id}`}
        image={service.image}
      />
      <Script
        id={`schema-service-${service.id}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(schemaOrgService)}
      </Script>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2">
            {/* Title and Description */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-gray-600 mb-6">{service.description}</p>

            {/* Image */}
            <div className="mb-8">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={400}
                className="object-cover rounded-lg w-full"
              />
            </div>

            {/* About This Gig */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Gig</h2>
              <p className="text-gray-700">{service.description}</p>
            </section>

            {/* Features */}
            {service.features.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">What You’ll Get</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Platforms */}
            {service.platforms.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Supported Platforms
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.platforms.map((platform, index) => (
                    <Badge key={index} >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Technologies */}
            {service.technologies.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <Badge key={index}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {service.faqs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Reviews ({reviews.length})
              </h2>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center mb-2">
                      <Image
                        src={review.avatar}
                        alt={`${review.name}'s avatar`}
                        width={40}
                        height={40}
                        className="rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {review.name}
                        </p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-700 ml-1">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Pricing Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Starting at</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${service.price}
                </p>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mb-4">
                Continue (${service.price})
              </Button>
              <a
                href={`https://wa.me/01737997143?text=Hi%20there,%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                  service.title
                )}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  Contact Me
                </Button>
              </a>

              {/* Seller Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Rajon Dey"
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Rajon Dey</p>
                    <p className="text-sm text-gray-600">Level 2 Seller</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-700">4.9 (150 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<ServiceParams[]> {
  return services.map((service) => ({
    id: service.id.toString(),
  }));
}
