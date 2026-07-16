import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, CloudSun, Menu, Play, Search, User, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { brandFamily, primaryNav } from "@/data/nav";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchId = useId();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const submitSearch = (value: string) => {
    const q = value.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-card/95 backdrop-blur">
      <div className="border-b border-line-soft bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-soft sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="mr-1 hidden shrink-0 text-ink-faint sm:inline">The Nine network</span>
            {brandFamily.map((site) => (
              <Link
                key={site.label}
                to={site.to}
                className={cn(
                  "shrink-0 rounded px-2 py-1 transition-colors",
                  site.active ? "bg-nine-deep text-white" : "hover:text-nine-deep",
                )}
              >
                {site.label}
              </Link>
            ))}
          </div>
          <DemoRibbon
            label="Unofficial demo"
            className="hidden border-line text-ink-faint md:inline-flex"
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="nine.com.au home" className="shrink-0">
          <img src="/brand/logo.svg" alt="nine.com.au" className="h-6 w-auto sm:h-7" />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-0.5">
            {primaryNav.map((item) => {
              const open = openMenu === item.id;
              const active = location.pathname.startsWith(item.to);
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.id)}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold transition-colors",
                      open || active ? "text-nine-deep" : "text-ink hover:text-nine-deep",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                    />
                  </button>
                  {open ? (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,620px)] -translate-x-1/2 animate-fade-in rounded-xl border border-line bg-card p-5 shadow-float">
                      <div className="mb-3 border-b border-line pb-3">
                        <Link to={item.to} className="text-sm font-black text-nine-deep hover:underline">
                          All {item.label}
                        </Link>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-3">
                        {item.columns.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                              {col.heading}
                            </p>
                            <ul className="space-y-1">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    to={link.to}
                                    className="block rounded px-1 py-1 text-sm text-ink-soft hover:bg-surface hover:text-nine-deep"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <Link
            to="/weather"
            className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-ink-soft hover:bg-surface hover:text-ink md:inline-flex"
          >
            <CloudSun className="h-4 w-4" aria-hidden="true" />
            Weather
          </Link>
          <Link
            to="/video"
            className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-ink-soft hover:bg-surface hover:text-ink md:inline-flex"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Watch
          </Link>
          <button
            type="button"
            aria-expanded={searchOpen}
            aria-controls={searchId}
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md p-2 text-ink-soft hover:bg-surface hover:text-ink"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            className="inline-flex items-center gap-1.5 rounded-full bg-nine-deep px-3 py-1.5 text-sm font-semibold text-white hover:bg-nine-ink"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{user ? user.name : "Sign in"}</span>
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-ink lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id={searchId} className="border-t border-line bg-card px-4 py-3 sm:px-6">
          <form
            className="mx-auto flex max-w-[1200px] gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              submitSearch(String(data.get("q") || ""));
            }}
          >
            <label className="sr-only" htmlFor="header-search">
              Search nine.com.au
            </label>
            <input
              id="header-search"
              name="q"
              autoFocus
              placeholder="Search news, sport, lifestyle and more…"
              className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none ring-nine-deep focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-full bg-nine-deep px-5 py-2 text-sm font-semibold text-white hover:bg-nine-ink"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="border-t border-line bg-card lg:hidden">
          <ul className="mx-auto max-w-[1200px] space-y-1 px-4 py-3">
            {primaryNav.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="block rounded-md px-3 py-2.5 text-sm font-bold text-ink hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="grid grid-cols-2 gap-1 pt-1">
              <Link to="/weather" className="rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface">
                Weather
              </Link>
              <Link to="/video" className="rounded-md px-3 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface">
                Watch
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
