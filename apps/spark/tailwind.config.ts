import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Spark New Zealand-inspired design tokens.
 * Brand colours are intentionally close to Spark's identity:
 * Spark Purple #5F259F, plus the spot accent colours
 * (green #00AF55, magenta #EC008C, orange #FF9B00).
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
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        // Brand
        spark: {
          purple: "#5F259F",
          "purple-dark": "#4A1D7A",
          "purple-light": "#F3EDFA",
          // Spot accent colours from the Spark logo
          green: "#00AF55",
          magenta: "#EC008C",
          orange: "#FF9B00",
          // Ink used in place of the previous navy tone
          ink: "#1D1D1F",
          "ink-dark": "#111113",
          "ink-light": "#3A3A3E",
        },
        // Neutral text + surfaces
        ink: {
          DEFAULT: "#1D1D1F",
          secondary: "#48484A",
          muted: "#6E6E73",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F6F4F9",
          muted: "#F1EEF5",
        },
        line: {
          DEFAULT: "#E5E1EC",
          strong: "#CFC8DB",
        },
        // Status tones
        tone: {
          positive: "#00854A",
          "positive-bg": "#E4F5EC",
          critical: "#D1373B",
          "critical-bg": "#FCE8E8",
          caution: "#B7791F",
          "caution-bg": "#FBF3E2",
          info: "#5F259F",
          "info-bg": "#F3EDFA",
        },
        // shadcn semantic mapping (driven by CSS variables in globals.css)
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(29, 29, 31, 0.06), 0 2px 6px rgba(29, 29, 31, 0.05)",
        "card-hover": "0 8px 24px rgba(95, 37, 159, 0.14)",
        panel: "0 2px 10px rgba(29, 29, 31, 0.08)",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
