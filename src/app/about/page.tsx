import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { services, portfolio, reviews } from "@/data/mock-data";
import { ServiceCard } from "@/components/sections/service-card";
import { PortfolioItem } from "@/components/sections/portfolio-item";
import { ReviewCard } from "@/components/sections/review-card";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">John Developer</h1>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-primary" />
                <span className="font-medium">4.9</span>
                <span className="text-muted-foreground">(150)</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge>Pakistan</Badge>
                <Badge variant="outline">English</Badge>
                <Badge variant="outline">Urdu</Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">About me</h2>
            <p className="text-muted-foreground">
              Professional and detail-oriented Full Stack Developer specializing
              in React and Next.js. I create responsive, user-friendly websites
              that combine seamless functionality with visual appeal.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Next.js expert</Badge>
            <Badge>React developer</Badge>
            <Badge>Full stack development</Badge>
            <Badge>UI/UX design</Badge>
          </div>
        </div>

        <div className="w-full md:w-72">
          <Card className="p-4">
            <Button className="w-full mb-4">Contact me</Button>
            <Button variant="outline" className="w-full">
              Book a consultation
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Average response time: 1 hour
            </p>
          </Card>
        </div>
      </div>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">My Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.map((item, index) => (
            <PortfolioItem key={index} {...item} />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </section>
    </div>
  );
}
