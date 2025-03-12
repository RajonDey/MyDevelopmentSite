import { Metadata } from "next";
import { SEO } from "@/components/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Rajon Dey",
  description:
    "Learn how Rajon Dey collects, uses, and protects your personal information on development.rajondey.com.",
  openGraph: {
    title: "Privacy Policy | Rajon Dey",
    description:
      "Learn how Rajon Dey collects, uses, and protects your personal information on development.rajondey.com.",
    url: "https://development.rajondey.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Rajon Dey"
        description="Learn how Rajon Dey collects, uses, and protects your personal information on development.rajondey.com."
        url="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            <strong>Last Updated:</strong> March 11, 2025
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8 text-gray-700">
          <section>
            <p className="text-lg leading-relaxed">
              Welcome to{" "}
              <code className="font-mono text-gray-900">
                development.rajondey.com
              </code>
              ! I’m Rajon Dey, a freelance software developer, and this Privacy
              Policy explains how I collect, use, and protect your information
              when you visit my site or use my services. I value your privacy
              and aim to keep things simple and transparent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              1. What Information I Collect
            </h2>
            <p className="leading-relaxed">
              I may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Personal Information:</span> Your
                name, email address, or phone number if you contact me via the
                contact form, WhatsApp, or book a consultation through Calendly.
                Your email address if you subscribe to my newsletter via
                Beehiiv.
              </li>
              <li>
                <span className="font-medium">Non-Personal Information:</span>{" "}
                Usage data like your IP address, browser type, and pages
                visited, collected through analytics tools (e.g., Google
                Analytics, if implemented). Information from blog comments
                (e.g., name, email) if you leave a comment on my WordPress blog.
              </li>
            </ul>
            <p className="italic text-gray-600">
              I don’t collect more than I need, and I don’t sell your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              2. How I Use Your Information
            </h2>
            <p className="leading-relaxed">I use your information to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Respond to your inquiries or schedule consultations.</li>
              <li>
                Send you newsletters or updates if you’ve subscribed (you can
                unsubscribe anytime).
              </li>
              <li>
                Improve my website by understanding how visitors use it (via
                analytics).
              </li>
              <li>Display your comments on blog posts if you submit them.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Third-Party Services
            </h2>
            <p className="leading-relaxed">
              I use some trusted third-party tools to run my site. They may
              process your data under their own privacy policies:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">WordPress:</span> Hosts my blog
                content (
                <a
                  href="https://automattic.com/privacy/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WordPress Privacy Policy
                </a>
                ).
              </li>
              <li>
                <span className="font-medium">WhatsApp:</span> For direct
                communication (
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Privacy Policy
                </a>
                ).
              </li>
              <li>
                <span className="font-medium">Calendly:</span> For booking
                consultations (
                <a
                  href="https://calendly.com/privacy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Calendly Privacy Policy
                </a>
                ).
              </li>
              <li>
                <span className="font-medium">Beehiiv:</span> For newsletter
                subscriptions (
                <a
                  href="https://www.beehiiv.com/privacy-policy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Beehiiv Privacy Policy
                </a>
                ).
              </li>
              <li>
                <span className="font-medium">Google Analytics</span> (if used):
                For site usage stats (
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
                ).
              </li>
            </ul>
            <p className="italic text-gray-600">
              I don’t control these services’ data practices, so please review
              their policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              4. How I Protect Your Information
            </h2>
            <p className="leading-relaxed">
              I take reasonable steps to keep your data safe:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>My site uses HTTPS for secure connections.</li>
              <li>I store personal data securely and limit access to it.</li>
              <li>
                However, no online system is 100% secure, so I can’t guarantee
                absolute protection.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">5. Cookies</h2>
            <p className="leading-relaxed">My site may use cookies:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>To remember your preferences or improve your experience.</li>
              <li>
                For analytics (e.g., tracking visits via Google Analytics).
              </li>
              <li>
                You can disable cookies in your browser settings, but some
                features might not work as well.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              6. Your Rights
            </h2>
            <p className="leading-relaxed">You have control over your data:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Access:</span> Ask me what info I
                have about you.
              </li>
              <li>
                <span className="font-medium">Correction:</span> Request updates
                to inaccurate data.
              </li>
              <li>
                <span className="font-medium">Deletion:</span> Ask me to delete
                your data (e.g., unsubscribe from the newsletter).
              </li>
              <li>
                <span className="font-medium">Opt-Out:</span> Stop receiving
                emails by clicking “unsubscribe” or contacting me.
              </li>
            </ul>
            <p className="leading-relaxed">
              To exercise these rights, email me at{" "}
              <a
                href="mailto:hello@rajondey.com"
                className="text-blue-600 hover:underline"
              >
                hello@rajondey.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              7. Data Sharing
            </h2>
            <p className="leading-relaxed">
              I don’t share your personal info except:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                With third-party services mentioned above to provide my
                services.
              </li>
              <li>If required by law (e.g., a court order).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              8. Data Retention
            </h2>
            <p className="leading-relaxed">
              I keep your data only as long as needed:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Contact info: Until our communication ends or you ask me to
                delete it.
              </li>
              <li>Newsletter subscriptions: Until you unsubscribe.</li>
              <li>
                Analytics data: As long as the third-party tool retains it
                (e.g., Google Analytics).
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              9. International Visitors
            </h2>
            <p className="leading-relaxed">
              I’m based in Bangladesh, and my site is hosted in [insert hosting
              location if known, e.g., the US]. If you’re from another country
              (e.g., the EU), your data may cross borders. By using my site, you
              agree to this transfer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              10. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              I may update this Privacy Policy as my site evolves. Check back
              here for the latest version (dated at the top). If there are big
              changes, I’ll try to notify you via the blog or email.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              11. Contact Me
            </h2>
            <p className="leading-relaxed">Questions? Reach out:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:hello@rajondey.com"
                  className="text-blue-600 hover:underline"
                >
                  hello@rajondey.com
                </a>
              </li>
              <li>
                <span className="font-medium">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/01737997143"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +880 1737-997143
                </a>
              </li>
              <li>
                <span className="font-medium">Address:</span> Sylhet, Bangladesh
              </li>
            </ul>
            <p className="text-lg font-medium text-gray-900">
              Thanks for trusting me with your information!
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
