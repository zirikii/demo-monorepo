import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { primaryNav } from "@/data/nav";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";
import { ButtonLink } from "@/components/ui/Button";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Gojek home" className="shrink-0">
          <img src="/brand/logo-green.svg" alt="Gojek" className="h-7 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                      isActive ? "bg-gojek-tint text-gojek" : "text-ink-soft hover:text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DemoRibbon
            label="Unofficial demo"
            className="hidden border-line text-ink-faint xl:inline-flex"
          />
          <Link
            to={user ? "/account" : "/login"}
            className="hidden text-sm font-semibold text-ink-soft hover:text-ink sm:inline-flex"
          >
            {user ? user.name.split(" ")[0] : "Sign in"}
          </Link>
          <ButtonLink to={user ? "/account" : "/signup"} size="sm" className="hidden sm:inline-flex">
            {user ? "Partner Hub" : "Get started"}
          </ButtonLink>
          <button
            type="button"
            className="rounded-full p-2 text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "block rounded-xl px-3 py-2.5 text-sm font-semibold",
                      isActive ? "bg-gojek-tint text-gojek" : "text-ink hover:bg-surface",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="flex gap-2 pt-2">
              <ButtonLink to="/login" variant="secondary" size="sm" className="flex-1">
                Sign in
              </ButtonLink>
              <ButtonLink to={user ? "/account" : "/signup"} size="sm" className="flex-1">
                {user ? "Partner Hub" : "Get started"}
              </ButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
