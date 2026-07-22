export const SESSION_COOKIE = "optus_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Optus";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@optus-demo.au",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/mobile-plans", label: "Mobile" },
  { href: "/broadband", label: "Internet" },
  { href: "/phones", label: "Phones" },
  { href: "/prepaid", label: "Prepaid" },
  { href: "/optus-sport", label: "Optus Sport" },
  { href: "/deals", label: "Deals" },
] as const;

export const NAV_MYOPTUS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "My plans" },
  { href: "/top-up", label: "Recharge" },
  { href: "/bills", label: "Billing" },
  { href: "/settings", label: "Settings" },
] as const;

/** Prefixes protected by middleware + used by the header to detect the My Optus area. */
export const MYOPTUS_PREFIXES = [
  "/dashboard",
  "/usage",
  "/plans",
  "/top-up",
  "/bills",
  "/settings",
] as const;
