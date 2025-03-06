import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import { staticPages } from "@/data/mock-data";
import { Metadata } from "next";
import SchemaOrg from "./SchemaOrg";
import ClientSessionProvider from "@/components/ClientSessionProvider";

export const metadata: Metadata = {
  title: staticPages.home.metaTitle,
  description: staticPages.home.metaDescription,
  viewport: "width=device-width, initial-scale=1.0",
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
    icon: [
      { url: "/icon-192x192.png" },
      { url: "/icon-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaOrg />
      </head>
      <body>
        <ClientSessionProvider>
          <Header />
          <main className="py-16">{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
