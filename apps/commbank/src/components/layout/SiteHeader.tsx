import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogIn, MapPin, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { logOnOptions, primaryNav, utilityNav } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [logOnOpen, setLogOnOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchId = useId();

  useEffect(() => {
    setOpenMenu(null);
    setLogOnOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setLogOnOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setLogOnOpen(false);
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

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-cba">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-cba focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Skip to main content
      </a>

      <div className="border-b border-line-soft bg-surface-tint">
        <div className="container-cba flex items-center justify-between gap-4 py-1.5">
          <DemoRibbon label="Unofficial demo" className="border-line text-ink-faint" />
          <nav aria-label="Utility" className="flex items-center gap-1">
            {utilityNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="focus-cba inline-flex items-center gap-1.5 rounded-cba px-2 py-1 text-[13px] font-semibold text-ink-soft hover:text-ink hover:underline"
              >
                {item.label === "Locate us" ? (
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                ) : null}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div ref={navRef} className="container-cba flex items-center gap-4 py-3">
        <Link to="/" aria-label="CommBank home" className="focus-cba shrink-0">
          <img
            src="/brand/logo.svg"
            alt="CommBank"
            width={171}
            height={53}
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const open = openMenu === item.id;
              const active =
                location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => {
                      setLogOnOpen(false);
                      setOpenMenu(open ? null : item.id);
                    }}
                    className={cn(
                      "focus-cba flex items-center gap-1 rounded-cba px-3 py-2.5 text-[15px] font-semibold transition-colors",
                      open || active
                        ? "text-ink underline decoration-cba-yellow decoration-4 underline-offset-8"
                        : "text-ink hover:underline",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                    />
                  </button>

                  {open ? (
                    <div className="absolute left-0 top-full z-50 mt-1 w-[min(92vw,880px)] animate-fade-in rounded-cba-lg border border-line-soft bg-surface p-6 shadow-cba-menu">
                      <div className="mb-4 flex items-center justify-between border-b border-line-soft pb-3">
                        <Link
                          to={item.to}
                          className="focus-cba text-base font-bold text-ink underline underline-offset-4"
                        >
                          All {item.label.toLowerCase()}
                        </Link>
                      </div>
                      <div
                        className={cn("grid gap-6", item.feature ? "lg:grid-cols-[1fr_260px]" : "")}
                      >
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {item.columns.map((column) => (
                            <div key={column.heading}>
                              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                                {column.heading}
                              </p>
                              <ul className="space-y-1">
                                {column.links.map((link) => (
                                  <li key={`${column.heading}-${link.label}`}>
                                    <Link
                                      to={link.to}
                                      className="focus-cba block rounded-cba px-1.5 py-1 text-[14px] text-ink-soft hover:bg-surface-tint hover:text-ink"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {item.feature ? (
                          <div className="rounded-cba-md bg-cba-yellow-tint p-4">
                            <p className="text-sm font-bold text-ink">{item.feature.title}</p>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                              {item.feature.body}
                            </p>
                            <Link
                              to={item.feature.to}
                              className="focus-cba mt-3 inline-block rounded-full bg-cba-yellow px-4 py-2 text-[13px] font-bold text-ink hover:bg-cba-yellow-dark"
                            >
                              {item.feature.cta}
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-expanded={searchOpen}
            aria-controls={searchId}
            aria-label="Search CommBank"
            onClick={() => setSearchOpen((value) => !value)}
            className="focus-cba rounded-full p-2 text-ink hover:bg-surface-tint"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              aria-expanded={logOnOpen}
              aria-haspopup="true"
              onClick={() => {
                setOpenMenu(null);
                setLogOnOpen((value) => !value);
              }}
              className="focus-cba inline-flex items-center gap-1.5 rounded-full bg-cba-yellow px-5 py-2.5 text-[15px] font-bold text-ink hover:bg-cba-yellow-dark"
            >
              {user ? "My accounts" : "Log on"}
              <ChevronDown
                aria-hidden="true"
                className={cn("h-4 w-4 transition-transform", logOnOpen && "rotate-180")}
              />
            </button>
            {logOnOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 animate-fade-in rounded-cba-md border border-line-soft bg-surface p-2 shadow-cba-menu">
                {user ? (
                  <Link
                    to="/netbank"
                    className="focus-cba flex items-center gap-2 rounded-cba px-3 py-2.5 text-sm font-bold text-ink hover:bg-surface-tint"
                  >
                    <LogIn aria-hidden="true" className="h-4 w-4" />
                    Go to NetBank
                  </Link>
                ) : null}
                {logOnOptions.map((option) => (
                  <Link
                    key={option.label}
                    to={option.to}
                    className="focus-cba block rounded-cba px-3 py-2.5 hover:bg-surface-tint"
                  >
                    <span className="block text-sm font-bold text-ink">{option.label}</span>
                    <span className="block text-[13px] text-ink-faint">{option.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
            className="focus-cba rounded-full p-2 text-ink hover:bg-surface-tint xl:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id={searchId} className="border-t border-line-soft bg-surface-tint py-4">
          <form
            className="container-cba flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const query = String(data.get("q") ?? "").trim();
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }}
          >
            <label className="sr-only" htmlFor="site-search">
              Search CommBank
            </label>
            <input
              id="site-search"
              name="q"
              placeholder="Search products, rates and support"
              className="focus-cba w-full rounded-full border border-line bg-surface px-4 py-2.5 text-[15px]"
            />
            <button
              type="submit"
              className="focus-cba shrink-0 rounded-full bg-ink px-6 py-2.5 text-[15px] font-bold text-surface hover:bg-ink-strong"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="border-t border-line-soft bg-surface xl:hidden">
          <nav aria-label="Mobile" className="container-cba py-3">
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className="focus-cba block rounded-cba px-3 py-3 text-[15px] font-bold text-ink hover:bg-surface-tint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {utilityNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="focus-cba block rounded-cba px-3 py-3 text-[15px] text-ink-soft hover:bg-surface-tint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
