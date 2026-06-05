import { serviceOffers } from "./services";

/** Homepage service teaser — full tiers live on /services in Phase 3 */

export const servicesTeaser = {
  heading: "Two ways we help agencies",
  services: serviceOffers.map((offer) => ({
    name: offer.name,
    subtitle: offer.subtitle,
    startingPriceLabel: `$${offer.startingPrice.toLocaleString("en-US")}`,
  })),
} as const;
