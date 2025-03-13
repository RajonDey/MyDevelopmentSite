import { faqs, staticPages } from "@/data/mock-data";
import { SEO } from "@/components/seo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: staticPages.faq.metaTitle,
  description: staticPages.faq.metaDescription,
  openGraph: {
    ...staticPages.faq,
    url: "https://development.rajondey.com/faq",
  },
};

export default function FAQPage() {
  return (
    <>
      <SEO
        title={staticPages.faq.metaTitle}
        description={staticPages.faq.metaDescription}
        url="/faq"
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Got questions about my development services? Find answers below or
            reach out for personalized clarification!
          </p>
        </section>

        <Card className="p-6 shadow-md">
          <FAQAccordion faqs={faqs} />
        </Card>

        <section className="text-center mt-12">
          <Card className="p-6 inline-block bg-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-4">
              I’m here to help! Contact me directly or schedule a call to
              discuss your project.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://wa.me/01737997143?text=Hi%20Rajon,%20I%20have%20a%20question%20about%20your%20services!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Contact Me
                </Button>
              </a>
              <a
                href="https://calendly.com/rajondey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Book a Call</Button>
              </a>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}
