import type { Metadata } from "next";
import { BrandHqView } from "@/components/rdx/brand-hq/BrandHqView";
import { brandBook, brandHqChrome } from "@/content/rdx/brand-hq";

export const metadata: Metadata = {
  title: `${brandHqChrome.eyebrow} | ${brandBook.name}`,
  description: brandBook.positioning.company,
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return <BrandHqView brand={brandBook} />;
}
