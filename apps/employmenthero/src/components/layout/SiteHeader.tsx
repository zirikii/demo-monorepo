import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { LOGIN_OPTIONS, MEGA_MENUS, SIMPLE_NAV } from "@/data/nav";
import type { MegaMenu } from "@/data/types";
import { cn } from "@/lib/cn";

function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="animate-eh-fade absolute top-full left-0 z-40 w-screen border-t border-line bg-white shadow-eh-menu">
      <div className="container-eh-wide grid gap-8 py-9 lg:grid-cols-[0.9fr_2.1fr]">
        {menu.feature ? (
          <Link
            to={menu.feature.to}
            onClick={onNavigate}
            className="focus-eh flex flex-col justify-between gap-5 rounded-eh-lg bg-eh-purple-deep p-7 text-white transition hover:bg-eh-purple-night"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-extrabold tracking-[0.14em] text-eh-violet-soft uppercase">
                {menu.feature.eyebrow}
              </span>
              <span className="text-2xl font-extrabold tracking-tight">{menu.feature.title}</span>
              <span className="text-sm leading-relaxed text-eh-violet-soft">{menu.feature.body}</span>
            </div>
            <span className="text-sm font-bold text-white underline underline-offset-4">
              {menu.feature.cta}
            </span>
          </Link>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-ghost uppercase">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="focus-eh block rounded-eh px-3 py-2 transition hover:bg-eh-tint"
                    >
                      <span className="flex items-center gap-2 text-[0.95rem] font-bold text-ink-strong">
                        {link.label}
                        {link.badge ? (
                          <span className="rounded-full bg-eh-tint px-2 py-0.5 text-[0.65rem] font-extrabold tracking-wide text-eh-purple uppercase">
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

      {menu.footerLinks ? (
        <div className="border-t border-line bg-surface-tint py-4">
          <div className="container-eh-wide flex flex-wrap gap-x-8 gap-y-2">
            {menu.footerLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={onNavigate}
                className="focus-eh text-sm font-bold text-eh-purple hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
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
    <header
      className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="container-eh-wide flex h-[72px] items-center gap-6">
        <Link to="/" className="focus-eh shrink-0" aria-label="Employment Hero home">
          <BrandLogo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {MEGA_MENUS.map((menu) => (
            <Link
              key={menu.label}
              to={menu.to}
              aria-expanded={openMenu === menu.label}
              onMouseEnter={() => setOpenMenu(menu.label)}
              onFocus={() => setOpenMenu(menu.label)}
              className={cn(
                "focus-eh flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-bold transition",
                openMenu === menu.label ? "bg-eh-tint text-eh-purple" : "text-ink hover:text-eh-purple",
              )}
            >
              {menu.label}
              <ChevronDown
                aria-hidden
                className={cn("h-4 w-4 transition", openMenu === menu.label && "rotate-180")}
              />
            </Link>
          ))}
          {SIMPLE_NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-eh rounded-full px-3.5 py-2 text-[0.95rem] font-bold transition",
                  isActive ? "text-eh-purple" : "text-ink hover:text-eh-purple",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DemoRibbon label="Unofficial demo" className="hidden border-line text-ink-faint xl:inline-flex" />

          <div className="relative hidden md:block">
            <button
              type="button"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((open) => !open)}
              className="focus-eh flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-bold text-ink transition hover:text-eh-purple"
            >
              Log in
              <ChevronDown aria-hidden className={cn("h-4 w-4 transition", loginOpen && "rotate-180")} />
            </button>
            {loginOpen ? (
              <div className="animate-eh-fade absolute right-0 z-40 mt-2 w-72 overflow-hidden rounded-eh-lg border border-line bg-white shadow-eh-menu">
                {LOGIN_OPTIONS.map((option) => (
                  <Link
                    key={option.to}
                    to={option.to}
                    className="focus-eh block border-b border-line-soft px-5 py-4 transition last:border-b-0 hover:bg-eh-tint"
                  >
                    <span className="block text-[0.95rem] font-bold text-ink-strong">{option.label}</span>
                    <span className="block text-sm text-ink-faint">{option.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <ButtonLink to="/request-a-demo" size="sm" className="hidden sm:inline-flex">
            Request a demo
          </ButtonLink>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-eh rounded-full p-2 text-ink lg:hidden"
          >
            {mobileOpen ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {openMenu ? (
        <MegaMenuPanel
          menu={MEGA_MENUS.find((menu) => menu.label === openMenu)!}
          onNavigate={() => setOpenMenu(null)}
        />
      ) : null}

      {mobileOpen ? (
        <div className="animate-eh-fade max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="container-eh flex flex-col gap-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-[0.14em] text-ink-ghost uppercase">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="focus-eh rounded-full p-1 text-ink-faint"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            {MEGA_MENUS.map((menu) => (
              <div key={menu.label} className="flex flex-col gap-2">
                <Link to={menu.to} className="focus-eh text-lg font-extrabold text-ink-strong">
                  {menu.label}
                </Link>
                <ul className="flex flex-col gap-1 border-l border-line pl-4">
                  {menu.columns.flatMap((column) => column.links).map((link) => (
                    <li key={link.to + link.label}>
                      <Link to={link.to} className="focus-eh block py-1.5 text-[0.95rem] text-ink-soft">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-line pt-4">
              {SIMPLE_NAV.map((link) => (
                <Link key={link.to} to={link.to} className="focus-eh text-lg font-extrabold text-ink-strong">
                  {link.label}
                </Link>
              ))}
              <Link to="/login" className="focus-eh text-lg font-extrabold text-ink-strong">
                Log in
              </Link>
            </div>
            <ButtonLink to="/request-a-demo" size="lg" className="w-full">
              Request a demo
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
