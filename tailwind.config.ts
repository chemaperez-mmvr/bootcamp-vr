import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', '"Geist Fallback"', 'system-ui', 'sans-serif'],
      },
      colors: {
        foreground: "oklch(0.2 0.02 240)",
        muted: "oklch(.5 .02 240)",
        "muted-foreground": "oklch(0.5 0.02 240)",
        teal: {
          50: "#f0fafb",
          100: "#d9f3f4",
          200: "#b3e7e9",
          300: "#7dd4d7",
          400: "#44babe",
          500: "#00a8ab",
          600: "#008a8d",
          700: "#006d70",
          800: "#00575a",
          900: "#004043",
          950: "#002729",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
