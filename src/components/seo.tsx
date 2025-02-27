import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export function SEO({ title, description, url, image }: SEOProps) {
  const fullUrl = url
    ? `https://development.rajondey.com${url}`
    : "https://development.rajondey.com"; 
  const defaultImage = "/og-image.jpg";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  );
}
