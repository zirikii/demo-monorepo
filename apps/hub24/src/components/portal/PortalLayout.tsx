import { useState } from "react";
import type { ReactNode } from "react";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import type { DemoPortal } from "@/lib/auth";

const NAV: Record<DemoPortal, { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean }[]> = {
  adviser: [
    { to: "/adviserhub", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/adviserhub/clients", label: "Clients", icon: Users },
    { to: "/adviserhub/portfolios", label: "Portfolios", icon: PieChart },
    { to: "/adviserhub/orders", label: "Orders", icon: Briefcase },
    { to: "/adviserhub/reports", label: "Reports", icon: FileText },
    { to: "/adviserhub/settings", label: "Settings", icon: Settings },
  ],
  investor: [
    { to: "/investorhub", label: "Home", icon: LayoutDashboard, end: true },
    { to: "/investorhub/accounts", label: "Accounts", icon: Wallet },
    { to: "/investorhub/statements", label: "Statements", icon: FileText },
    { to: "/investorhub/settings", label: "Settings", icon: Settings },
  ],
  manager: [
    { to: "/managerhub", label: "ManagerHUB", icon: LayoutDashboard, end: true },
    { to: "/adviserhub/portfolios", label: "Models", icon: PieChart },
    { to: "/adviserhub/settings", label: "Settings", icon: Settings },
  ],
};

interface PortalLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PortalLayout({ title, description, actions, children }: PortalLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const portal = user?.portal ?? "adviser";
  const items = NAV[portal];
  const productName = portal === "investor" ? "InvestorHUB" : portal === "manager" ? "ManagerHUB" : "AdviserHUB";

  useDocumentTitle(`${title} · ${productName}`);

  function signOut() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-hub-navy-deep text-white transition-transform lg:static lg:translate-x-0",
          navOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[72px] items-center border-b border-white/10 px-5">
          <Link to="/" className="focus-hub">
            <BrandLogo tone="light" />
          </Link>
        </div>
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-xs font-bold tracking-[0.12em] text-hub-teal-soft uppercase">{productName}</p>
          <p className="mt-1.5 text-sm font-bold">{user?.practice}</p>
          <p className="text-xs text-white/60">{user?.name}</p>
        </div>
        <nav aria-label={productName} className="flex flex-1 flex-col gap-1 p-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-hub flex items-center gap-3 rounded-hub px-3 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white",
                  isActive && "bg-white/15 text-white",
                )
              }
            >
              <item.icon aria-hidden="true" className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="focus-hub m-3 inline-flex items-center gap-2 rounded-hub px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          Log out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-line bg-white px-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="focus-hub rounded-hub p-2 lg:hidden"
              aria-label="Open navigation"
              onClick={() => setNavOpen(true)}
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-ink-strong">{title}</h1>
              {description ? <p className="text-sm text-ink-faint">{description}</p> : null}
            </div>
          </div>
          {actions}
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
