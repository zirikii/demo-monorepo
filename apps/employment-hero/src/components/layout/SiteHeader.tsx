import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { loginOptions, navAudiences } from "@/data/nav";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  const active = navAudiences.find((audience) => audience.id === openMenu);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white">
      <div className="bg-eh-ink text-white">
        <div className="container-eh flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
          <Link to="/ai" className="focus-eh inline-flex items-center gap-2 hover:underline">
            <Sparkles size={14} className="text-eh-lime" />
            <span className="font-semibold">AI Employment Operating System</span>
            <span className="text-white/60">— read our AI commitment</span>
          </Link>
          <DemoRibbon label="Unofficial demo" className="border-white/25 text-white/80" />
        </div>
      </div>

      <div className="border-b border-eh-line">
        <div className="container-eh flex h-18 items-center justify-between gap-3 py-3">
          <Logo />

          <nav aria-label="Primary" className="hidden shrink-0 items-center gap-0.5 lg:flex">
            {navAudiences.map((audience) => (
              <button
                key={audience.id}
                type="button"
                aria-expanded={openMenu === audience.id}
                onClick={() => setOpenMenu(openMenu === audience.id ? null : audience.id)}
                className={cn(
                  "focus-eh inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition",
                  openMenu === audience.id
                    ? "bg-eh-purple-tint text-eh-purple"
                    : "text-eh-ink hover:bg-eh-surface-tint",
                )}
              >
                {audience.label}
                <ChevronDown
                  size={15}
                  className={cn("transition", openMenu === audience.id && "rotate-180")}
                />
              </button>
            ))}
            <Link
              to="/pricing"
              className="focus-eh rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-eh-ink transition hover:bg-eh-surface-tint"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className="focus-eh grid size-10 place-items-center rounded-full text-eh-ink transition hover:bg-eh-surface-tint"
            >
              <Search size={18} />
            </button>

            <div className="relative hidden md:block">
              <button
                type="button"
                aria-expanded={openMenu === "login"}
                onClick={() => setOpenMenu(openMenu === "login" ? null : "login")}
                className="focus-eh inline-flex items-center gap-1 rounded-full border border-eh-line px-4 py-2 text-sm font-semibold whitespace-nowrap text-eh-ink transition hover:border-eh-purple hover:text-eh-purple"
              >
                Log in
                <ChevronDown size={15} />
              </button>
              {openMenu === "login" ? (
                <div className="absolute right-0 mt-2 w-64 rounded-eh-md border border-eh-line bg-white p-2 shadow-eh-menu">
                  {loginOptions.map((option) => (
                    <Link
                      key={option.label}
                      to={option.to}
                      onClick={() => setOpenMenu(null)}
                      className="focus-eh block rounded-eh px-3 py-2.5 transition hover:bg-eh-purple-tint"
                    >
                      <span className="block text-sm font-semibold text-eh-ink">
                        {option.label}
                      </span>
                      <span className="block text-xs text-eh-ink-faint">{option.description}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <ButtonLink
              to="/request-a-demo"
              variant="secondary"
              size="sm"
              className="hidden xl:inline-flex"
            >
              Request a demo
            </ButtonLink>
            <ButtonLink to="/start-free" size="sm" className="hidden sm:inline-flex">
              Start free
            </ButtonLink>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="focus-eh grid size-10 place-items-center rounded-full text-eh-ink transition hover:bg-eh-surface-tint lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen ? (
          <div className="border-t border-eh-line bg-eh-surface-tint">
            <form onSubmit={submitSearch} className="container-eh flex gap-3 py-4">
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, resources and case studies"
                aria-label="Search the site"
                className="h-11 flex-1 rounded-full border border-eh-line bg-white px-5 text-sm outline-none focus:border-eh-purple"
              />
              <button
                type="submit"
                className="focus-eh h-11 rounded-full bg-eh-purple px-6 text-sm font-semibold text-white"
              >
                Search
              </button>
            </form>
          </div>
        ) : null}
      </div>

      {active ? (
        <div className="hidden border-b border-eh-line bg-white shadow-eh-menu lg:block">
          <div className="container-eh grid gap-8 py-8 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-eh-ink">{active.headline}</h2>
                  <p className="mt-1 text-sm text-eh-ink-soft">{active.blurb}</p>
                </div>
                <Link
                  to={active.cta.to}
                  onClick={() => setOpenMenu(null)}
                  className="focus-eh text-sm font-semibold text-eh-purple hover:underline"
                >
                  {active.cta.label} →
                </Link>
              </div>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {active.columns.map((column) => (
                  <div key={column.heading}>
                    <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
                      {column.heading}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {column.links.map((link) => (
                        <li key={link.to + link.label}>
                          <Link
                            to={link.to}
                            onClick={() => setOpenMenu(null)}
                            className="focus-eh group block rounded-eh px-2 py-1.5 transition hover:bg-eh-purple-tint"
                          >
                            <span className="flex items-center gap-2 text-sm font-semibold text-eh-ink group-hover:text-eh-purple">
                              {link.label}
                              {link.badge ? (
                                <span className="rounded-full bg-eh-lime px-2 py-0.5 text-[10px] font-bold text-eh-ink">
                                  {link.badge}
                                </span>
                              ) : null}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-xs text-eh-ink-faint">
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

            <Link
              to={active.featured.to}
              onClick={() => setOpenMenu(null)}
              className="focus-eh flex flex-col justify-between rounded-eh-lg bg-eh-purple p-6 text-white transition hover:bg-eh-purple-deep"
            >
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-eh-lime uppercase">
                  {active.featured.eyebrow}
                </p>
                <p className="mt-3 font-display text-2xl font-bold">{active.featured.title}</p>
                <p className="mt-2 text-sm text-white/80">{active.featured.body}</p>
              </div>
              <span className="mt-6 text-sm font-semibold">Learn more →</span>
            </Link>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto border-b border-eh-line bg-white lg:hidden">
          <div className="container-eh space-y-6 py-6">
            {navAudiences.map((audience) => (
              <div key={audience.id}>
                <p className="text-xs font-bold tracking-[0.14em] text-eh-purple uppercase">
                  {audience.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {audience.columns
                    .flatMap((column) => column.links)
                    .map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          className="focus-eh block rounded-eh px-2 py-2 text-sm font-medium text-eh-ink hover:bg-eh-surface-tint"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-eh-line pt-4">
              <Link
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="focus-eh rounded-eh px-2 py-2 text-sm font-semibold"
              >
                Pricing
              </Link>
              {loginOptions.map((option) => (
                <Link
                  key={option.label}
                  to={option.to}
                  onClick={() => setMobileOpen(false)}
                  className="focus-eh rounded-eh px-2 py-2 text-sm font-semibold"
                >
                  Log in — {option.label}
                </Link>
              ))}
              <ButtonLink to="/start-free" className="mt-2 w-full">
                Start free
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
