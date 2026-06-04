import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        "text-light": "var(--color-text-light)",
        rdx: {
          paper: "var(--rdx-color-paper)",
          ink: "var(--rdx-color-ink)",
          muted: "var(--rdx-color-muted)",
          subtle: "var(--rdx-color-subtle)",
          border: "var(--rdx-color-border)",
          surface: "var(--rdx-color-surface)",
          accent: "var(--rdx-color-accent)",
          "accent-hover": "var(--rdx-color-accent-hover)",
        },
      },
      fontFamily: {
        rdx: ["var(--rdx-font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        "rdx-display": [
          "var(--rdx-font-display)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      maxWidth: {
        rdx: "var(--rdx-max-width)",
        "rdx-narrow": "var(--rdx-max-width-narrow)",
        "rdx-wide": "var(--rdx-max-width-wide)",
      },
      borderRadius: {
        rdx: "var(--rdx-radius-md)",
        "rdx-pill": "var(--rdx-radius-pill)",
      },
    },
  },
  plugins: [],
};

export default config;
