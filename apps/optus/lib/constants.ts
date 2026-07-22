export const SESSION_COOKIE = "optus_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Optus";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@optus-demo.com.au",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/mobile-plans", label: "Mobile" },
  { href: "/internet", label: "Internet" },
  { href: "/phones", label: "Phones" },
  { href: "/entertainment", label: "Entertainment" },
  { href: "/prepaid", label: "Prepaid" },
  { href: "/deals", label: "Deals" },
] as const;

export const NAV_MYOPTUS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "Plans" },
  { href: "/bills", label: "Bills" },
  { href: "/recharge", label: "Recharge" },
  { href: "/settings", label: "Settings" },
] as const;

export const MYOPTUS_PREFIXES = [
  "/dashboard",
  "/usage",
  "/plans",
  "/bills",
  "/recharge",
  "/settings",
] as const;
