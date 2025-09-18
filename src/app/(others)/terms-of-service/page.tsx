import { Metadata } from "next";
import { SEO } from "@/components/seo";

export const metadata: Metadata = {
  title: "Terms of Service | RDX Technologies",
  description:
    "Terms and conditions for RDX Technologies software development services. Learn about our service terms, payment policies, and business practices.",
  openGraph: {
    title: "Terms of Service | RDX Technologies",
    description:
      "Terms and conditions for RDX Technologies software development services. Learn about our service terms, payment policies, and business practices.",
    url: "https://development.rajondey.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service | RDX Technologies"
        description="Terms and conditions for RDX Technologies software development services. Learn about our service terms, payment policies, and business practices."
        url="/terms-of-service"
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            <strong>Last Updated:</strong> March 11, 2025
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <strong>Business:</strong> RDX Technologies (Rajon Dey X
            Technologies)
          </p>
        </header>

        {/* Bilingual Content */}
        <main className="space-y-8">
          {/* Introduction */}
          <section className="bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to RDX Technologies! These Terms of Service govern
                  your use of our website and services. By accessing our website
                  or engaging our services, you agree to be bound by these
                  terms.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  ভূমিকা
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  RDX Technologies-এ স্বাগতম! এই সেবার শর্তাবলী আমাদের ওয়েবসাইট
                  এবং সেবা ব্যবহারের নিয়ম নির্ধারণ করে। আমাদের ওয়েবসাইট
                  ব্যবহার বা সেবা গ্রহণের মাধ্যমে আপনি এই শর্তাবলী মেনে চলতে
                  সম্মত হন।
                </p>
              </div>
            </div>
          </section>

          {/* Business Information */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Business Information
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Company Name:</strong> RDX Technologies
                  </p>
                  <p>
                    <strong>Legal Name:</strong> Rajon Dey X Technologies
                  </p>
                  <p>
                    <strong>Website:</strong> development.rajondey.com
                  </p>
                  <p>
                    <strong>Email:</strong> contact@rajondey.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +880 1737-997143
                  </p>
                  <p>
                    <strong>Address:</strong> Sylhet, Bangladesh
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  ব্যবসায়িক তথ্য
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>কোম্পানির নাম:</strong> RDX Technologies
                  </p>
                  <p>
                    <strong>আইনি নাম:</strong> Rajon Dey X Technologies
                  </p>
                  <p>
                    <strong>ওয়েবসাইট:</strong> development.rajondey.com
                  </p>
                  <p>
                    <strong>ইমেইল:</strong> contact@rajondey.com
                  </p>
                  <p>
                    <strong>ফোন:</strong> +880 1737-997143
                  </p>
                  <p>
                    <strong>ঠিকানা:</strong> সিলেট, বাংলাদেশ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Services
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Custom Web Application Development</li>
                  <li>• E-commerce Platform Development</li>
                  <li>• WordPress Website Development</li>
                  <li>• Headless CMS Solutions</li>
                  <li>• Email Template Design</li>
                  <li>• Website Maintenance & Support</li>
                  <li>• Technical Consultation</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  আমাদের সেবা
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• কাস্টম ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট</li>
                  <li>• ই-কমার্স প্ল্যাটফর্ম ডেভেলপমেন্ট</li>
                  <li>• ওয়ার্ডপ্রেস ওয়েবসাইট ডেভেলপমেন্ট</li>
                  <li>• হেডলেস CMS সমাধান</li>
                  <li>• ইমেইল টেমপ্লেট ডিজাইন</li>
                  <li>• ওয়েবসাইট রক্ষণাবেক্ষণ ও সহায়তা</li>
                  <li>• প্রযুক্তিগত পরামর্শ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Terms */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Service Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Project Scope</h3>
                    <p>
                      All project requirements will be clearly defined in
                      written proposals. Any changes to scope may result in
                      additional charges.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Timeline</h3>
                    <p>
                      Project timelines are estimates and may vary based on
                      complexity and client feedback speed.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Client Responsibilities</h3>
                    <p>
                      Clients must provide timely feedback, content, and access
                      to necessary resources for project completion.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  সেবার শর্তাবলী
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">প্রকল্পের পরিধি</h3>
                    <p>
                      সমস্ত প্রকল্পের প্রয়োজনীয়তা লিখিত প্রস্তাবে স্পষ্টভাবে
                      সংজ্ঞায়িত করা হবে। পরিধিতে পরিবর্তন অতিরিক্ত চার্জের কারণ
                      হতে পারে।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">সময়সীমা</h3>
                    <p>
                      প্রকল্পের সময়সীমা অনুমান এবং জটিলতা ও ক্লায়েন্টের
                      প্রতিক্রিয়ার গতির উপর নির্ভর করে পরিবর্তিত হতে পারে।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">ক্লায়েন্টের দায়িত্ব</h3>
                    <p>
                      ক্লায়েন্টদের প্রকল্প সম্পূর্ণতার জন্য সময়মতো
                      প্রতিক্রিয়া, কন্টেন্ট এবং প্রয়োজনীয় সম্পদ সরবরাহ করতে
                      হবে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Payment Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Payment Schedule</h3>
                    <p>
                      50% upfront payment required to start project. Remaining
                      50% due upon project completion.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Payment Methods</h3>
                    <p>
                      We accept payments via bank transfer, mobile banking, and
                      international payment gateways.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Late Payments</h3>
                    <p>
                      Late payments may incur additional charges. Project work
                      may be paused for overdue payments.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  পেমেন্টের শর্তাবলী
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">পেমেন্ট সময়সূচী</h3>
                    <p>
                      প্রকল্প শুরু করতে ৫০% অগ্রিম পেমেন্ট প্রয়োজন। প্রকল্প
                      সম্পূর্ণ হওয়ার পর বাকি ৫০% পরিশোধযোগ্য।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">পেমেন্ট পদ্ধতি</h3>
                    <p>
                      আমরা ব্যাংক ট্রান্সফার, মোবাইল ব্যাংকিং এবং আন্তর্জাতিক
                      পেমেন্ট গেটওয়ের মাধ্যমে পেমেন্ট গ্রহণ করি।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">বিলম্বিত পেমেন্ট</h3>
                    <p>
                      বিলম্বিত পেমেন্টে অতিরিক্ত চার্জ হতে পারে। বকেয়া
                      পেমেন্টের জন্য প্রকল্পের কাজ স্থগিত রাখা হতে পারে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Policy */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Refund Policy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Refund Eligibility</h3>
                    <p>
                      Refunds are considered on a case-by-case basis. No refunds
                      for completed work or if project cancellation is due to
                      client&rsquo;s change of mind.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Refund Process</h3>
                    <p>
                      Refund requests must be submitted in writing within 7 days
                      of project completion. Processing time: 5-10 business
                      days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Partial Refunds</h3>
                    <p>
                      Partial refunds may be provided for incomplete work based
                      on the amount of work completed.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  রিফান্ড নীতি
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">রিফান্ডের যোগ্যতা</h3>
                    <p>
                      রিফান্ড ক্ষেত্রবিশেষে বিবেচনা করা হয়। সম্পূর্ণ কাজের জন্য
                      বা ক্লায়েন্টের মন পরিবর্তনের কারণে প্রকল্প বাতিলের
                      ক্ষেত্রে রিফান্ড দেওয়া হয় না।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">রিফান্ড প্রক্রিয়া</h3>
                    <p>
                      প্রকল্প সম্পূর্ণ হওয়ার ৭ দিনের মধ্যে লিখিতভাবে রিফান্ডের
                      আবেদন করতে হবে। প্রক্রিয়াকরণের সময়: ৫-১০ কর্মদিবস।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">আংশিক রিফান্ড</h3>
                    <p>
                      সম্পূর্ণ কাজের পরিমাণের ভিত্তিতে অসম্পূর্ণ কাজের জন্য
                      আংশিক রিফান্ড দেওয়া হতে পারে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Communication Terms */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Communication Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p>
                      We aim to respond to all inquiries within 24-48 hours
                      during business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Communication Channels</h3>
                    <p>
                      Primary: Email, WhatsApp. Secondary: Phone calls for
                      urgent matters.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Project Updates</h3>
                    <p>
                      Regular project updates will be provided via email or
                      project management tools.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  যোগাযোগের শর্তাবলী
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">প্রতিক্রিয়ার সময়</h3>
                    <p>
                      আমরা কর্মদিবসে ২৪-৪৮ ঘন্টার মধ্যে সব জিজ্ঞাসার উত্তর
                      দেওয়ার চেষ্টা করি।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">যোগাযোগের মাধ্যম</h3>
                    <p>
                      প্রাথমিক: ইমেইল, হোয়াটসঅ্যাপ। মাধ্যমিক: জরুরি বিষয়ের
                      জন্য ফোন কল।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">প্রকল্পের আপডেট</h3>
                    <p>
                      ইমেইল বা প্রকল্প ব্যবস্থাপনা সরঞ্জামের মাধ্যমে নিয়মিত
                      প্রকল্প আপডেট দেওয়া হবে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Intellectual Property
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Client Ownership</h3>
                    <p>
                      Upon full payment, clients own all custom code and designs
                      created specifically for their project.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Third-Party Assets</h3>
                    <p>
                      Clients are responsible for ensuring proper licensing of
                      any third-party assets they provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Portfolio Rights</h3>
                    <p>
                      We retain the right to showcase completed projects in our
                      portfolio unless otherwise agreed.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  বৌদ্ধিক সম্পত্তি
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">ক্লায়েন্টের মালিকানা</h3>
                    <p>
                      সম্পূর্ণ পেমেন্টের পর, ক্লায়েন্ট তাদের প্রকল্পের জন্য
                      তৈরি করা সমস্ত কাস্টম কোড এবং ডিজাইনের মালিক হন।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">তৃতীয় পক্ষের সম্পদ</h3>
                    <p>
                      ক্লায়েন্টরা তাদের সরবরাহ করা তৃতীয় পক্ষের সম্পদের সঠিক
                      লাইসেন্সিং নিশ্চিত করার দায়িত্বে থাকেন।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">পোর্টফোলিও অধিকার</h3>
                    <p>
                      অন্যথায় সম্মত না হলে, আমরা আমাদের পোর্টফোলিওতে সম্পূর্ণ
                      প্রকল্প প্রদর্শনের অধিকার রাখি।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">Service Limitations</h3>
                    <p>
                      Our services are provided &rdquo;as is&rdquo; and we make
                      no warranties about the results or performance.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Maximum Liability</h3>
                    <p>
                      Our maximum liability is limited to the total amount paid
                      for the specific service.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Force Majeure</h3>
                    <p>
                      We are not liable for delays or failures due to
                      circumstances beyond our control.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  দায়বদ্ধতার সীমাবদ্ধতা
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold">সেবার সীমাবদ্ধতা</h3>
                    <p>
                      আমাদের সেবা &rdquo;যেমন আছে তেমন&rdquo; সরবরাহ করা হয় এবং
                      আমরা ফলাফল বা পারফরম্যান্স সম্পর্কে কোনও ওয়ারেন্টি দিই
                      না।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">সর্বোচ্চ দায়বদ্ধতা</h3>
                    <p>
                      আমাদের সর্বোচ্চ দায়বদ্ধতা নির্দিষ্ট সেবার জন্য প্রদত্ত
                      মোট পরিমাণে সীমাবদ্ধ।
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">অপ্রতিরোধ্য পরিস্থিতি</h3>
                    <p>
                      আমাদের নিয়ন্ত্রণের বাইরের পরিস্থিতির কারণে বিলম্ব বা
                      ব্যর্থতার জন্য আমরা দায়ী নই।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Email:</strong> contact@rajondey.com
                  </p>
                  <p>
                    <strong>WhatsApp:</strong> +880 1737-997143
                  </p>
                  <p>
                    <strong>Address:</strong> Sylhet, Bangladesh
                  </p>
                  <p>
                    <strong>Website:</strong> development.rajondey.com
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  যোগাযোগের তথ্য
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>ইমেইল:</strong> contact@rajondey.com
                  </p>
                  <p>
                    <strong>হোয়াটসঅ্যাপ:</strong> +880 1737-997143
                  </p>
                  <p>
                    <strong>ঠিকানা:</strong> সিলেট, বাংলাদেশ
                  </p>
                  <p>
                    <strong>ওয়েবসাইট:</strong> development.rajondey.com
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Changes to Terms
                </h2>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time.
                  Changes will be posted on this page with an updated revision
                  date. Continued use of our services constitutes acceptance of
                  the modified terms.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  শর্তাবলীর পরিবর্তন
                </h2>
                <p className="text-gray-700">
                  আমরা যে কোনও সময় এই শর্তাবলী পরিবর্তনের অধিকার রাখি।
                  পরিবর্তনগুলি আপডেটেড সংশোধন তারিখ সহ এই পৃষ্ঠায় পোস্ট করা
                  হবে। আমাদের সেবা ব্যবহার চালিয়ে যাওয়া পরিবর্তিত শর্তাবলী
                  গ্রহণের সমতুল্য।
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
