import Script from "next/script";

const SchemaOrg = () => {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Person",
    name: "Rajon Dey",
    jobTitle: "Freelance Software Developer",
    url: "https://development.rajondey.com",
    sameAs: [
      "https://github.com/rajondey",
      "https://linkedin.com/in/rajondey",
      "https://twitter.com/rajondey",
      "https://facebook.com/rajondey",
      "https://instagram.com/rajondey",
      "https://medium.com/@rajondey",
      "https://dev.to/rajondey",
      "https://stackoverflow.com/users/your-id/rajondey",
      "https://www.hackerrank.com/rajondey",
      "https://leetcode.com/rajondey",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Rajon Dey - Freelance Software Development",
      url: "https://development.rajondey.com",
    },
    offers: {
      "@type": "Service",
      name: "Web Development Services",
      description:
        "Custom web apps, e-commerce solutions, and headless CMS integration.",
      areaServed: "Worldwide",
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
