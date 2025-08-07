import { Button } from "@/components/common/ui/Button";
import { Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

export function EnhancedCTA() {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Web Presence?
            </h2>

            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              Stop losing potential customers with an underperforming website.
              Book a free consultation today and discover how we can create a
              website that truly works for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-green-600 hover:bg-gray-100 flex items-center gap-2 px-6 py-5 text-base">
                  <Calendar className="w-5 h-5" /> Book Free Consultation
                </Button>
              </a>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 flex items-center gap-2 px-6 py-5 text-base"
                >
                  <MessageSquare className="w-5 h-5" /> Send Message
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/75">
              No obligation. 100% free strategy session to explore if we&apos;re
              a good fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
