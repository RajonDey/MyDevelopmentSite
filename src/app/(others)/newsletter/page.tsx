
import { Metadata } from "next";
import BeehiivSubscribe from "@/components/BeehiivSubscribe";

export const metadata: Metadata = {
  title: "Developer Data Newsletter | Rajon Dey",
  description:
    "Subscribe to Rajon Dey’s Developer Data newsletter for the latest insights on software development trends and data.",
  openGraph: {
    title: "Developer Data Newsletter | Rajon Dey",
    description:
      "Subscribe to Rajon Dey’s Developer Data newsletter for the latest insights on software development trends and data.",
    url: "https://development.rajondey.com/newsletter",
  },
};

export default function NewsletterPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Developer Data Newsletter
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay ahead with the latest developer trends, data insights, and tips
          from Rajon Dey.
        </p>
      </section>
      <BeehiivSubscribe />
    </div>
  );
}
