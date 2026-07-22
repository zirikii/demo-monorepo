import {
  Activity,
  BarChart3,
  FileText,
  Gauge,
  ReceiptText,
  Router,
  Settings,
  Smartphone,
} from "lucide-react";
export const hubNavItems = [
  { href: "/overview", label: "Overview", icon: Gauge },
  { href: "/fleet", label: "Fleet Manager", icon: Smartphone },
  { href: "/insights", label: "Insight Plus", icon: BarChart3 },
  { href: "/billing", label: "Billing", icon: ReceiptText },
  { href: "/services", label: "Services", icon: Router },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;
export const quickActions = [
  { label: "Review roaming alerts", value: "7 high-usage services", icon: Activity },
  { label: "Approve invoice allocation", value: "June invoice ready", icon: ReceiptText },
  { label: "Subscribe report recipients", value: "4 pending teams", icon: FileText },
] as const;
