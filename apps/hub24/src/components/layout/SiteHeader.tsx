import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { LOGIN_OPTIONS, MEGA_MENUS, SIMPLE_NAV } from "@/data/nav";
import type { MegaMenu } from "@/data/types";
import { cn } from "@/lib/cn";

function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="animate-hub-fade absolute top-full left-0 z-40 w-screen border-t border-white/10 bg-white text-ink shadow-hub-menu">
      <div className="container-hub-wide grid gap-8 py-9 lg:grid-cols-[0.9fr_2.1fr]">
        {menu.feature ? (
          <Link
            to={menu.feature.to}
            onClick={onNavigate}
            className="focus-hub flex flex-col justify-between gap-5 rounded-hub-lg bg-hub-navy-deep p-7 text-white transition hover:bg-hub-navy"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.14em] text-hub-teal-soft uppercase">
                {menu.feature.eyebrow}
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight">{menu.feature.title}</span>
              <span className="text-sm leading-relaxed text-white/70">{menu.feature.body}</span>
            </div>
            <span className="text-sm font-bold text-hub-teal-soft underline underline-offset-4">
              {menu.feature.cta}
            </span>
          </Link>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2">
          {menu.columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">{column.heading}</p>
              <ul className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="focus-hub block rounded-hub px-3 py-2 transition hover:bg-hub-teal-soft"
                    >
                      <span className="flex items-center gap-2 text-[0.95rem] font-bold text-ink-strong">
                        {link.label}
                        {link.badge ? (
                          <span className="rounded-full bg-hub-teal-soft px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-hub-teal-deep uppercase">
                            {link.badge}
                          </span>
                        ) : null}
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block text-sm text-ink-faint">{link.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setLoginOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setLoginOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-hub-navy-deep text-white" onMouseLeave={() => setOpenMenu(null)}>
      <div className="container-hub-wide flex h-[72px] items-center gap-6">
        <Link to="/" className="focus-hub shrink-0" aria-label="HUB24 home">
          <BrandLogo tone="light" />
        </Link>
        <DemoRibbon className="hidden border-white/20 text-white/80 sm:inline-flex" label="Unofficial demo" />

        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 lg:flex">
          {MEGA_MENUS.map((menu) => (
            <div key={menu.id} onMouseEnter={() => setOpenMenu(menu.id)}>
              <button
                type="button"
                className={cn(
                  "focus-hub inline-flex items-center gap-1 rounded-hub px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-white",
                  openMenu === menu.id && "bg-white/10 text-white",
                )}
                aria-expanded={openMenu === menu.id}
                onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
              >
                {menu.label}
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </button>
              {openMenu === menu.id ? <MegaMenuPanel menu={menu} onNavigate={() => setOpenMenu(null)} /> : null}
            </div>
          ))}
          {SIMPLE_NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="focus-hub rounded-hub px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              className="focus-hub inline-flex items-center gap-1 rounded-hub px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((value) => !value)}
            >
              Login
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
            {loginOpen ? (
              <div className="absolute top-full right-0 z-50 mt-2 w-72 rounded-hub-lg border border-line bg-white p-2 text-ink shadow-hub-menu">
                {LOGIN_OPTIONS.map((option) => (
                  <Link
                    key={option.to}
                    to={option.to}
                    className="focus-hub block rounded-hub px-3 py-2.5 hover:bg-hub-teal-soft"
                  >
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="text-xs text-ink-faint">{option.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <ButtonLink to="/contact" size="sm">
            Contact a BDM
          </ButtonLink>
        </div>

        <button
          type="button"
          className="focus-hub ml-auto rounded-hub p-2 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-hub-navy px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {MEGA_MENUS.flatMap((menu) => menu.columns.flatMap((column) => column.links))
              .slice(0, 12)
              .map((link) => (
                <Link key={link.to + link.label} to={link.to} className="focus-hub py-2 text-sm font-semibold">
                  {link.label}
                </Link>
              ))}
            <ButtonLink to="/login" className="mt-2">
              Login
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
