export const SESSION_COOKIE = "optus_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Optus";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@optus-demo.au",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/mobile", label: "Mobile" },
  { href: "/home-internet", label: "Home Internet" },
  { href: "/phones", label: "Phones" },
  { href: "/deals", label: "Deals" },
  { href: "/entertainment", label: "Entertainment" },
] as const;

export const NAV_MYOPTUS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "Plans" },
  { href: "/add-ons", label: "Add-ons" },
  { href: "/bills", label: "Bills" },
  { href: "/settings", label: "Settings" },
] as const;
