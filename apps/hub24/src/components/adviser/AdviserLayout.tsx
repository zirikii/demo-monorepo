import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeftRight,
  Bell,
  ClipboardList,
  FileBarChart,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ADVISER_TASKS } from "@/data/adviser";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/adviserhub", label: "Dashboard", icon: Home, end: true },
  { to: "/adviserhub/clients", label: "Clients", icon: Users, end: false },
  { to: "/adviserhub/portfolios", label: "Managed portfolios", icon: PieChart, end: false },
  { to: "/adviserhub/trading", label: "Trading", icon: ArrowLeftRight, end: false },
  { to: "/adviserhub/reporting", label: "Engage reporting", icon: FileBarChart, end: false },
  { to: "/adviserhub/applications", label: "Applications", icon: ClipboardList, end: false },
  { to: "/adviserhub/settings", label: "Settings", icon: Settings, end: false },
];

interface AdviserLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdviserLayout({ title, subtitle, actions, children }: AdviserLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  useDocumentTitle(`${title} · AdviserHUB`);

  const openTasks = ADVISER_TASKS.filter((task) => task.priority === "High").length;

  function signOut() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-hub-navy text-white transition-transform lg:static lg:translate-x-0",
          navOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/" className="focus-hub" aria-label="HUB24 home">
            <BrandLogo tone="light" descriptor="AdviserHUB" />
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="focus-hub rounded-full p-1 text-white/70 lg:hidden"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="AdviserHUB" className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setNavOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-hub flex items-center gap-3 rounded-hub px-3 py-2.5 text-sm font-bold transition",
                  isActive
                    ? "bg-white/12 text-white"
                    : "text-white/70 hover:bg-white/8 hover:text-white",
                )
              }
            >
              <item.icon aria-hidden className="h-4.5 w-4.5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name ?? "Demo user"} tone="teal" />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold">{user?.name}</span>
              <span className="truncate text-xs text-white/60">{user?.practice}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="focus-hub mt-4 flex w-full items-center gap-2 rounded-hub border border-white/20 px-3 py-2 text-sm font-bold text-white/80 transition hover:border-hub-teal-soft hover:text-white"
          >
            <LogOut aria-hidden className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
          <div className="flex items-center gap-4 px-5 py-4 lg:px-8">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(true)}
              className="focus-hub rounded-full p-2 text-ink lg:hidden"
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-extrabold tracking-tight text-ink-strong">
                {title}
              </h1>
              {subtitle ? <p className="truncate text-sm text-ink-faint">{subtitle}</p> : null}
            </div>

            <DemoRibbon
              label="Demo data"
              className="hidden border-line text-ink-faint md:inline-flex"
            />

            <span
              className="relative inline-flex items-center rounded-full border border-line p-2 text-ink-soft"
              aria-label={`${openTasks} high priority tasks`}
            >
              <Bell aria-hidden className="h-4.5 w-4.5" />
              {openTasks > 0 ? (
                <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-critical px-1 text-[0.6rem] font-extrabold text-white">
                  {openTasks}
                </span>
              ) : null}
            </span>

            {actions}
          </div>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      {navOpen ? (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-30 bg-hub-navy-deep/50 lg:hidden"
        />
      ) : null}
    </div>
  );
}
