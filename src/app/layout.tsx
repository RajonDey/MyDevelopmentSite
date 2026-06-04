import { RdxHeader } from "@/components/rdx/layout/Header";
import { RdxFooter } from "@/components/rdx/layout/Footer";
import "@/styles/globals.css";
import { siteMetadata } from "@/content/rdx/metadata";
import { seoKeywords } from "@/content/rdx/seo";
import { rdxFontVariables } from "@/lib/rdx-fonts";
import { Metadata } from "next";
import SchemaOrg from "./SchemaOrg";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: [...seoKeywords],
  applicationName: siteMetadata.siteName,
  robots: { index: true, follow: true },
  alternates: {
    types: {
      "text/markdown": [{ url: "/llms.txt", title: "LLM site summary" }],
    },
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rdxFontVariables}>
      <head>
        <script async src="https://tally.so/widgets/embed.js" />
        {/* Google Tag Manager - Head */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TT9FG5TF');`}
        </Script>

        {/* ✅ Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="629d0b97-44a8-490a-b4b8-dec240a13ac0"
          strategy="afterInteractive"
        />

        <SchemaOrg />
      </head>
      <body className="bg-rdx-paper font-rdx text-rdx-ink antialiased">
        {/* Google Tag Manager - Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TT9FG5TF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ClientSessionProvider>
          <RdxHeader />
          <main className="min-h-screen pt-16">{children}</main>
          <RdxFooter />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
