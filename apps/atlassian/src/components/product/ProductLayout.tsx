import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppMark } from "@/components/brand/AppMark";
import { RovoLogo } from "@/components/brand/RovoLogo";
import { AccountMenu, AppSwitcher } from "@/components/product/AppSwitcher";
import type { ProductApp } from "@/data/apps";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

export interface ProductNavItem {
  label: string;
  to: string;
  end?: boolean;
}

export function ProductLayout({
  app,
  title,
  nav,
  searchLabel,
  children,
}: {
  app: ProductApp;
  title: string;
  nav?: ProductNavItem[];
  searchLabel?: string;
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-12 shrink-0 items-center gap-1 border-b border-line bg-white px-2">
        <AppSwitcher />
        <Link
          to={app.path}
          className="focus-atl mr-2 flex items-center gap-1.5 rounded-atl-sm px-1.5 py-1"
          aria-label={app.name}
        >
          <AppMark slug={app.mark} size={22} />
          <span className="text-[0.95rem] font-bold text-ink-strong">{app.name}</span>
        </Link>

        {searchLabel ? (
          <div className="relative min-w-0 flex-1 max-w-xl">
            <Search
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-ink-ghost"
            />
            <input
              type="search"
              placeholder="Search"
              aria-label={searchLabel}
              className="focus-atl h-8 w-full rounded-atl-lg border border-line bg-white pr-3 pl-8 text-sm text-ink placeholder:text-ink-ghost focus:border-atl-blue"
            />
          </div>
        ) : (
          <div className="min-w-0 flex-1" />
        )}

        <div className="flex shrink-0 items-center gap-1">
          {app.portal !== "rovo" ? (
            <Link
              to="/rovo"
              className="focus-atl flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-sm font-semibold text-ink-strong hover:bg-surface-deep"
            >
              <RovoLogo size={16} />
              Ask Rovo
            </Link>
          ) : null}
          <AccountMenu
            email={user?.email ?? ""}
            name={user?.name ?? "You"}
            onSignOut={() => {
              logout();
              navigate("/");
            }}
          />
        </div>
      </header>

      {nav && nav.length > 0 ? (
        <nav
          aria-label={app.name}
          className="flex items-center gap-1 overflow-x-auto border-b border-line px-4"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-atl flex h-10 shrink-0 items-center border-b-2 px-3 text-sm font-medium whitespace-nowrap",
                  isActive
                    ? "border-atl-blue-deep text-atl-blue-deep"
                    : "border-transparent text-ink-soft hover:text-ink-strong",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      ) : null}

      <div className="min-h-0 flex-1 overflow-auto px-5 py-4">{children}</div>
    </div>
  );
}
