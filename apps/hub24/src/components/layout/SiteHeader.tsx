import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { LOGIN_OPTIONS, MEGA_MENUS, SIMPLE_NAV } from "@/data/nav";
import type { MegaMenu } from "@/data/types";
import { cn } from "@/lib/cn";

function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate: () => void }) {
  return (
    <div className="animate-h24-fade absolute top-full left-0 z-40 w-screen border-t border-line bg-white shadow-h24-menu">
      <div className="container-h24-wide grid gap-8 py-9 lg:grid-cols-[0.85fr_2.15fr]">
        {menu.feature ? (
          <Link
            to={menu.feature.to}
            onClick={onNavigate}
            className="focus-h24 flex flex-col justify-between gap-5 rounded-h24-lg bg-h24-navy p-7 text-white transition hover:bg-h24-navy-deep"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.16em] text-h24-aqua uppercase">
                {menu.feature.eyebrow}
              </span>
              <span className="font-display text-2xl font-semibold">{menu.feature.title}</span>
              <span className="text-sm leading-relaxed text-h24-sky">{menu.feature.body}</span>
            </div>
            <span className="text-sm font-semibold text-h24-aqua underline underline-offset-4">
              {menu.feature.cta}
            </span>
          </Link>
        ) : null}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="focus-h24 block rounded-h24 px-3 py-2 transition hover:bg-h24-tint"
                    >
                      <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink-strong">
                        {link.label}
                        {link.badge ? (
                          <span className="rounded-full bg-h24-tint px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-h24-teal-dark uppercase">
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
          <div className="container-h24-wide flex flex-wrap gap-x-8 gap-y-2">
            {menu.footerLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={onNavigate}
                className="focus-h24 text-sm font-semibold text-h24-teal-dark hover:underline"
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
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="hidden border-b border-line-soft bg-h24-navy text-white lg:block">
        <div className="container-h24-wide flex h-9 items-center justify-end gap-6 text-xs">
          <DemoRibbon label="Unofficial demo" className="border-white/25 text-h24-aqua" />
          <span className="text-h24-sky">Advisers 1300 854 994</span>
          <span className="text-h24-sky">Investors 1300 508 797</span>
          <Link to="/shareholder-centre/overview/" className="focus-h24 font-semibold hover:underline">
            ASX:HUB
          </Link>
        </div>
      </div>

      <div className="container-h24-wide flex h-[76px] items-center gap-6">
        <Link to="/" className="focus-h24 shrink-0" aria-label="HUB24 home">
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
                "focus-h24 flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition",
                openMenu === menu.label
                  ? "bg-h24-tint text-h24-teal-dark"
                  : "text-ink hover:text-h24-teal-dark",
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
                  "focus-h24 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition",
                  isActive ? "text-h24-teal-dark" : "text-ink hover:text-h24-teal-dark",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <form
            role="search"
            className="hidden items-center xl:flex"
            onSubmit={(event) => {
              event.preventDefault();
              if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            }}
          >
            <label htmlFor="site-search" className="sr-only">
              Search hub24.com.au
            </label>
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-ghost"
              />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                className="focus-h24 w-40 rounded-full border border-line bg-surface-tint py-2 pr-3 pl-9 text-sm transition focus:w-52 focus:border-h24-teal"
              />
            </div>
          </form>

          <div className="relative hidden md:block">
            <button
              type="button"
              aria-expanded={loginOpen}
              onClick={() => setLoginOpen((open) => !open)}
              className="focus-h24 flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold text-ink transition hover:text-h24-teal-dark"
            >
              Log in
              <ChevronDown aria-hidden className={cn("h-4 w-4 transition", loginOpen && "rotate-180")} />
            </button>
            {loginOpen ? (
              <div className="animate-h24-fade absolute right-0 z-40 mt-2 w-72 overflow-hidden rounded-h24-lg border border-line bg-white shadow-h24-menu">
                {LOGIN_OPTIONS.map((option) => (
                  <Link
                    key={option.to}
                    to={option.to}
                    className="focus-h24 block border-b border-line-soft px-5 py-4 transition last:border-b-0 hover:bg-h24-tint"
                  >
                    <span className="block text-[0.95rem] font-semibold text-ink-strong">
                      {option.label}
                    </span>
                    <span className="block text-sm text-ink-faint">{option.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <ButtonLink to="/contact-us/" size="sm" className="hidden sm:inline-flex">
            Contact us
          </ButtonLink>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="focus-h24 rounded-full p-2 text-ink lg:hidden"
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
        <div className="animate-h24-fade max-h-[calc(100vh-76px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="container-h24 flex flex-col gap-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="focus-h24 rounded-full p-1 text-ink-faint"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            {MEGA_MENUS.map((menu) => (
              <div key={menu.label} className="flex flex-col gap-2">
                <Link to={menu.to} className="focus-h24 font-display text-lg font-semibold text-ink-strong">
                  {menu.label}
                </Link>
                <ul className="flex flex-col gap-1 border-l border-line pl-4">
                  {menu.columns
                    .flatMap((column) => column.links)
                    .map((link) => (
                      <li key={link.to + link.label}>
                        <Link to={link.to} className="focus-h24 block py-1.5 text-[0.95rem] text-ink-soft">
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
                  className="focus-h24 font-display text-lg font-semibold text-ink-strong"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" className="focus-h24 font-display text-lg font-semibold text-ink-strong">
                Log in
              </Link>
            </div>
            <ButtonLink to="/contact-us/" size="lg" className="w-full">
              Contact us
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
