import { DemoRibbon } from "@demo/ui";
import { ChevronDown, CircleUserRound, MapPin, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MAIN_MENU_LINKS, REGIONS, regionLabel } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { useRegion } from "@/hooks/useRegion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CategoryNav } from "./CategoryNav";

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

export function SearchBox({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [query, setQuery] = useState(() => new URLSearchParams(search).get("q") ?? "");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/whats-on");
  };
  return (
    <form role="search" onSubmit={submit} className={cn("relative", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search events, artists, teams or venues
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search events, artists, teams or venues"
        autoFocus={autoFocus}
        className="h-10 w-full rounded-full border-0 bg-white pl-4 pr-11 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-tk-pink"
      />
      <button type="submit" aria-label="Search" className="absolute right-1 top-1 grid size-8 place-items-center rounded-full bg-midnight text-white hover:bg-tk-blue">
        <Search className="size-4" aria-hidden />
      </button>
    </form>
  );
}

function RegionMenu() {
  const { region, setRegion } = useRegion();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
      >
        <MapPin className="size-4" aria-hidden />
        <span className="hidden lg:inline">{regionLabel(region)}</span>
        <ChevronDown className="size-3.5" aria-hidden />
      </button>
      {open && (
        <ul role="listbox" aria-label="Choose your region" className="absolute right-0 z-50 mt-2 w-48 animate-fade-in overflow-hidden rounded-tk bg-white py-1 text-sm text-ink shadow-tk-lift">
          {REGIONS.map((r) => (
            <li key={r.id} role="option" aria-selected={r.id === region}>
              <button
                type="button"
                onClick={() => {
                  setRegion(r.id);
                  setOpen(false);
                }}
                className={cn("flex w-full items-center justify-between px-4 py-2 text-left hover:bg-page", r.id === region && "font-semibold text-tk-blue")}
              >
                {r.label}
                {r.id === region && <span className="size-2 rounded-full bg-tk-pink" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MainMenu() {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const { user, logout } = useAuth();
  const { region, setRegion } = useRegion();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Menu"
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        <span className="hidden lg:inline">Menu</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-72 animate-fade-in overflow-hidden rounded-tk bg-white text-ink shadow-tk-lift">
          {user ? (
            <div className="border-b border-line-soft bg-page px-4 py-3 text-sm">
              Signed in as <span className="font-semibold">{user.firstName} {user.lastName}</span>
            </div>
          ) : (
            <div className="flex gap-2 border-b border-line-soft p-4">
              <Link to="/login" className="btn-primary flex-1 py-2">
                Sign in
              </Link>
              <Link to="/signup" className="btn-outline flex-1 py-2">
                Sign up
              </Link>
            </div>
          )}
          <nav aria-label="Main menu" className="py-1">
            {MAIN_MENU_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }: { isActive: boolean }) => cn("block px-4 py-2.5 text-sm hover:bg-page", isActive && "font-semibold text-tk-blue")}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-line-soft px-4 py-3">
            <label htmlFor="menu-region" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Region
            </label>
            <select id="menu-region" value={region} onChange={(e) => setRegion(e.target.value as typeof region)} className="field py-2">
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {user && (
            <button type="button" onClick={logout} className="w-full border-t border-line-soft px-4 py-3 text-left text-sm font-medium text-critical hover:bg-page">
              Sign out
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setSearchOpen(false), [pathname]);
  return (
    <header className="sticky top-0 z-40 bg-midnight text-white">
      <div className="container-tk flex h-16 items-center gap-3 md:gap-6">
        <Link to="/" className="shrink-0" aria-label="Ticketek home">
          <img src={asset("brand/ticketek-logo-white.svg")} alt="Ticketek" className="h-7 w-auto md:h-8" />
        </Link>
        <DemoRibbon label="Unofficial demo" className="hidden shrink-0 border-white/25 text-white/75 lg:inline-flex" />
        <SearchBox className="hidden flex-1 md:block md:max-w-xl" />
        <div className="ml-auto flex items-center gap-0.5">
          <button type="button" onClick={() => setSearchOpen((o) => !o)} aria-label="Search" className="grid size-10 place-items-center rounded-full hover:bg-white/10 md:hidden">
            <Search className="size-5" aria-hidden />
          </button>
          <RegionMenu />
          <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10">
            <CircleUserRound className="size-5" aria-hidden />
            <span className="hidden lg:inline">{user ? `Hi, ${user.firstName}` : "Sign in"}</span>
          </Link>
          <Link to="/cart" aria-label="Cart" className="grid size-10 place-items-center rounded-full hover:bg-white/10">
            <ShoppingCart className="size-5" aria-hidden />
          </Link>
          <MainMenu />
        </div>
      </div>
      {searchOpen && (
        <div className="container-tk pb-3 md:hidden">
          <SearchBox autoFocus />
        </div>
      )}
      <CategoryNav />
    </header>
  );
}
