import { DemoRibbon } from "@demo/ui";
import { ChevronDown, MapPin, Menu, Search, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation, publicPages } from "@/data/publicPages";
import { cn } from "@/lib/cn";

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-cba-ink text-xs text-white">
        <div className="container-page flex min-h-9 items-center justify-between gap-3">
          <nav aria-label="Audience">
            <ul className="flex gap-4">
              <li><a className="font-semibold text-cba-yellow" href="#main">Personal</a></li>
              <li><Link to="/business">Business</Link></li>
              <li><Link to="/about">Institutional</Link></li>
            </ul>
          </nav>
          <div className="hidden items-center gap-4 sm:flex">
            <Link className="flex items-center gap-1" to="/locations">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> Locate us
            </Link>
            <Link to="/support">Help</Link>
            <Link className="flex items-center gap-1" to="/search">
              <Search aria-hidden="true" className="h-3.5 w-3.5" /> Search
            </Link>
          </div>
        </div>
      </div>
      <div className="container-page flex h-[72px] items-center gap-7">
        <Link className="flex shrink-0 items-center gap-3" to="/" aria-label="CommBank demo home">
          <img className="h-10 w-[54px] object-cover object-left sm:h-11 sm:w-auto" src="/brand/commbank-logo.svg" alt="CommBank" />
          <DemoRibbon className="hidden border-cba-line sm:inline-flex" label="Unofficial demo" />
        </Link>
        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 lg:flex">
          <div className="relative">
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((value) => !value)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-cba-neutral"
            >
              Products <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
            {productsOpen ? (
              <div className="absolute left-0 top-full mt-2 grid w-[560px] grid-cols-2 gap-1 rounded-2xl border border-cba-line bg-white p-4 shadow-float">
                {publicPages.slice(0, 12).map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="rounded-lg px-3 py-2 text-sm hover:bg-cba-neutral"
                  >
                    <span className="block font-semibold">{page.title}</span>
                    <span className="text-xs text-cba-muted">{page.eyebrow}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {navigation.slice(2).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold hover:bg-cba-neutral",
                  isActive && "bg-cba-neutral",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link className="hidden items-center gap-1 text-sm font-semibold md:flex" to="/support/security">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Banking safely
          </Link>
          <Link className="rounded-full bg-cba-yellow px-5 py-2.5 text-sm font-bold" to="/netbank/logon">
            Log on
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg p-2 lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav aria-label="Mobile" className="border-t border-cba-line bg-white px-5 py-4 lg:hidden">
          <ul className="grid max-h-[65vh] grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2">
            {[...navigation, { label: "Search", to: "/search" }, { label: "Locate us", to: "/locations" }].map(
              (item) => (
                <li key={item.to}>
                  <NavLink className="block rounded-lg px-3 py-2.5 font-medium hover:bg-cba-neutral" to={item.to}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
