export type NavLink = { label: string; to: string };

export const primaryNav: NavLink[] = [
  { label: "Products", to: "/products" },
  { label: "Drivers", to: "/drivers" },
  { label: "Merchants", to: "/merchants" },
  { label: "Careers", to: "/careers" },
  { label: "Newsroom", to: "/newsroom" },
  { label: "About", to: "/about" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "All products", to: "/products" },
      { label: "Transport & Logistics", to: "/products?c=transport" },
      { label: "Food & Shopping", to: "/products?c=food" },
      { label: "Payments", to: "/products?c=payments" },
    ],
  },
  {
    heading: "Partners",
    links: [
      { label: "Become a driver", to: "/drivers" },
      { label: "Become a merchant", to: "/merchants" },
      { label: "Partner Hub", to: "/account" },
      { label: "Help centre", to: "/about#help" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Gojek", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Newsroom", to: "/newsroom" },
      { label: "Awards", to: "/about#awards" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Sign in", to: "/login" },
      { label: "Create account", to: "/signup" },
    ],
  },
];
