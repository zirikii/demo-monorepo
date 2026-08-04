import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, MapPin, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { primaryNav, utilityLinks } from "@/data/nav";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";
export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
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
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-card/95 backdrop-blur">
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-xs text-ink-soft sm:px-6">
          <div className="flex items-center gap-3">
            {utilityLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hidden hover:text-cba-blue sm:inline">
                {link.label}
              </Link>
            ))}
            <DemoRibbon label="Unofficial demo" className="border-line text-ink-faint" />
          </div>
          <Link to="/find-us" className="inline-flex items-center gap-1 font-semibold hover:text-cba-blue">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            Find us
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="CommBank home" className="shrink-0">
          <img
            src="/brand/commbank-logo.svg"
            alt="CommBank"
            className="h-8 w-auto sm:h-9"
            data-testid="brand-logo"
          />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden flex-1 xl:block">
          <ul className="flex items-center justify-center gap-0.5">
            {primaryNav.map((item) => {
              const open = openMenu === item.id;
              const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.id)}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-2.5 py-2 text-[13px] font-bold transition-colors",
                      open || active ? "text-cba-blue" : "text-ink hover:text-cba-blue",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                    />
                  </button>
                  {open ? (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,760px)] -translate-x-1/2 animate-slide-down rounded-xl border border-line bg-card p-5 shadow-float">
                      <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
                        <Link to={item.to} className="text-sm font-black text-cba-blue hover:underline">
                          {item.label}
                        </Link>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                                    className="block rounded px-1 py-1 text-sm text-ink-soft hover:bg-cba-yellow-soft hover:text-ink"
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

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md p-2 text-ink hover:bg-surface"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>
          {user ? (
            <Link
              to="/netbank"
              className="hidden rounded-md border border-line bg-card px-3 py-2 text-sm font-semibold text-ink hover:bg-surface sm:inline-flex"
            >
              NetBank
            </Link>
          ) : null}
          <Link
            to={user ? "/netbank" : "/login"}
            className="inline-flex items-center justify-center rounded-md bg-cba-yellow px-4 py-2 text-sm font-bold text-cba-black hover:bg-cba-yellow-deep"
          >
            {user ? "My accounts" : "Log on"}
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-ink hover:bg-surface xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-line bg-card px-4 py-3 sm:px-6">
          <label htmlFor={searchId} className="sr-only">
            Search CommBank
          </label>
          <input
            id={searchId}
            type="search"
            placeholder="Search products, help topics…"
            className="mx-auto block w-full max-w-6xl rounded-md border border-line px-3 py-2.5 text-sm"
          />
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="border-t border-line bg-card xl:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl space-y-2 px-4 py-4">
            {primaryNav.map((item) => (
              <div key={item.id} className="border-b border-line pb-2">
                <Link to={item.to} className="block py-2 text-sm font-bold text-ink">
                  {item.label}
                </Link>
                <div className="grid gap-1 pl-2">
                  {item.columns.flatMap((c) => c.links).map((link) => (
                    <Link key={link.to + link.label} to={link.to} className="py-1 text-sm text-ink-soft">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
