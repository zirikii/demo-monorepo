import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { NineLogo } from "@/components/brand/NineLogo";
import { primaryNav } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-nine-line bg-white/95 backdrop-blur">
      <div className="h-0.5 bg-gradient-to-r from-nine-cyan via-nine-blue to-nine-cyan" />
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="nine.com.au home" className="flex shrink-0 items-center gap-2.5 text-nine-ink">
          <NineLogo className="h-5 w-auto" aria-label="nine.com.au" />
          <DemoRibbon label="demo" />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "rounded-md px-2.5 py-1.5 text-sm font-semibold text-nine-ink no-underline transition-colors hover:bg-nine-wash hover:text-nine-blue",
                      active && "bg-nine-wash text-nine-blue",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <form onSubmit={onSearch} className="ml-auto hidden items-center gap-2 md:flex">
          <label className="sr-only" htmlFor="header-search">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-nine-muted" />
            <input
              id="header-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search nine.com.au"
              className="w-48 rounded-md border border-nine-line bg-nine-wash py-1.5 pl-8 pr-3 text-sm outline-none focus:border-nine-cyan lg:w-56"
            />
          </div>
        </form>

        <div className="hidden items-center gap-2 sm:flex">
          <Link to="/live" className="text-sm font-bold uppercase tracking-wide text-nine-live no-underline">
            Live
          </Link>
          {user ? (
            <Button to="/account" variant="secondary" size="sm">
              {user.name}
            </Button>
          ) : (
            <Button to="/login" size="sm">
              Sign in
            </Button>
          )}
        </div>

        <button
          type="button"
          className="ml-auto rounded-md p-2 text-nine-ink lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-nine-line bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="block rounded-md px-3 py-2 text-sm font-semibold no-underline hover:bg-nine-wash">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/live" className="block rounded-md px-3 py-2 text-sm font-bold text-nine-live no-underline">
                Live
              </Link>
            </li>
            <li>
              <Link to={user ? "/account" : "/login"} className="block rounded-md px-3 py-2 text-sm font-semibold no-underline hover:bg-nine-wash">
                {user ? "Account" : "Sign in"}
              </Link>
            </li>
          </ul>
          <form onSubmit={onSearch} className="mt-3 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="flex-1 rounded-md border border-nine-line px-3 py-2 text-sm"
            />
            <Button type="submit" size="sm">
              Go
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
