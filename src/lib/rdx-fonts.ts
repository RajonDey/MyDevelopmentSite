import { Instrument_Serif, Source_Sans_3 } from "next/font/google";

export const rdxDisplay = Instrument_Serif({
  subsets: ["latin"],
  variable: "--rdx-font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const rdxSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--rdx-font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const rdxFontVariables = `${rdxDisplay.variable} ${rdxSans.variable}`;
