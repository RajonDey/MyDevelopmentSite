import rawBrand from "../../../brand/brand.json";
import type { BrandBook } from "@/types/rdx/brand-book";

/** Loaded from repo `brand/brand.json` (static import). Do not copy hex/fonts into this file. */
export const brandBook = rawBrand as BrandBook;

export const brandHqSections = [
  { id: "identity", label: "Identity" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "brand", label: "Brand" },
  { id: "voice", label: "Voice" },
  { id: "assets", label: "Assets" },
  { id: "products", label: "Products" },
  { id: "rules", label: "Rules" },
] as const;

export const brandHqChrome = {
  eyebrow: "Brand HQ",
  pageTitle: "The book",
  intro:
    "Living source of truth for the mark, color, type, and company line. Public site copy still comes from the Copy Bank.",
  sourceNote: "Values on this page are read from brand/brand.json.",
  repoBook: "brand/BRAND.md",
  repoJson: "brand/brand.json",
  assetsIntro: "Original H first. Everything else is derived from it.",
  voicePending: "Tone and word lists are not locked yet.",
  productRulesPending: "Child-brand rules live in brand.json.productBrand.",
  missionHidden: "Mission, vision, and values are not written yet.",
} as const;

export const brandHqSpecimens = [
  { id: "original", label: "Original", surface: "paper", layout: "mark" },
  { id: "onDark", label: "On dark", surface: "ink", layout: "mark" },
  { id: "horizontal", label: "Horizontal", surface: "paper", layout: "horizontal" },
  { id: "horizontalOnDark", label: "Horizontal on dark", surface: "ink", layout: "horizontal" },
  { id: "stacked", label: "Stacked", surface: "paper", layout: "stacked" },
  { id: "stackedOnDark", label: "Stacked on dark", surface: "ink", layout: "stacked" },
] as const;

export const brandHqDownloadGroups = [
  {
    title: "Original",
    items: [
      { key: "logo", label: "rdxhive-logo.svg", surface: "paper", mark: "mark" },
      { key: "logoCurrentColor", label: "rdxhive-logo-currentcolor.svg", surface: "paper", mark: "mark" },
    ],
  },
  {
    title: "Lockups",
    items: [
      { key: "lockupHorizontal", label: "Horizontal · SVG", surface: "paper", mark: "horizontal" },
      { key: "lockupHorizontalOnDark", label: "Horizontal on dark · SVG", surface: "ink", mark: "horizontal" },
      { key: "lockupStacked", label: "Stacked · SVG", surface: "paper", mark: "stacked" },
      { key: "lockupStackedOnDark", label: "Stacked on dark · SVG", surface: "ink", mark: "stacked" },
      { key: "lockupPrimary", label: "Primary · SVG", surface: "paper", mark: "horizontal" },
    ],
  },
  {
    title: "Mono",
    items: [
      { key: "monoMarkBlack", label: "Mark black · SVG", surface: "paper", mark: "mark" },
      { key: "monoMarkWhite", label: "Mark white · SVG", surface: "ink", mark: "mark" },
    ],
  },
  {
    title: "Graphics",
    layout: "grid",
    items: [
      { key: "hexPattern", label: "Hex field · SVG", surface: "paper" },
      { key: "visualStyle", label: "Visual style · SVG", surface: "paper" },
    ],
  },
  {
    title: "Templates",
    layout: "grid",
    items: [
      { key: "ogOnDark", label: "OG on dark · 1200×630", surface: "ink" },
      { key: "ogPaper", label: "OG · 1200×630", surface: "paper" },
      { key: "socialOnDark", label: "Social on dark · 1080×1080", surface: "ink" },
      { key: "social", label: "Social · 1080×1080", surface: "paper" },
    ],
  },
  {
    title: "Business card (concept)",
    layout: "grid",
    note: "Concept only — not a print vendor file.",
    items: [
      { key: "cardFront", label: "Front · PNG", surface: "ink" },
      { key: "cardBack", label: "Back · PNG", surface: "paper" },
    ],
  },
  {
    title: "Chrome",
    items: [
      { key: "favicon", label: "Favicon · SVG", surface: "paper" },
      { key: "appIcon", label: "App icon · PNG", surface: "ink" },
      { key: "avatar", label: "Social avatar · PNG", surface: "paper" },
    ],
  },
] as const;

export const brandHqColorOrder = [
  "paper",
  "ink",
  "muted",
  "subtle",
  "border",
  "surface",
  "accent",
  "accentHover",
  "hexInk",
] as const;
