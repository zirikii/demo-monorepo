import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  FileText,
  LayoutDashboard,
  Layers,
  PiggyBank,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import type { PortalNavItem } from "./PortalLayout";

export const INVESTOR_NAV: PortalNavItem[] = [
  { to: "/investorhub", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/investorhub/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/investorhub/managed-portfolios", label: "Managed portfolios", icon: Layers },
  { to: "/investorhub/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/investorhub/super", label: "Super & pension", icon: PiggyBank },
  { to: "/investorhub/reports", label: "Reports", icon: BarChart3 },
  { to: "/investorhub/documents", label: "Documents", icon: FileText },
  { to: "/investorhub/settings", label: "Settings", icon: Settings },
];

export const ADVISER_NAV: PortalNavItem[] = [
  { to: "/adviserhub", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/adviserhub/clients", label: "Clients", icon: Users },
  { to: "/adviserhub/trading", label: "Trading", icon: ArrowLeftRight },
  { to: "/adviserhub/portfolios", label: "Managed portfolios", icon: Layers },
  { to: "/adviserhub/reports", label: "Reports", icon: BarChart3 },
  { to: "/adviserhub/practice", label: "Practice", icon: Briefcase },
];
