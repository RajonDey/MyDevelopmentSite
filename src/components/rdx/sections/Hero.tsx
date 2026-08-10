import { homeContent } from "@/content/rdx/home";
import { HiveSystemDiagram } from "@/components/rdx/visuals/hive/HiveSystemDiagram";
import { SplitHero } from "@/components/rdx/sections/SplitHero";

export function Hero() {
  const { hero, priceFloorLabel } = homeContent;

  return (
    <SplitHero
      badge={priceFloorLabel}
      headline={hero.headline}
      subhead={hero.subhead}
      primaryCta={hero.primaryCta}
      secondaryCta={hero.secondaryCta}
      footnote={hero.footnote}
      visual={<HiveSystemDiagram className="w-full" />}
    />
  );
}
