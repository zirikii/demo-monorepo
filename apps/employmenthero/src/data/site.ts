export const SITE = {
  name: "Employment Hero",
  tagline: "The AI Employment Operating System",
  descriptor:
    "Australia's AI-powered Employment Operating System for payroll, HR, recruitment and benefits — with intelligent agents supporting your team.",
  mission: "Make employment easier and more valuable for everyone.",
  founded: 2014,
  headquarters: "Level 2, 441 Kent Street, Sydney NSW 2000",
  supportPhone: "1300 084 847",
  supportEmail: "support@employmenthero.demo",
  salesEmail: "sales@employmenthero.demo",
} as const;

export const HEADLINE_STATS = [
  { value: "350,000+", label: "businesses on the platform" },
  { value: "2.5M+", label: "employees supported" },
  { value: "$140B+", label: "payroll processed each year" },
  { value: "4.7/5", label: "average customer rating" },
] as const;

export const REGIONS = [
  { code: "AU", name: "Australia", to: "/" },
  { code: "NZ", name: "New Zealand", to: "/" },
  { code: "UK", name: "United Kingdom", to: "/" },
  { code: "SG", name: "Singapore", to: "/" },
  { code: "MY", name: "Malaysia", to: "/" },
  { code: "CA", name: "Canada", to: "/" },
] as const;

export const TRUSTED_BY = [
  "Harbourline Hospitality",
  "Corella Health",
  "Redgum Constructions",
  "Northbridge Dental",
  "Saltbush Retail Co",
  "Tallowood Care",
  "Bluegum Early Learning",
  "Ironbark Logistics",
] as const;

/**
 * Credentials surfaced on the login screen and pre-filled into the form. The matching
 * accounts live in `src/lib/auth.ts`.
 */
export const DEMO_CREDENTIALS = {
  email: "demo@employmenthero.com",
  password: "heroes2026",
} as const;

export const ACKNOWLEDGEMENT =
  "We acknowledge Aboriginal and Torres Strait Islander peoples as the First Australians and Traditional Custodians of the lands where we live, learn and work.";

export const DISCLAIMER =
  "Unofficial demo build. Not affiliated with, endorsed by, or connected to Employment Hero Pty Ltd.";
