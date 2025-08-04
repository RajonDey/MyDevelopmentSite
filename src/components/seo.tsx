import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function SEO({
  title,
  description,
  url,
  image = "/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Rajon Dey",
  section,
  tags = [],
}: SEOProps) {
  const siteUrl = "https://development.rajondey.com";
  const fullUrl = `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  // Structured data for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rajon Dey",
    url: siteUrl,
    sameAs: [
      "https://github.com/RajonDey",
      "https://www.linkedin.com/in/rajondey/",
      "https://twitter.com/rajjon_dey",
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description:
      "Full-stack developer specializing in React, Next.js, and modern web technologies",
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "WordPress",
      "E-commerce Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sylhet",
      addressCountry: "Bangladesh",
    },
  };

  // Structured data for WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rajon Dey - Software Developer",
    url: siteUrl,
    description:
      "Professional software development services for businesses and individuals",
    author: {
      "@type": "Person",
      name: "Rajon Dey",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Structured data for Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description,
    provider: {
      "@type": "Person",
      name: "Rajon Dey",
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
    serviceType: "Software Development",
    url: fullUrl,
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rajon Dey - Software Developer" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@rajjon_dey" />
      <meta name="twitter:site" content="@rajjon_dey" />

      {/* Additional Meta Tags */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://cloud.umami.is" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//cloud.umami.is" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1dbf73" />
      <meta name="msapplication-TileColor" content="#1dbf73" />
      <meta name="application-name" content="Rajon Dey - Software Developer" />

      {/* Keywords for SEO */}
      <meta
        name="keywords"
        content="software developer, web developer, React developer, Next.js developer, freelance developer, Bangladesh, WordPress developer, e-commerce developer"
      />

      {/* Geo Meta Tags */}
      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Sylhet" />
      <meta name="geo.position" content="24.8949;91.8687" />
      <meta name="ICBM" content="24.8949, 91.8687" />
    </Head>
  );
}
