export const SESSION_COOKIE = "optus_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Optus";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@example.com",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/mobile", label: "Mobile" },
  { href: "/prepaid", label: "Prepaid" },
  { href: "/internet", label: "Internet" },
  { href: "/support", label: "Support" },
] as const;

export const NAV_MYOPTUS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "Plans" },
  { href: "/add-ons", label: "Add-ons" },
  { href: "/bills", label: "Bills" },
  { href: "/support-cases", label: "Support cases" },
  { href: "/settings", label: "Settings" },
] as const;
