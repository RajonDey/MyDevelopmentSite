import Script from "next/script";

const SchemaOrg = () => {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Person",
    name: "Rajon Dey",
    jobTitle: "Software Developer",
    url: "https://development.rajondey.com",
    sameAs: [
      "https://github.com/RajonDey",
      "https://www.linkedin.com/in/rajondey/",
      "https://developer-data.beehiiv.com/",
      "https://codepen.io/Rajon",
      "https://www.threads.net/@rajjon.dey",
      "https://x.com/rajjon_dey",
      "https://www.instagram.com/rajjon.dey/",
      "https://www.facebook.com/rajjon.dey",
      "https://medium.com/@rajondeyofficial",
      "https://dev.to/rajondey",
      "https://hashnode.com/@rajondey",
      "https://www.youtube.com/@rajon_dey",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sylhet",
      addressCountry: "Bangladesh",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+8801737997143", // Replace with your actual phone number
      email: "rajondeyofficial@gmail.com", // Replace with your actual email
      url: "https://development.rajondey.com/contact",
    },
    worksFor: {
      "@type": "Organization",
      name: "Rajon Dey - Software Development",
      url: "https://development.rajondey.com",
    },
    offers: {
      "@type": "Service",
      serviceType: "Software Development",
      provider: {
        "@type": "Person",
        name: "Rajon Dey",
      },
      category: "Software Development",
      description:
        "Custom software solutions, including web apps, e-commerce platforms, and backend systems. High-quality, scalable solutions for businesses worldwide.",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Development",
              description:
                "Build tailored software solutions using Next.js, React, and Node.js.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce Platforms",
              description:
                "Develop e-commerce platforms with Shopify, WooCommerce, or custom solutions.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Backend Systems & APIs",
              description:
                "Create robust backend systems and APIs using Node.js, Express, and MongoDB.",
            },
          },
        ],
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://development.rajondey.com",
    },
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      strategy="beforeInteractive"
    >
      {JSON.stringify(schemaOrgJSONLD)}
    </Script>
  );
};

export default SchemaOrg;
