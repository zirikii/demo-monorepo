export type NavItem = {
  label: string;
  to: string;
};

export const primaryNav: NavItem[] = [
  { label: "News", to: "/news" },
  { label: "Sport", to: "/sport" },
  { label: "Lifestyle", to: "/lifestyle" },
  { label: "Travel", to: "/travel" },
  { label: "Entertainment", to: "/entertainment" },
  { label: "Shopping", to: "/shopping" },
  { label: "TV", to: "/tv" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Sections",
    links: primaryNav,
  },
  {
    title: "Watch",
    links: [
      { label: "Live", to: "/live" },
      { label: "TV Guide", to: "/tv" },
      { label: "9Now", to: "/tv" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Newsletter", to: "/newsletter" },
      { label: "Horoscopes", to: "/horoscopes" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];
