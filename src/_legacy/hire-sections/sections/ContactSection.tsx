"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Mail, Phone } from "lucide-react";

export default function ContactSection() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll handler for animation
    const handleScroll = () => {
      const element = document.getElementById("contact");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Load Tally embeds when component mounts and Tally is available
    if (window.Tally) {
      window.Tally.loadEmbeds();
    } else {
      console.warn("Tally script not loaded");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-white to-blue-50"
      id="contact"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Ready to <span className="highlight">Transform</span> Your Online
          Presence?
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-center">
          Let&apos;s discuss how we can create a website that not only looks
          amazing but delivers real business results.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={cn(
              "bg-white rounded-xl shadow-md border border-gray-100 p-8 transition-all duration-700 ease-out opacity-0 transform translate-x-8",
              isVisible && "opacity-100 transform-none"
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            <iframe
              data-tally-src="https://tally.so/embed/mDYOvj?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="965"
              style={{ border: "none", margin: 0 }}
              title="Project Form"
            />
          </div>

          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-700 ease-out opacity-0 transform translate-x-[-2rem]",
              isVisible && "opacity-100 transform-none"
            )}
          >
            <h3 className="text-2xl font-semibold mb-6">
              Or Let&apos;s Schedule a Call
            </h3>

            <div className="space-y-8">
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">
                    Book a Discovery Call
                  </h4>
                  <p className="text-gray-600">
                    Schedule a free 30-minute strategy session to discuss your
                    project needs and goals.
                  </p>
                </div>
              </a>

              <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Email Me</h4>
                  <p className="text-gray-600 mb-2">
                    Send me an email and I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <a
                    href="mailto:contact@rajondey.com"
                    className="text-primary font-medium hover:underline"
                  >
                    contact@rajondey.com
                  </a>
                </div>
              </div>

              <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Call Me</h4>
                  <p className="text-gray-600 mb-2">
                    For urgent inquiries, feel free to call me directly.
                  </p>
                  <a
                    href="tel:+8801737997143"
                    className="text-primary font-medium hover:underline"
                  >
                    +88 017 37997143
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-lg font-semibold mb-2">My Process:</p>
              <ol className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-bold rounded-full w-6 h-6 inline-flex items-center justify-center mr-3">
                    1
                  </span>
                  <span>Discovery Call to understand your needs</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-bold rounded-full w-6 h-6 inline-flex items-center justify-center mr-3">
                    2
                  </span>
                  <span>Custom proposal and timeline</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-bold rounded-full w-6 h-6 inline-flex items-center justify-center mr-3">
                    3
                  </span>
                  <span>Design and development</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-bold rounded-full w-6 h-6 inline-flex items-center justify-center mr-3">
                    4
                  </span>
                  <span>Review, revisions, and launch</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-primary/20 text-primary font-bold rounded-full w-6 h-6 inline-flex items-center justify-center mr-3">
                    5
                  </span>
                  <span>Ongoing support and optimization</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
