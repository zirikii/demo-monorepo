import type { FooterSection, NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Fly", href: "/fly", children: ["Flight Information", "Airline Information", "Arrival Guide", "Departure Guide", "Transiting Guide", "Lounges"] },
  { label: "At Changi", href: "/at-changi", children: ["Terminal maps", "Facilities", "Transport", "Lost & Found", "Free Wifi Access"] },
  { label: "Dine & Shop", href: "/dine-and-shop", children: ["Shop", "Dine", "Changi Pay", "iShopChangi"] },
  { label: "Experience", href: "/experience", children: ["Attractions", "Tours", "Jewel", "Gardens"] },
  { label: "Happenings", href: "/happenings", children: ["Events", "Promotions"] },
  { label: "Changi Rewards", href: "/rewards", children: ["Benefits & Privileges", "Catalogue", "Specials", "Changi Monarch"] },
  { label: "App & Help", href: "/help", children: ["Assistance", "Changi App", "Contact Information"] },
];

export const footerSections: FooterSection[] = [
  { title: "Fly", links: [{ label: "Flight Information", href: "/fly" }, { label: "Airline Information", href: "/fly" }, { label: "Arrival Guide", href: "/fly" }, { label: "Departure Guide", href: "/fly" }, { label: "Transiting Guide", href: "/fly" }, { label: "Lounges", href: "/fly" }] },
  { title: "At Changi", links: [{ label: "Airport Services", href: "/at-changi" }, { label: "Transport", href: "/at-changi" }, { label: "Facilities", href: "/at-changi" }, { label: "Airport Map", href: "/at-changi" }, { label: "Lost & Found", href: "/at-changi" }] },
  { title: "Dine & Shop", links: [{ label: "Shop & Dine", href: "/dine-and-shop" }, { label: "Changi Pay", href: "/dine-and-shop" }, { label: "Shopping Concierge", href: "/dine-and-shop" }, { label: "iShopChangi", href: "/dine-and-shop" }] },
  { title: "Happenings", links: [{ label: "Events", href: "/happenings" }, { label: "Promotions", href: "/happenings" }, { label: "Changi Rewards", href: "/rewards" }] },
  { title: "App & Help", links: [{ label: "Assistance", href: "/help" }, { label: "Changi App", href: "/help" }, { label: "Contact Information", href: "/help" }, { label: "Privacy Policy", href: "/help" }] },
];
