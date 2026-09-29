import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, CircleUserRound, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { primaryNav, segments, type NavSection } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

function isSectionActive(section: NavSection, pathname: string) {
  return pathname === section.to || pathname.startsWith(`${section.to}/`);
}

function MegaMenu({ section, onNavigate }: { section: NavSection; onNavigate: () => void }) {
  return (
    <div className="absolute top-full left-0 z-40 mt-2 w-[min(640px,90vw)] animate-fade-in rounded-agl-lg bg-white p-6 shadow-agl-lift ring-1 ring-black/5">
      <div className="grid gap-6 sm:grid-cols-2">
        {section.columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-2 text-xs font-extrabold tracking-wider text-agl-teal-ink uppercase">{col.heading}</p>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} onClick={onNavigate} className="block rounded-agl px-3 py-2 hover:bg-agl-sky">
                    <span className="block font-bold text-ink">{link.label}</span>
                    {link.description && <span className="block text-sm text-ink-soft">{link.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link to={section.to} onClick={onNavigate} className="mt-4 inline-flex font-bold text-agl-blue hover:underline">
        View all {section.label.toLowerCase()} →
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/help?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const segmentActive = (to: string) => (to === "/" ? !["/business", "/about"].some((p) => pathname.startsWith(p)) : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_1px_0_var(--color-line-soft)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="hidden bg-surface-tint text-sm md:block">
        <div className="container-agl flex h-9 items-center justify-between">
          <nav aria-label="Customer type" className="flex h-full">
            {segments.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className={cn(
                  "flex h-full items-center border-b-2 px-3 font-semibold",
                  segmentActive(s.to) ? "border-agl-blue text-agl-blue" : "border-transparent text-ink-soft hover:text-agl-blue",
                )}
              >
                {s.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-ink-soft">
            <DemoRibbon label="Unofficial demo" className="border-line bg-white text-ink-soft" />
            <Link to="/help" className="font-semibold hover:text-agl-blue">
              Help & Support
            </Link>
            <Link to="/contact-us" className="font-semibold hover:text-agl-blue">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <div className="container-agl flex h-[72px] items-center gap-6" ref={navRef}>
        <Link to="/" aria-label="AGL home" className="shrink-0">
          <Logo className="h-11 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((section) => {
              const expanded = openMenu === section.label;
              return (
                <li key={section.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpenMenu(expanded ? null : section.label)}
                    className={cn(
                      "inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-bold transition-colors",
                      isSectionActive(section, pathname) || expanded ? "bg-agl-sky text-agl-blue" : "text-ink hover:text-agl-blue",
                    )}
                  >
                    {section.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
                  </button>
                  {expanded && <MegaMenu section={section} onNavigate={() => setOpenMenu(null)} />}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={submitSearch} role="search" className="hidden items-center md:flex">
              <label htmlFor="site-search" className="sr-only">
                Search AGL
              </label>
              <input
                id="site-search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help articles"
                className="h-10 w-56 rounded-full border border-line px-4 text-sm focus:border-agl-blue focus:outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="ml-1 rounded-full p-2 text-ink-soft hover:bg-surface-tint">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-agl-sky hover:text-agl-blue md:inline-flex"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          {user ? (
            <NavLink to="/account" className={buttonClasses("primary", "sm")}>
              <CircleUserRound className="h-4 w-4" aria-hidden="true" />
              My Account
            </NavLink>
          ) : (
            <Link to="/login" className={buttonClasses("primary", "sm")}>
              <CircleUserRound className="h-4 w-4" aria-hidden="true" />
              Log in
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-agl-sky lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t border-line-soft bg-white lg:hidden">
          <ul className="container-agl divide-y divide-line-soft py-2">
            {primaryNav.map((section) => (
              <li key={section.label}>
                <Link to={section.to} className="block py-3 font-bold text-ink">
                  {section.label}
                </Link>
              </li>
            ))}
            {segments.map((s) => (
              <li key={s.label}>
                <Link to={s.to} className="block py-3 text-ink-soft">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
