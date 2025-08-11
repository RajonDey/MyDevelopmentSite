import Header from "@/components/common/layout/Header";
import Footer from "@/components/common/layout/Footer";
import "@/styles/globals.css";
import { staticPages } from "@/data/mock-data";
import { Metadata } from "next";
import SchemaOrg from "./SchemaOrg";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WP_API_URL || "https://development.rajondey.com"
  ),
  title: staticPages.home.metaTitle,
  description: staticPages.home.metaDescription,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://development.rajondey.com",
    siteName: "Rajon Dey - Software Developer",
    title: staticPages.home.metaTitle,
    description: staticPages.home.metaDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rajon Dey - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: staticPages.home.metaTitle,
    description: staticPages.home.metaDescription,
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
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
    <html lang="en">
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
      <body>
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
          <Header />
          <main className="py-16">{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
