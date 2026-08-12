import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  Home,
  LogOut,
  Settings,
  Target,
  UserRoundSearch,
  Users,
  Wallet,
} from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/platform", label: "Dashboard", icon: Home, end: true },
  { to: "/platform/people", label: "People", icon: Users, end: false },
  { to: "/platform/hiring", label: "Hiring", icon: UserRoundSearch, end: false },
  { to: "/platform/payroll", label: "Payroll", icon: Wallet, end: false },
  { to: "/platform/leave", label: "Leave", icon: CalendarDays, end: false },
  { to: "/platform/performance", label: "Performance", icon: Target, end: false },
  { to: "/platform/reports", label: "Reports", icon: BarChart3, end: false },
  { to: "/platform/settings", label: "Settings", icon: Settings, end: false },
];

export function PlatformLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="flex min-h-screen bg-eh-surface-tint">
      <aside className="hidden w-64 shrink-0 flex-col bg-eh-ink text-white lg:flex">
        <div className="flex h-18 items-center gap-2.5 px-6">
          <img src="/brand/symbol-white.svg" alt="Employment Hero" width={30} height={30} />
          <span className="font-display text-base font-semibold">employment hero</span>
        </div>

        <nav aria-label="Platform" className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-eh flex items-center gap-3 rounded-eh px-3 py-2.5 text-sm font-medium transition",
                  isActive ? "bg-eh-purple text-white" : "text-white/70 hover:bg-white/10",
                )
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/12 p-4">
          <Link to="/" className="focus-eh block text-xs text-white/60 hover:text-white">
            ← Back to employmenthero.com
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-eh-line bg-white px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="truncate font-display text-xl font-bold text-eh-ink">{title}</h1>
              <DemoRibbon label="Demo" className="border-eh-line text-eh-ink-faint" />
            </div>
            {subtitle ? <p className="mt-0.5 text-sm text-eh-ink-faint">{subtitle}</p> : null}
          </div>

          <div className="flex items-center gap-4">
            {actions}
            <div className="flex items-center gap-2.5">
              <Avatar name={user?.name ?? "Demo User"} />
              <span className="hidden text-sm sm:block">
                <span className="block font-semibold text-eh-ink">{user?.name}</span>
                <span className="block text-xs text-eh-ink-faint">{user?.company}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="focus-eh inline-flex items-center gap-1.5 rounded-full border border-eh-line px-3.5 py-2 text-sm font-semibold text-eh-ink transition hover:border-eh-purple hover:text-eh-purple"
            >
              <LogOut size={15} />
              Log out
            </button>
          </div>
        </header>

        <nav
          aria-label="Platform sections"
          className="flex gap-1 overflow-x-auto border-b border-eh-line bg-white px-4 py-2 lg:hidden"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-eh rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition",
                  isActive
                    ? "bg-eh-purple text-white"
                    : "text-eh-ink-soft hover:bg-eh-surface-tint",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
