import type { DemoPortal } from "./apps";

export const SITE = {
  name: "Atlassian",
  tagline: "Unleash your teams and their agents",
  descriptor:
    "Collaboration software for software, IT and business teams. Plan, track, and deliver work together — with Rovo agents in the loop.",
  mission: "Unleash the potential of every team.",
  founded: 2002,
  headquarters: "350 Bush Street, San Francisco, CA 94104",
  supportEmail: "support@atlassian.demo",
  salesEmail: "sales@atlassian.demo",
} as const;

export const HEADLINE_STATS = [
  { value: "350K+", label: "unstoppable teams on the platform" },
  { value: "85%", label: "of wasted engineering time redirected" },
  { value: "40x", label: "acceleration in reporting with Rovo" },
  { value: "100+", label: "hours saved per week on support" },
] as const;

export const TRUSTED_BY = [
  "Northline Payments",
  "Harbour Digital",
  "Lumen Health",
  "Redwood Transit",
  "Ironbark Logistics",
  "Bluegum Media",
  "Cedarline Bank",
  "Tallowood Energy",
] as const;

export const REGIONS = [
  { code: "US", name: "Americas", to: "/" },
  { code: "EU", name: "Europe", to: "/" },
  { code: "AU", name: "Australia", to: "/" },
  { code: "IN", name: "India", to: "/" },
  { code: "JP", name: "Japan", to: "/" },
  { code: "SG", name: "Asia Pacific", to: "/" },
] as const;

/**
 * Credentials surfaced on the login screen and pre-filled into the form. The matching
 * accounts live in `src/lib/auth.ts`.
 */
export const DEMO_CREDENTIALS = {
  email: "demo@atlassian.com",
  password: "teamwork2026",
} as const;

export const PORTAL_CREDENTIALS: Record<DemoPortal, { email: string; password: string }> = {
  jira: { email: "demo@atlassian.com", password: "teamwork2026" },
  confluence: { email: "demo@atlassian.com", password: "teamwork2026" },
  jsm: { email: "demo@atlassian.com", password: "teamwork2026" },
  jpd: { email: "demo@atlassian.com", password: "teamwork2026" },
  bitbucket: { email: "demo@atlassian.com", password: "teamwork2026" },
  trello: { email: "demo@atlassian.com", password: "teamwork2026" },
  loom: { email: "demo@atlassian.com", password: "teamwork2026" },
  admin: { email: "admin@atlassian.com", password: "admin2026" },
  rovo: { email: "rovo@atlassian.com", password: "agents2026" },
} as const;

export const DISCLAIMER =
  "Unofficial demo build. Not affiliated with, endorsed by, or connected to Atlassian Pty Ltd.";
