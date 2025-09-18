import { Metadata } from "next";
import { SEO } from "@/components/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | RDX Technologies",
  description:
    "Learn how RDX Technologies collects, uses, and protects your personal information on development.rajondey.com.",
  openGraph: {
    title: "Privacy Policy | RDX Technologies",
    description:
      "Learn how RDX Technologies collects, uses, and protects your personal information on development.rajondey.com.",
    url: "https://development.rajondey.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | RDX Technologies"
        description="Learn how RDX Technologies collects, uses, and protects your personal information on development.rajondey.com."
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
          <p className="mt-1 text-sm text-gray-600">
            <strong>Business:</strong> RDX Technologies (Rajon Dey X
            Technologies)
          </p>
        </header>

        {/* Bilingual Introduction */}
        <section className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                English Version
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to{" "}
                <code className="font-mono text-gray-900">
                  development.rajondey.com
                </code>
                ! I&rsquo;m Rajon Dey, founder of RDX Technologies, and this
                Privacy Policy explains how we collect, use, and protect your
                information when you visit our site or use our services. We
                value your privacy and aim to keep things simple and
                transparent.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                বাংলা সংস্করণ
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <code className="font-mono text-gray-900">
                  development.rajondey.com
                </code>{" "}
                এ স্বাগতম! আমি রাজন দে, RDX Technologies-এর প্রতিষ্ঠাতা, এবং এই
                গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার তথ্য সংগ্রহ,
                ব্যবহার এবং সুরক্ষা করি যখন আপনি আমাদের সাইট পরিদর্শন করেন বা
                আমাদের সেবা ব্যবহার করেন। আমরা আপনার গোপনীয়তাকে মূল্য দিই এবং
                বিষয়গুলো সহজ ও স্বচ্ছ রাখার চেষ্টা করি।
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="space-y-8 text-gray-700">
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  1. What Information We Collect
                </h2>
                <p className="leading-relaxed">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-medium">Personal Information:</span>{" "}
                    Your name, email address, or phone number if you contact us
                    via the contact form, WhatsApp, or book a consultation
                    through Calendly. Your email address if you subscribe to our
                    newsletter via Beehiiv.
                  </li>
                  <li>
                    <span className="font-medium">
                      Non-Personal Information:
                    </span>{" "}
                    Usage data like your IP address, browser type, and pages
                    visited, collected through analytics tools (e.g., Google
                    Analytics, if implemented). Information from blog comments
                    (e.g., name, email) if you leave a comment on our WordPress
                    blog.
                  </li>
                </ul>
                <p className="italic text-gray-600">
                  We don&apos;t collect more than we need, and we don&apos;t
                  sell your data.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  ১. আমরা কী তথ্য সংগ্রহ করি
                </h2>
                <p className="leading-relaxed">
                  আমরা নিম্নলিখিত ধরনের তথ্য সংগ্রহ করতে পারি:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-medium">ব্যক্তিগত তথ্য:</span> আপনার
                    নাম, ইমেইল ঠিকানা, বা ফোন নম্বর যদি আপনি যোগাযোগ ফর্ম,
                    হোয়াটসঅ্যাপ বা ক্যালেন্ডলির মাধ্যমে পরামর্শের জন্য বুকিং
                    করেন। আপনার ইমেইল ঠিকানা যদি আপনি বিহিভের মাধ্যমে আমাদের
                    নিউজলেটারে সাবস্ক্রাইব করেন।
                  </li>
                  <li>
                    <span className="font-medium">অব্যক্তিগত তথ্য:</span>{" "}
                    ব্যবহারের তথ্য যেমন আপনার IP ঠিকানা, ব্রাউজার টাইপ এবং
                    পরিদর্শিত পৃষ্ঠা, অ্যানালিটিক্স টুলের মাধ্যমে সংগ্রহ করা
                    (যেমন Google Analytics)। ব্লগ কমেন্টের তথ্য (যেমন নাম,
                    ইমেইল) যদি আপনি আমাদের ওয়ার্ডপ্রেস ব্লগে কমেন্ট করেন।
                  </li>
                </ul>
                <p className="italic text-gray-600">
                  আমরা প্রয়োজনের চেয়ে বেশি সংগ্রহ করি না এবং আপনার তথ্য বিক্রি
                  করি না।
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  2. How We Use Your Information
                </h2>
                <p className="leading-relaxed">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Respond to your inquiries or schedule consultations.</li>
                  <li>
                    Send you newsletters or updates if you&apos;ve subscribed
                    (you can unsubscribe anytime).
                  </li>
                  <li>
                    Improve our website by understanding how visitors use it
                    (via analytics).
                  </li>
                  <li>
                    Display your comments on blog posts if you submit them.
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  ২. আমরা আপনার তথ্য কীভাবে ব্যবহার করি
                </h2>
                <p className="leading-relaxed">আমরা আপনার তথ্য ব্যবহার করি:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    আপনার জিজ্ঞাসার উত্তর দেওয়ার বা পরামর্শের সময় নির্ধারণের
                    জন্য।
                  </li>
                  <li>
                    নিউজলেটার বা আপডেট পাঠানোর জন্য যদি আপনি সাবস্ক্রাইব করেন
                    (আপনি যেকোনো সময় আনসাবস্ক্রাইব করতে পারেন)।
                  </li>
                  <li>
                    ভিজিটররা কীভাবে এটি ব্যবহার করে তা বুঝে আমাদের ওয়েবসাইট
                    উন্নত করার জন্য (অ্যানালিটিক্সের মাধ্যমে)।
                  </li>
                  <li>
                    ব্লগ পোস্টে আপনার কমেন্ট প্রদর্শনের জন্য যদি আপনি সেগুলো জমা
                    দেন।
                  </li>
                </ul>
              </div>
            </div>
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
              4. How We Protect Your Information
            </h2>
            <p className="leading-relaxed">
              We take reasonable steps to keep your data safe:
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
                href="mailto:contact@rajondey.com"
                className="text-blue-600 hover:underline"
              >
                contact@rajondey.com
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

          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  11. Contact Us
                </h2>
                <p className="leading-relaxed">
                  Questions? Reach out to RDX Technologies:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href="mailto:contact@rajondey.com"
                      className="text-blue-600 hover:underline"
                    >
                      contact@rajondey.com
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
                    <span className="font-medium">Address:</span> Sylhet,
                    Bangladesh
                  </li>
                  <li>
                    <span className="font-medium">Business:</span> RDX
                    Technologies (Rajon Dey X Technologies)
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-900">
                  Thanks for trusting RDX Technologies with your information!
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  ১১. আমাদের সাথে যোগাযোগ
                </h2>
                <p className="leading-relaxed">
                  প্রশ্ন আছে? RDX Technologies-এর সাথে যোগাযোগ করুন:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-medium">ইমেইল:</span>{" "}
                    <a
                      href="mailto:contact@rajondey.com"
                      className="text-blue-600 hover:underline"
                    >
                      contact@rajondey.com
                    </a>
                  </li>
                  <li>
                    <span className="font-medium">হোয়াটসঅ্যাপ:</span>{" "}
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
                    <span className="font-medium">ঠিকানা:</span> সিলেট, বাংলাদেশ
                  </li>
                  <li>
                    <span className="font-medium">ব্যবসা:</span> RDX
                    Technologies (Rajon Dey X Technologies)
                  </li>
                </ul>
                <p className="text-lg font-medium text-gray-900">
                  আপনার তথ্য আমাদের কাছে বিশ্বাস করার জন্য ধন্যবাদ!
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
