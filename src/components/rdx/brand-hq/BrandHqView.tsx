import { HairlineRule } from "@/components/rdx/ui/HairlineRule";
import type { BrandBook } from "@/types/rdx/brand-book";
import { BrandHqAssets } from "./BrandHqAssets";
import { BrandHqClose } from "./BrandHqClose";
import { BrandHqColor } from "./BrandHqColor";
import { BrandHqHero } from "./BrandHqHero";
import { BrandHqIdentity } from "./BrandHqIdentity";
import { BrandHqNav } from "./BrandHqNav";
import { BrandHqPositioning } from "./BrandHqPositioning";
import { BrandHqProducts } from "./BrandHqProducts";
import { BrandHqRules } from "./BrandHqRules";
import { BrandHqType } from "./BrandHqType";
import { BrandHqVoice } from "./BrandHqVoice";

type BrandHqViewProps = {
  brand: BrandBook;
};

export function BrandHqView({ brand }: BrandHqViewProps) {
  return (
    <>
      <BrandHqNav />
      <BrandHqHero brand={brand} />
      <HairlineRule />
      <BrandHqIdentity brand={brand} />
      <BrandHqColor brand={brand} />
      <BrandHqType brand={brand} />
      <BrandHqPositioning brand={brand} />
      <BrandHqVoice brand={brand} />
      <BrandHqAssets brand={brand} />
      <BrandHqProducts brand={brand} />
      <BrandHqRules brand={brand} />
      <BrandHqClose brand={brand} />
    </>
  );
}
