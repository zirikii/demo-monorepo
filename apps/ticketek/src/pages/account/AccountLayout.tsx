import type { ReactNode } from "react";
import { CalendarHeart, CreditCard, Heart, Hourglass, KeyRound, LayoutDashboard, Bell, Ticket, User, UserX } from "lucide-react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useFan } from "@/features/fan/FanProvider";
import { fanTier, lifetimeEvents } from "@/features/fan/recommendations";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/account", label: "Overview", Icon: LayoutDashboard, end: true },
  { to: "/account/orders", label: "Order History", Icon: Ticket },
  { to: "/account/history", label: "Events I've Been To", Icon: CalendarHeart },
  { to: "/account/favourites", label: "Favourites", Icon: Heart },
  { to: "/account/waitlist", label: "Waitlist", Icon: Hourglass },
  { to: "/account/details", label: "Personal Details", Icon: User },
  { to: "/account/notifications", label: "Communication Preferences", Icon: Bell },
  { to: "/account/payment", label: "Payment Methods", Icon: CreditCard },
  { to: "/account/password", label: "Change Password", Icon: KeyRound },
  { to: "/account/close", label: "Close Account", Icon: UserX },
];

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(pathname)}`} replace />;
  return <>{children}</>;
}

export function AccountLayout() {
  const { profile } = useFan();
  const tier = fanTier(profile);
  return (
    <RequireAuth>
      <div className="container-tk py-8">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="tk-gradient grid size-14 place-items-center rounded-full text-xl font-extrabold text-midnight">{profile.firstName.charAt(0)}</div>
          <div>
            <h1 className="text-2xl font-extrabold">My Account</h1>
            <p className="text-sm text-ink-soft">
              {profile.firstName} {profile.lastName} · {tier.label} fan · {lifetimeEvents(profile)} events
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          <nav aria-label="My Account" className="main-content-box h-fit overflow-hidden">
            <ul className="flex gap-1 overflow-x-auto p-2 lg:block lg:space-y-0.5">
              {LINKS.map(({ to, label, Icon, end }) => (
                <li key={to} className="shrink-0">
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn("flex items-center gap-2.5 whitespace-nowrap rounded-tk px-3 py-2 text-sm", isActive ? "bg-midnight font-semibold text-white" : "text-ink hover:bg-page")
                    }
                  >
                    <Icon className="size-4" aria-hidden /> {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="main-content-box p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
