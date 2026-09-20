import { useState } from "react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { MARKETING_MORE, MARKETING_NAV } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

export function SiteHeader({ portal = false }: { portal?: boolean }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <BrandLogo />
          <DemoRibbon className="border-white/15 text-go-muted" />
        </div>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {MARKETING_NAV.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} />
          ))}
          {MARKETING_MORE.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} />
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <NavItem to="/portal" label="Portal" />
              <ButtonLink to={portal ? "/portal/settings" : "/portal"} size="sm">
                {portal ? "Settings" : "Open portal"}
              </ButtonLink>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-go-muted hover:text-white">
                Log in
              </Link>
              <ButtonLink to="/careers" size="sm">
                Join us
              </ButtonLink>
            </>
          )}
        </div>
        <button
          type="button"
          className="focus-go rounded-go p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/8 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {[...MARKETING_NAV, ...MARKETING_MORE, { label: "Join us", to: "/careers" }].map((link) => (
              <Link key={link.to} to={link.to} className="text-base" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to={user ? "/portal" : "/login"} onClick={() => setOpen(false)}>
              {user ? "Portal" : "Log in"}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        cn("text-sm transition hover:text-white", isActive ? "text-white" : "text-go-muted")
      }
    >
      {label}
    </NavLink>
  );
}
