import { useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, LogOut, Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

export interface PortalNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface PortalLayoutProps {
  portal: string;
  nav: PortalNavItem[];
  contextLabel: string;
  contextValue: string;
  contextNote: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PortalLayout({
  portal,
  nav,
  contextLabel,
  contextValue,
  contextNote,
  title,
  description,
  actions,
  children,
}: PortalLayoutProps) {
  useDocumentTitle(`${title} · ${portal}`);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  function signOut() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-white transition-transform lg:static lg:translate-x-0",
          navOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[72px] items-center border-b border-line px-5">
          <Link to="/" className="focus-h24" aria-label="HUB24 home">
            <BrandLogo />
          </Link>
        </div>

        <div className="border-b border-line px-5 py-4">
          <p className="text-xs font-bold tracking-[0.12em] text-ink-ghost uppercase">{portal}</p>
          <p className="mt-1.5 text-xs text-ink-ghost">{contextLabel}</p>
          <p className="text-sm font-semibold text-ink-strong">{contextValue}</p>
          <p className="text-xs text-ink-faint">{contextNote}</p>
        </div>

        <nav aria-label={portal} className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setNavOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "focus-h24 flex items-center gap-3 rounded-h24 px-3.5 py-2.5 text-[0.95rem] font-semibold transition",
                      isActive
                        ? "bg-h24-tint text-h24-teal-dark"
                        : "text-ink-soft hover:bg-surface-tint hover:text-ink",
                    )
                  }
                >
                  <item.icon aria-hidden className="h-[18px] w-[18px]" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-3">
          <button
            type="button"
            onClick={signOut}
            className="focus-h24 flex w-full items-center gap-3 rounded-h24 px-3.5 py-2.5 text-[0.95rem] font-semibold text-ink-soft transition hover:bg-surface-tint hover:text-ink"
          >
            <LogOut aria-hidden className="h-[18px] w-[18px]" />
            Log out
          </button>
        </div>
      </aside>

      {navOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-30 bg-ink-strong/40 lg:hidden"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[72px] items-center gap-4 border-b border-line bg-white px-5 lg:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setNavOpen(true)}
            className="focus-h24 rounded-full p-2 text-ink lg:hidden"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-lg font-semibold text-ink-strong">{title}</h1>
            {description ? <p className="truncate text-sm text-ink-faint">{description}</p> : null}
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="focus-h24 relative rounded-full p-2 text-ink-soft transition hover:text-ink"
          >
            <Bell aria-hidden className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-h24-teal" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="sm" />
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-semibold text-ink-strong">{user.name}</span>
                <span className="text-xs text-ink-faint">{user.jobTitle}</span>
              </span>
            </div>
          ) : null}
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {actions ? <div className="mb-6 flex flex-wrap gap-3">{actions}</div> : null}
          {children}
        </main>
      </div>
    </div>
  );
}
