import { notFound } from "next/navigation";
import { services } from "@/data/mock-data";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Clock, Users, Award } from "lucide-react";
import { Metadata } from "next";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = services.find((s) => s.id.toString() === params.id);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://development.rajondey.com/services/${params.id}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.id.toString() === params.id);

  if (!service) {
    notFound();
  }

  const pricingTiers = [
    {
      name: "Starter",
      price: service.price,
      description: "Perfect for small businesses",
      features: service.features.slice(0, 2),
      popular: false,
    },
    {
      name: "Professional",
      price: service.price + 200,
      description: "Most popular choice",
      features: service.features,
      popular: true,
    },
    {
      name: "Enterprise",
      price: service.price + 500,
      description: "For large-scale projects",
      features: [
        ...service.features,
        "Priority support",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        url={`/services/${params.id}`}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <service.icon className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {service.description}
          </p>

          {/* Social Proof */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground">(150+ reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">50+</span>
              <span className="text-muted-foreground">happy clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="font-semibold">24-48h</span>
              <span className="text-muted-foreground">delivery</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/order">
              <Button className="w-full sm:w-auto">Order Now</Button>
            </a>
            <a
              href="https://calendly.com/rajondey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                Book Free Consultation
              </Button>
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        {(service.technologies.length > 0 || service.platforms.length > 0) && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Technologies & Platforms
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {service.technologies.map((tech, index) => (
                <Badge key={index} className="text-lg px-4 py-2">
                  {tech}
                </Badge>
              ))}
              {service.platforms.map((platform, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-lg px-4 py-2"
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`p-6 ${
                  tier.popular ? "ring-2 ring-green-500 relative" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/project</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Choose {tier.name}</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/order">
              <Button className="w-full sm:w-auto">Order Services</Button>
            </a>
            <a
              href="https://calendly.com/rajondey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full sm:w-auto">
                Schedule Free Call
              </Button>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
