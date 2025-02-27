import Script from "next/script";

const SchemaOrg = () => {
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Person",
    name: "Rajon Dey",
    jobTitle: "Software Developer",
    url: "https://yourdomain.com", // Replace with your domain
    sameAs: [
      "https://github.com/rajondey", // Update with your profiles
      "https://linkedin.com/in/rajondey",
      "https://twitter.com/rajondey", // Add your Twitter if applicable
      "https://facebook.com/rajondey", // Add if you have one
      "https://instagram.com/rajondey", // Add if applicable
      "https://medium.com/@rajondey", // Add if you write there
      "https://dev.to/rajondey", // Add if you’re on Dev.to
      "https://stackoverflow.com/users/your-id/rajondey", // Update with your ID
      "https://www.hackerrank.com/rajondey", // Add if applicable
      "https://leetcode.com/rajondey", // Add if applicable
    ],
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
