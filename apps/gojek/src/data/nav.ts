import type { NavLink } from "./types";

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About us", to: "/about-us" },
  { label: "Life@Gojek", to: "/life-at-gojek" },
  { label: "Blogs & News", to: "/blog" },
];

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About us", to: "/about-us" },
      { label: "Life@Gojek", to: "/life-at-gojek" },
      { label: "Join us", to: "/join-us" },
    ],
  },
  {
    heading: "Tech",
    links: [
      { label: "Products", to: "/products" },
      { label: "Open source", to: "/open-source" },
      { label: "Blogs & News", to: "/blog" },
      { label: "Engineering stories", to: "/blog?category=Engineering" },
    ],
  },
  {
    heading: "Candidates",
    links: [
      { label: "Open roles", to: "/join-us" },
      { label: "Candidate hub", to: "/hub" },
      { label: "Sign in", to: "/login" },
      { label: "Interview process", to: "/join-us#process" },
    ],
  },
];
