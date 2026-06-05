import { homeContent } from "@/content/rdx/home";
import { SystemDiagram } from "@/components/rdx/visuals/system-diagram";
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
      visual={<SystemDiagram className="w-full max-w-lg" />}
    />
  );
}
