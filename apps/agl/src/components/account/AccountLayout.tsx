import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChartColumn, LayoutDashboard, LogOut, Plug, Receipt, UserRound } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { household } from "@/data/account";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const tabs = [
  { to: "/account", label: "Overview", Icon: LayoutDashboard, end: true },
  { to: "/account/bills", label: "Bills & payments", Icon: Receipt },
  { to: "/account/usage", label: "Usage", Icon: ChartColumn },
  { to: "/account/services", label: "My services", Icon: Plug },
  { to: "/account/profile", label: "Profile", Icon: UserRound },
];

export function AccountLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="bg-agl-sky">
        <div className="container-agl py-8">
          <p className="text-sm font-bold text-agl-teal-ink">My Account · {household.shortAddress}</p>
          <h1 className="mt-1 text-3xl font-extrabold text-agl-blue-dark">{title}</h1>
          <p className="text-sm text-ink-soft">Customer number {user?.customerNumber}</p>
        </div>
      </div>
      <div className="container-agl grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="My Account" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {tabs.map(({ to, label, Icon, end }) => (
              <li key={to} className="shrink-0">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex items-center gap-3 rounded-agl px-4 py-2.5 font-bold",
                      isActive ? "bg-agl-blue text-white" : "text-ink-soft hover:bg-agl-sky hover:text-agl-blue",
                    )
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="shrink-0 lg:mt-4 lg:border-t lg:border-line-soft lg:pt-4">
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex w-full items-center gap-3 rounded-agl px-4 py-2.5 font-bold text-ink-soft hover:bg-surface-tint"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
              </button>
            </li>
          </ul>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </PageLayout>
  );
}
