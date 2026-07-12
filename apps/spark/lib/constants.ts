export const SESSION_COOKIE = "spark_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Spark NZ";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@spark-demo.nz",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/travel-packs", label: "Travel Packs" },
  { href: "/mobile-plans", label: "Mobile" },
  { href: "/broadband", label: "Broadband" },
  { href: "/phones", label: "Phones" },
  { href: "/deals", label: "Deals" },
] as const;

export const NAV_MYSPARK = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "Plans" },
  { href: "/top-up", label: "Top up" },
  { href: "/bills", label: "Bills" },
  { href: "/settings", label: "Settings" },
] as const;
