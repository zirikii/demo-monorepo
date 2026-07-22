import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Optus design tokens — teal #39A8AF wordmark colour + yellow #FECD03 accent,
 * matching the public Optus (optus.com.au) brand palette.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        optus: {
          teal: "#39A8AF",
          "teal-dark": "#2C848A",
          "teal-darker": "#1F5E62",
          "teal-light": "#E5F4F5",
          yellow: "#FECD03",
          "yellow-dark": "#E6B800",
          "yellow-light": "#FFF6D0",
          ink: "#1A1A1A",
          black: "#000000",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F6F8F8",
          muted: "#EDF1F1",
        },
        line: {
          DEFAULT: "#E2E6E6",
          strong: "#C7CFCF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "5px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Nunito Sans", "Avenir Next", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
