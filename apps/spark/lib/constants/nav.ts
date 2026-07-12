import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Gauge,
  LayoutDashboard,
  Plane,
  Settings,
  SlidersHorizontal,
  Smartphone,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Optional badge key resolved at render (e.g. counts). */
  badgeKey?: "addons" | "bills";
}

/** Primary authenticated navigation ("My Spark"). */
export const APP_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Usage", href: "/usage", icon: Gauge },
  { label: "Bills", href: "/bills", icon: CreditCard, badgeKey: "bills" },
  { label: "My plan", href: "/plan", icon: Smartphone },
  { label: "Add-ons", href: "/addons", icon: SlidersHorizontal, badgeKey: "addons" },
  { label: "Travel", href: "/roaming", icon: Plane },
  { label: "Settings", href: "/settings", icon: Settings },
];

/** Marketing top-nav links (mirrors Spark's shop mega-nav headings). */
export const MARKETING_NAV: { label: string; href: string }[] = [
  { label: "Mobile", href: "/mobile" },
  { label: "Broadband", href: "/broadband" },
  { label: "Travel & roaming", href: "/roaming" },
  { label: "Promotions", href: "/shop/promotions/travel-and-move" },
];

export const PROFILE_MENU: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Usage", href: "/usage", icon: Gauge },
  { label: "Bills", href: "/bills", icon: CreditCard },
  { label: "My plan", href: "/plan", icon: Smartphone },
  { label: "Settings", href: "/settings", icon: Settings },
];
