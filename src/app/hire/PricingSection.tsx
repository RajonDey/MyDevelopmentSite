"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/FullCard";
import { Check, Package, Shield, Clock } from "lucide-react";

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pricing");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const servicePackages = [
    {
      name: "Foundation",
      price: "$1,499",
      timeframe: "2-3 weeks",
      description:
        "Perfect for small businesses and personal brands getting started online",
      icon: <Package className="h-10 w-10" />,
      highlights: [
        "5-page custom-designed website",
        "Mobile-responsive design",
        "SEO fundamentals",
        "Contact form & social links",
        "1 round of revisions",
      ],
      features: [
        "Professionally written content",
        "Basic SEO setup",
        "Mobile-friendly design",
        "Contact form integration",
        "Social media integration",
        "Google Analytics setup",
      ],
      cta: "Start Your Project",
      popular: false,
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      name: "Growth",
      price: "$2,999",
      timeframe: "3-4 weeks",
      description:
        "Ideal for established businesses looking to expand their online presence",
      icon: <Shield className="h-10 w-10" />,
      highlights: [
        "10-page professional website",
        "Advanced SEO strategy",
        "Lead generation tools",
        "Blog/content platform",
        "2 rounds of revisions",
      ],
      features: [
        "Everything in Foundation +",
        "Content strategy",
        "Advanced SEO implementation",
        "Lead generation forms",
        "Blog/news section setup",
        "Email newsletter integration",
        "2-hour training session",
        "30 days post-launch support",
      ],
      cta: "Grow Your Business",
      popular: true,
      color: "from-purple-500/30 to-pink-500/30",
    },
    {
      name: "Enterprise",
      price: "Custom",
      timeframe: "Custom timeline",
      description:
        "Tailored solutions for businesses with specific requirements and advanced functionality",
      icon: <Clock className="h-10 w-10" />,
      highlights: [
        "Custom pages & functionality",
        "Full SEO & marketing integration",
        "E-commerce capabilities",
        "User account system",
        "Unlimited revisions",
      ],
      features: [
        "Everything in Growth +",
        "Custom functionality development",
        "E-commerce integration",
        "User membership areas",
        "Custom API integrations",
        "Payment processing",
        "Advanced analytics",
        "3-hour training session",
        "60 days post-launch support",
      ],
      cta: "Let's Discuss",
      popular: false,
      color: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  return (
    <section
      className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background to-background/80"
      id="pricing"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Investment in <span className="highlight">Your Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for websites that deliver real business results
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {servicePackages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "relative w-full md:w-[calc(33.333%-1.5rem)] border transition-all duration-500 overflow-hidden",
                isVisible && "animate-fade-in",
                pkg.popular
                  ? "border-primary shadow-lg md:scale-105"
                  : "border-border",
                hoveredCard === index && "shadow-xl transform -translate-y-1"
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background gradient effect */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-25",
                  pkg.color
                )}
              />

              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium transform translate-x-[30%] translate-y-[40%] rotate-45">
                  Popular
                </div>
              )}

              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div
                    className={cn(
                      "p-3 rounded-full bg-primary/10 text-primary",
                      hoveredCard === index && "bg-primary/20"
                    )}
                  >
                    {pkg.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">
                  {pkg.name}
                </CardTitle>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <div className="text-3xl font-bold">{pkg.price}</div>
                  <div className="text-sm text-muted-foreground">
                    {pkg.timeframe}
                  </div>
                </div>
                <CardDescription className="text-center mt-3">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    {pkg.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="font-medium mb-3">Full package includes:</p>
                    <ul className="space-y-2 text-sm">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  className={cn(
                    "w-full py-6 transition-all",
                    pkg.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-transparent hover:bg-primary/10 text-foreground border border-primary/30 hover:border-primary"
                  )}
                  variant={pkg.popular ? "primary" : "outline"}
                >
                  {pkg.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div
          className={cn(
            "mt-16 max-w-3xl mx-auto bg-gradient-to-br from-background to-muted/30 p-8 rounded-xl shadow-lg border border-border transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">
                Need a custom solution?
              </h3>
              <p className="text-muted-foreground">
                Every business has unique requirements. Schedule a free
                consultation to discuss your specific needs and get a
                personalized quote for your project.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
              >
                Book a Free Call
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-medium mb-3">Satisfaction Guaranteed</h3>
          <p className="text-muted-foreground">
            All projects include a 14-day post-launch period for adjustments and
            refinements to ensure you&#39;re completely satisfied with your new
            website.
          </p>
        </div>
      </div>
    </section>
  );
}
