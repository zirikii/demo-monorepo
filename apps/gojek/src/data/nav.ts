import type { NavLink } from "./types";

export const MARKETING_NAV: NavLink[] = [
  { label: "About us", to: "/about" },
  { label: "Life@Gojek", to: "/life-at-gojek" },
  { label: "Blogs & News", to: "/blog" },
];

export const MARKETING_MORE: NavLink[] = [
  { label: "Products", to: "/products" },
  { label: "Open source", to: "/open-source" },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Life@Gojek", to: "/life-at-gojek" },
  { label: "Blogs & News", to: "/blog" },
  { label: "Join us", to: "/careers" },
];

export const PORTAL_NAV: NavLink[] = [
  { label: "Overview", to: "/portal" },
  { label: "Applications", to: "/portal/applications" },
  { label: "Saved jobs", to: "/portal/saved" },
  { label: "Open source", to: "/portal/opensource" },
  { label: "Settings", to: "/portal/settings" },
];

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gojek/" },
  { label: "X", href: "https://x.com/gojektech" },
  { label: "Instagram", href: "https://www.instagram.com/gojekindonesia/" },
  { label: "YouTube", href: "https://www.youtube.com/@gojekindonesia" },
  { label: "GitHub", href: "https://github.com/gojek" },
] as const;

export function isActivePath(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
