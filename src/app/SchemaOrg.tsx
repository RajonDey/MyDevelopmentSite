import Script from "next/script";

const SchemaOrg = () => {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Person",
    name: "Rajon Dey",
    jobTitle: "Freelance Software Developer",
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
