import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a project in mind or need development support? Let’s collaborate
          to bring your ideas to life. Fill out the form below or reach out
          directly!
        </p>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form
            action="https://formspree.io/f/your-form-id" // Replace with your Formspree ID or backend endpoint
            method="POST"
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tell me about your project..."
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Send Message
            </Button>
          </form>
        </Card>

        {/* Contact Info & CTA */}
        <div className="space-y-8">
          <Card className="p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/whatsapp.png" // Add your own icon in /public
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
                <a
                  href="https://wa.me/01737997143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-500"
                >
                  +880 1737-997143
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/email.png" // Add your own icon in /public
                  alt="Email"
                  width={24}
                  height={24}
                />
                <a
                  href="mailto:rajondey@example.com" // Replace with your email
                  className="text-gray-700 hover:text-green-500"
                >
                  rajondey@example.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md text-center bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-4">
              Book a free consultation to discuss your project needs.
            </p>
            <a
              href="https://calendly.com/rajondey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Schedule a Call
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
