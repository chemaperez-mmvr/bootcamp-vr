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
          50: "#f0fdfb",
          100: "#ccfbf4",
          200: "#99f6e8",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
