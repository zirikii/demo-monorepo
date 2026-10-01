import {
  BedDouble,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Headphones,
  LayoutDashboard,
  LogOut,
  Plug,
  Receipt,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { Logo, LogoMark } from "@/components/Logo";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useProperty } from "@/features/property/PropertyProvider";
import { channelIssue, bookingNeedsAction, PLANS } from "@/features/property/views";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean; badge?: number };

export function AppLayout() {
  const { user, logout } = useAuth();
  const store = useProperty();
  const { open } = useAssistant();
  const { pathname, search } = useLocation();
  const [menu, setMenu] = useState(false);

  if (!user)
    return <Navigate to={`/login?next=${encodeURIComponent(pathname + search)}`} replace />;

  const issues = store.channels.filter(channelIssue).length;
  const actions = store.bookings.filter(bookingNeedsAction).length;
  const nav: NavItem[] = [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/app/channels", label: "Channels", icon: Plug, badge: issues },
    { to: "/app/reservations", label: "Reservations", icon: BedDouble, badge: actions },
    { to: "/app/rates", label: "Rates & availability", icon: Tags },
    { to: "/app/events", label: "Demand events", icon: CalendarDays },
    { to: "/app/billing", label: "Billing", icon: Receipt },
    { to: "/app/team", label: "Users", icon: Users },
    { to: "/app/help", label: "Help & support", icon: CircleHelp },
  ];
  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-stratos text-white md:flex">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-5 py-5"
          aria-label="SiteMinder website"
        >
          <Logo tone="white" className="h-[22px]" />
        </Link>
        <div className="mx-3 rounded-xl bg-white/5 px-3 py-2.5">
          <p className="truncate text-sm font-semibold">{store.property.name}</p>
          <p className="text-xs text-white/50">
            {PLANS[store.property.plan].name} · {store.property.id}
          </p>
        </div>
        <nav aria-label="Platform" className="mt-4 flex-1 space-y-0.5 px-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white",
                  isActive && "bg-white/10 text-white",
                )
              }
            >
              <item.icon className="size-[18px]" aria-hidden />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span
                  className="grid min-w-5 place-items-center rounded-full bg-lime px-1.5 text-[11px] font-bold text-stratos"
                  aria-label={`${item.badge} need attention`}
                >
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => open()}
          className="m-3 flex items-center gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-royal/40 to-transparent px-3 py-3 text-left hover:border-white/25"
        >
          <span className="grid size-9 place-items-center rounded-full bg-lime text-stratos">
            <Headphones className="size-4" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold">SiteMinder Support</span>
            <span className="block text-xs text-white/60">Chat or talk · 24/7</span>
          </span>
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line-soft bg-white/95 px-5 backdrop-blur md:px-8">
          <Link to="/" className="md:hidden" aria-label="SiteMinder website">
            <LogoMark className="h-7" />
          </Link>
          <nav aria-label="Platform sections" className="flex gap-1 overflow-x-auto md:hidden">
            {nav.slice(0, 5).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap",
                    isActive ? "bg-royal-tint text-royal" : "text-ink-soft",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <span className="pill ml-auto hidden bg-caution-bg text-caution sm:inline-flex">
            Demo data
          </span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-canvas"
            >
              <span className="grid size-8 place-items-center rounded-full bg-royal text-xs font-bold text-white">
                {initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold leading-tight text-heading">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block text-xs text-ink-faint">{store.profile.role}</span>
              </span>
              <ChevronDown className="size-4 text-ink-faint" aria-hidden />
            </button>
            {menu && (
              <div className="absolute right-0 top-full mt-2 w-56 animate-fade-in rounded-xl border border-line-soft bg-white p-1.5 shadow-lift">
                <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-canvas">
                  Support Studio (admin)
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-critical hover:bg-critical-bg"
                >
                  <LogOut className="size-4" aria-hidden /> Log out
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 px-5 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
