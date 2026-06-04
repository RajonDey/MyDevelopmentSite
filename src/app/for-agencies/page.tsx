import { Metadata } from "next";
import {
  forAgenciesCampaign,
  getCampaignVariant,
} from "@/content/rdx/campaigns";
import { siteMetadata } from "@/content/rdx/metadata";
import { CampaignLanderView } from "@/components/rdx/sections/campaign/CampaignLanderView";

type ForAgenciesPageProps = {
  searchParams: Promise<{
    v?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: ForAgenciesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const variantKey = params.v === "b" ? "b" : "a";
  const variant = getCampaignVariant(forAgenciesCampaign, variantKey);
  const titleSuffix = variantKey === "b" ? " (alt)" : "";

  return {
    title: `${forAgenciesCampaign.meta.title}${titleSuffix}`,
    description: forAgenciesCampaign.meta.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: forAgenciesCampaign.meta.title,
      description: variant.headline,
      url: `${siteMetadata.siteUrl}/for-agencies`,
      siteName: siteMetadata.siteName,
    },
  };
}

export default async function ForAgenciesPage({
  searchParams,
}: ForAgenciesPageProps) {
  const params = await searchParams;
  const variantKey = params.v === "b" ? "b" : undefined;
  const variant = getCampaignVariant(forAgenciesCampaign, variantKey);

  return (
    <CampaignLanderView
      campaign={forAgenciesCampaign}
      variant={variant}
      variantKey={variantKey}
      utm={{
        utm_source: params.utm_source,
        utm_medium: params.utm_medium,
        utm_campaign: params.utm_campaign,
      }}
    />
  );
}
