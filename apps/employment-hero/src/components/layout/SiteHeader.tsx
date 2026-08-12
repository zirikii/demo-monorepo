import { useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Globe2, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const location = useLocation();
  const navigate = useNavigate();

  const submitSearch = () => {
    const trimmed = query.trim();
    navigate(trimmed ? `/resources?search=${encodeURIComponent(trimmed)}` : "/resources");
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div className="border-b border-line bg-neutral-soft">
        <div className="container-hero flex min-h-9 items-center justify-between gap-4">
          <DemoRibbon label="Unofficial demo" className="border-line text-ink-soft" />
          <div className="flex items-center gap-4 text-xs font-semibold text-ink-soft">
            <Link to="/partners" className="focus-hero hidden rounded-full sm:inline">
              Partners
            </Link>
            <Link to="/contact" className="focus-hero hidden rounded-full sm:inline">
              Help
            </Link>
            <button
              type="button"
              className="focus-hero inline-flex items-center gap-1 rounded-full"
            >
              <Globe2 aria-hidden="true" className="h-3.5 w-3.5" /> Australia
            </button>
          </div>
        </div>
      </div>

      <div className="container-hero flex min-h-18 items-center gap-4">
        <Link to="/" aria-label="Employment Hero home" className="focus-hero shrink-0 rounded-md">
          <img src="/brand/logo.svg" alt="Employment Hero" className="h-8 w-auto" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(`${item.href}/`));
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-hero rounded-full px-3 py-2 text-sm font-semibold hover:bg-neutral-soft",
                    active && "bg-violet-soft",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            const open = openMenu === item.label;
            return (
              <div key={item.href} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenMenu(open ? null : item.label)}
                  className={cn(
                    "focus-hero inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold hover:bg-neutral-soft",
                    active && "bg-violet-soft",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                  />
                </button>
                {open ? (
                  <div className="absolute left-1/2 top-[calc(100%+1rem)] w-[560px] -translate-x-1/2 rounded-hero-lg border border-line bg-white p-4 shadow-menu">
                    <div className="grid grid-cols-2 gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="focus-hero rounded-hero p-4 hover:bg-violet-soft"
                        >
                          <span className="block text-sm font-bold">{child.label}</span>
                          <span className="mt-1 block text-xs leading-5 text-ink-soft">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((value) => !value)}
          className="focus-hero ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-soft lg:ml-1"
        >
          <Search aria-hidden="true" className="h-5 w-5" />
        </button>
        <Link
          to="/login"
          className="focus-hero hidden rounded-full px-2 text-sm font-bold sm:inline"
        >
          Log in
        </Link>
        <ButtonLink to="/book-a-demo" className="hidden xl:inline-flex">
          Book a demo
        </ButtonLink>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="focus-hero inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-soft lg:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {searchOpen ? (
        <div className="border-t border-line bg-white py-4">
          <form
            className="container-hero flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch();
            }}
          >
            <label htmlFor={searchId} className="sr-only">
              Search resources
            </label>
            <input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              placeholder="Search resources, guides and products"
              className="focus-hero min-h-12 flex-1 rounded-full border border-line px-5"
            />
            <button
              type="submit"
              className="focus-hero rounded-full bg-ink px-6 font-bold text-white"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav aria-label="Mobile" className="border-t border-line bg-white p-4 lg:hidden">
          <div className="grid gap-1">
            {primaryNav
              .flatMap((item) => item.children ?? [item])
              .map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="focus-hero rounded-hero px-4 py-3 text-sm font-bold hover:bg-violet-soft"
                >
                  {item.label}
                </Link>
              ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="focus-hero rounded-hero px-4 py-3 text-sm font-bold"
            >
              Log in
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
