import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { LOGIN_OPTIONS, MEGA_MENUS, SIMPLE_NAV } from "@/data/nav";
import type { MegaMenu } from "@/data/types";
import { cn } from "@/lib/cn";

function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="animate-atl-fade absolute top-full left-0 z-40 w-screen border-t border-line bg-white shadow-atl-menu">
      <div className="container-atl-wide grid gap-8 py-9 lg:grid-cols-[0.9fr_2.1fr]">
        {menu.feature ? (
          <Link
            to={menu.feature.to}
            onClick={onNavigate}
            className="focus-atl flex flex-col justify-between gap-5 rounded-atl-lg bg-atl-navy-deep p-7 text-white transition hover:bg-atl-navy"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.14em] text-atl-sky uppercase">
                {menu.feature.eyebrow}
              </span>
              <span className="text-2xl font-extrabold tracking-tight">{menu.feature.title}</span>
              <span className="text-sm leading-relaxed text-white/70">{menu.feature.body}</span>
            </div>
            <span className="text-sm font-bold text-white underline underline-offset-4">
              {menu.feature.cta}
            </span>
          </Link>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="focus-atl block rounded-atl px-3 py-2 transition hover:bg-atl-tint"
                    >
                      <span className="flex items-center gap-2 text-[0.95rem] font-bold text-ink-strong">
                        {link.label}
                        {link.badge ? (
                          <span className="rounded-full bg-atl-tint px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-atl-blue uppercase">
                            {link.badge}
                          </span>
                        ) : null}
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block text-sm text-ink-faint">
                          {link.description}
                        </span>
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
          <div className="container-atl-wide flex flex-wrap gap-x-8 gap-y-2">
            {menu.footerLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={onNavigate}
                className="focus-atl text-sm font-bold text-atl-blue hover:underline"
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
      <div className="container-atl-wide flex h-16 items-center gap-5">
        <Link
          to="/"
          className="focus-atl inline-flex h-full shrink-0 items-center"
          aria-label="Atlassian home"
        >
          <BrandLogo showWordmark={false} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {MEGA_MENUS.map((menu) => (
            <Link
              key={menu.label}
              to={menu.to}
              aria-expanded={openMenu === menu.label}
              onMouseEnter={() => setOpenMenu(menu.label)}
              onFocus={() => setOpenMenu(menu.label)}
              className={cn(
                "focus-atl flex items-center gap-1 rounded-atl px-3.5 py-2 text-[0.95rem] font-normal transition",
                openMenu === menu.label
                  ? "bg-atl-tint text-atl-blue"
                  : "text-ink hover:text-atl-blue",
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
                  "focus-atl rounded-atl px-3.5 py-2 text-[0.95rem] font-normal transition",
                  isActive ? "text-atl-blue" : "text-ink hover:text-atl-blue",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DemoRibbon
            label="Unofficial demo"
            className="hidden border-line text-ink-faint xl:inline-flex"
          />

          <Link
            to="/resources"
            className="focus-atl hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-surface-tint md:inline-flex"
          >
            <Search aria-hidden className="h-4 w-4" />
            Search
          </Link>

          <div className="relative hidden md:block">
            <button
              type="button"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((open) => !open)}
              className="focus-atl flex items-center gap-1 rounded-atl-sm px-3.5 py-2 text-[0.95rem] font-medium text-ink transition hover:bg-surface-deep"
            >
              Sign in
              <ChevronDown
                aria-hidden
                className={cn("h-4 w-4 transition", loginOpen && "rotate-180")}
              />
            </button>
            {loginOpen ? (
              <div className="animate-atl-fade absolute right-0 z-40 mt-2 max-h-[min(28rem,70vh)] w-72 overflow-y-auto rounded-atl-lg border border-line bg-white shadow-atl-menu">
                {LOGIN_OPTIONS.map((option) => (
                  <Link
                    key={option.to}
                    to={option.to}
                    className="focus-atl block border-b border-line-soft px-5 py-4 transition last:border-b-0 hover:bg-atl-tint"
                  >
                    <span className="block text-[0.95rem] font-bold text-ink-strong">
                      {option.label}
                    </span>
                    <span className="block text-sm text-ink-faint">{option.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <ButtonLink to="/try" size="sm" className="hidden sm:inline-flex">
            Get started
          </ButtonLink>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-atl rounded-atl p-2 text-ink lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden className="h-6 w-6" />
            ) : (
              <Menu aria-hidden className="h-6 w-6" />
            )}
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
        <div className="animate-atl-fade max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="container-atl flex flex-col gap-6 py-6">
            {MEGA_MENUS.map((menu) => (
              <div key={menu.label} className="flex flex-col gap-2">
                <Link to={menu.to} className="focus-atl text-lg font-extrabold text-ink-strong">
                  {menu.label}
                </Link>
                <ul className="flex flex-col gap-1 border-l border-line pl-4">
                  {menu.columns
                    .flatMap((column) => column.links)
                    .map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          className="focus-atl block py-1.5 text-[0.95rem] text-ink-soft"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-line pt-4">
              {SIMPLE_NAV.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="focus-atl text-lg font-extrabold text-ink-strong"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" className="focus-atl text-lg font-extrabold text-ink-strong">
                Sign in
              </Link>
            </div>
            <ButtonLink to="/try" size="lg" className="w-full">
              Get started
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
