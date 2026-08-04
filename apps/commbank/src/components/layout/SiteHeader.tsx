import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, MapPin, Menu, Search, User, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { CommBankLogo } from "@/components/brand/CommBankLogo";
import { logonOptions, popularSearches, primaryNav, utilityNav } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [logonOpen, setLogonOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoff } = useAuth();
  const searchPanelId = useId();

  useEffect(() => {
    setOpenMenu(null);
    setLogonOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setLogonOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setLogonOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-surface shadow-[0_1px_0_#e3e3e3]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="border-b border-line bg-surface-tint">
        <div className="container-page flex items-center justify-between gap-4 py-1.5">
          <DemoRibbon label="Unofficial demo" className="border-line text-[10px] text-ink-muted" />
          <ul className="flex items-center gap-4 text-xs font-semibold text-ink-soft">
            {utilityNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="focus-ring rounded hover:text-black">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex items-center gap-4 py-3">
        <Link to="/" aria-label="CommBank homepage" className="focus-ring shrink-0 rounded">
          <CommBankLogo />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 xl:block">
          <ul className="flex items-center justify-center">
            {primaryNav.map((item) => {
              const open = openMenu === item.id;
              const active = location.pathname.startsWith(item.to);
              return (
                <li key={item.id} className="static">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.id)}
                    className={cn(
                      "focus-ring relative flex items-center gap-0.5 whitespace-nowrap px-2.5 py-4 text-[13px] font-semibold transition-colors",
                      active || open ? "text-black" : "text-ink-soft hover:text-black",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")}
                    />
                    {active || open ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2 bottom-0 h-1 rounded-t bg-cba-yellow"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-expanded={searchOpen}
            aria-controls={searchPanelId}
            aria-label="Search"
            onClick={() => setSearchOpen((value) => !value)}
            className="focus-ring rounded-full p-2.5 text-ink-soft hover:bg-surface-grey hover:text-black"
          >
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <>
              <Link
                to="/netbank"
                className="focus-ring hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink sm:inline-flex"
              >
                <User aria-hidden="true" className="h-4 w-4" />
                NetBank
              </Link>
              <button
                type="button"
                onClick={() => {
                  logoff();
                  navigate("/");
                }}
                className="focus-ring hidden items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-semibold text-ink-soft hover:text-black sm:inline-flex"
              >
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Log off
              </button>
            </>
          ) : (
            <div className="relative hidden sm:block">
              <button
                type="button"
                aria-expanded={logonOpen}
                aria-haspopup="true"
                onClick={() => setLogonOpen((value) => !value)}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink"
              >
                Log on
                <ChevronDown
                  aria-hidden="true"
                  className={cn("h-3.5 w-3.5 transition-transform", logonOpen && "rotate-180")}
                />
              </button>
              {logonOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 animate-fade-in rounded-xl border border-line bg-surface p-2 shadow-float">
                  {logonOptions.map((option) => (
                    <Link
                      key={option.to}
                      to={option.to}
                      className="focus-ring block rounded-lg px-3 py-2.5 hover:bg-surface-grey"
                    >
                      <span className="block text-sm font-semibold text-black">{option.label}</span>
                      <span className="block text-xs text-ink-muted">{option.description}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
            className="focus-ring rounded-full p-2.5 text-black xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {openMenu ? (
        <div className="absolute inset-x-0 top-full hidden animate-fade-in border-t border-line bg-surface shadow-float xl:block">
          {primaryNav
            .filter((item) => item.id === openMenu)
            .map((item) => (
              <div key={item.id} className="container-page py-8">
                <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                  <h2 className="text-lg font-bold text-black">{item.label}</h2>
                  <Link
                    to={item.to}
                    className="focus-ring rounded text-sm font-semibold text-black underline underline-offset-4"
                  >
                    View all {item.label.toLowerCase()}
                  </Link>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {item.columns.map((column) => (
                    <div key={column.heading}>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                        {column.heading}
                      </p>
                      <ul className="space-y-1">
                        {column.links.map((link) => (
                          <li key={`${column.heading}-${link.to}`}>
                            <Link
                              to={link.to}
                              className="focus-ring block rounded px-2 py-1.5 text-sm text-ink-soft hover:bg-surface-grey hover:text-black"
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
            ))}
        </div>
      ) : null}

      {searchOpen ? (
        <div id={searchPanelId} className="animate-fade-in border-t border-line bg-surface py-6">
          <div className="container-page">
            <form onSubmit={submitSearch} className="flex gap-2">
              <label htmlFor="site-search" className="sr-only">
                Search CommBank
              </label>
              <input
                id="site-search"
                name="q"
                autoFocus
                placeholder="Search CommBank. Type a search term then press Enter."
                className="w-full rounded-lg border border-line-strong px-4 py-3 text-base outline-none focus:border-black focus:ring-2 focus:ring-black/15"
              />
              <button
                type="submit"
                className="focus-ring rounded-full bg-cba-yellow px-6 py-3 text-sm font-semibold text-black hover:bg-cba-yellow-deep"
              >
                Search
              </button>
            </form>
            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
              Popular searches
            </p>
            <ul className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="focus-ring inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft hover:border-black hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <nav
          aria-label="Mobile"
          className="max-h-[70vh] overflow-y-auto border-t border-line bg-surface xl:hidden"
        >
          <ul className="container-page divide-y divide-line py-2">
            {primaryNav.map((item) => (
              <li key={item.id} className="py-1">
                <Link
                  to={item.to}
                  className="focus-ring block rounded px-2 py-3 text-base font-semibold text-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                to="/locate-us"
                className="focus-ring inline-flex items-center gap-2 rounded px-2 py-2 text-sm font-semibold text-ink-soft"
              >
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Locate us
              </Link>
            </li>
            <li className="py-3">
              <Link
                to={user ? "/netbank" : "/logon"}
                className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                {user ? "Go to NetBank" : "Log on to NetBank"}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
