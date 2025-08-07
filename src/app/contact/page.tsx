import { Button } from "@/components/common/ui/Button";
import { Card } from "@/components/common/ui/Card";
import Image from "next/image";
import { staticPages } from "@/data/mock-data";
import { Metadata } from "next";
import { SEO } from "@/components/seo";
import {
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Star,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: staticPages.contact.metaTitle,
  description: staticPages.contact.metaDescription,
  openGraph: {
    ...staticPages.contact,
    url: "https://development.rajondey.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SEO
        title={staticPages.contact.metaTitle}
        description={staticPages.contact.metaDescription}
        url="/contact"
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your ideas into reality? I'm here to help you
            create stunning, high-performing websites that drive results.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">4.9/5 Rating</h3>
              <p className="text-sm text-muted-foreground">150+ Reviews</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">24-48 Hours</h3>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">50+ Projects</h3>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">Free Consultation</h3>
              <p className="text-sm text-muted-foreground">30 Minutes</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Send Me a Message</h2>
              <form
                action="https://formspree.io/f/mpwpzgzq"
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">
                      Custom Web Development
                    </option>
                    <option value="ecommerce">E-Commerce Website</option>
                    <option value="wordpress">WordPress Development</option>
                    <option value="headless-cms">Headless CMS</option>
                    <option value="email-templates">Email Templates</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2500">$1,000 - $2,500</option>
                    <option value="2500-5000">$2,500 - $5,000</option>
                    <option value="over-5000">Over $5,000</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                </div>

                <input
                  type="hidden"
                  name="_subject"
                  value="New Project Inquiry - Rajon Dey"
                />
                <input
                  type="hidden"
                  name="_next"
                  value="https://development.rajondey.com/thank-you"
                />

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg transition-colors text-lg font-semibold"
                >
                  Send Message
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Your information is safe with me. I'll respond within 24 hours.
              </p>
            </Card>
          </div>

          {/* Contact Info & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Contact Options */}
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                Quick Contact Options
              </h2>
              <div className="space-y-4">
                <a
                  href="/order"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Image
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                  />
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      +880 1737-997143
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:contact@rajondey.com"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      contact@rajondey.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://calendly.com/rajondey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Schedule a Call</h3>
                    <p className="text-sm text-muted-foreground">
                      Free 30-minute consultation
                    </p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Urgency Banner */}
            <Card className="p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <h3 className="text-xl font-semibold mb-2">
                🎉 Limited Time Offer
              </h3>
              <p className="mb-4">
                Get a free website audit + strategy session when you book this
                week!
              </p>
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-white text-green-600 hover:bg-gray-100">
                  Book Free Session
                </Button>
              </a>
            </Card>

            {/* Response Time Promise */}
            <Card className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">My Promise to You</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Free project consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Detailed project proposal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Transparent pricing</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
