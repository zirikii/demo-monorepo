import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { PRIMARY_NAV } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 bg-night/95 text-white backdrop-blur">
      <div className="container-go-wide flex h-[72px] items-center gap-6">
        <Link to="/" className="focus-go shrink-0" aria-label="Gojek Tech home">
          <BrandLogo />
        </Link>

        <DemoRibbon
          label="Unofficial demo"
          className="hidden border-white/20 text-white/70 sm:inline-flex"
        />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-go rounded-full px-4 py-2 text-[0.95rem] font-bold transition",
                  isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <ButtonLink
            to={user ? "/hub" : "/login"}
            variant="ghost"
            size="sm"
            className="hidden text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            {user ? "Candidate hub" : "Sign in"}
          </ButtonLink>
          <ButtonLink to="/join-us" size="sm" className="hidden sm:inline-flex">
            Join us
          </ButtonLink>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-go flex h-10 w-10 items-center justify-center rounded-full border border-white/20 lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-nav" className="animate-go-fade border-t border-night-line lg:hidden">
          <nav aria-label="Mobile" className="container-go-wide flex flex-col gap-1 py-4">
            {PRIMARY_NAV.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "focus-go rounded-go-sm px-4 py-3 text-base font-bold transition",
                    isActive ? "bg-white/10 text-white" : "text-white/75",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex gap-3">
              <ButtonLink to={user ? "/hub" : "/login"} variant="inverse" size="sm">
                {user ? "Candidate hub" : "Sign in"}
              </ButtonLink>
              <ButtonLink to="/join-us" size="sm">
                Join us
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
