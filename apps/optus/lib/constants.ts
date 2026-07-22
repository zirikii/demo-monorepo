export const SESSION_COOKIE = "optus_demo_session";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Optus Australia";

export const DEMO_CREDENTIALS = {
  email: process.env.DEMO_ADMIN_EMAIL ?? "admin@optus-demo.au",
  password: process.env.DEMO_ADMIN_PASSWORD ?? "demo",
} as const;

export const NAV_MARKETING = [
  { href: "/mobile-plans", label: "Mobile" },
  { href: "/home-internet", label: "Home internet" },
  { href: "/phones", label: "Phones" },
  { href: "/entertainment", label: "Entertainment" },
  { href: "/prepaid", label: "Prepaid" },
  { href: "/network", label: "Network" },
  { href: "/support", label: "Support" },
] as const;

export const NAV_MYOPTUS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/usage", label: "Usage" },
  { href: "/plans", label: "Plans" },
  { href: "/add-ons", label: "Add-ons" },
  { href: "/bills", label: "Bills" },
  { href: "/network-tools", label: "Network tools" },
  { href: "/settings", label: "Settings" },
] as const;
