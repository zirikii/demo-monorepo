import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        optus: {
          teal: "#00A3AD",
          "teal-dark": "#007D87",
          "teal-light": "#E4F8F8",
          navy: "#00343D",
          yellow: "#FFD200",
          "yellow-soft": "#FFF6BF",
          green: "#1E8E5A",
          coral: "#FF6B4A",
          ink: "#18262B",
        },
        surface: { DEFAULT: "#FFFFFF", subtle: "#F5F7F8", muted: "#EEF3F4" },
        line: { DEFAULT: "#D7E2E4", strong: "#AFC7CB" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: { xl: "24px", lg: "18px", md: "12px", sm: "8px" },
      fontFamily: { sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"] },
      boxShadow: { card: "0 18px 50px rgba(0, 52, 61, 0.10)" },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.5s ease-out both" },
    },
  },
  plugins: [animate],
};

export default config;
