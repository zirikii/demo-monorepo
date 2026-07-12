import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { cn } from "@/lib/cn";
import { navMenus } from "@/data/nav";
import { ChangiLogo } from "@/components/brand/ChangiLogo";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, search } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus whenever the route changes.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname, search]);

  // Click-outside + Escape to close the mega menu.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-deep/70 bg-sand/90 backdrop-blur-md">
      <div
        ref={navRef}
        className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6"
      >
        <Link to="/" aria-label="Changi Airport home" className="flex shrink-0 items-center gap-3">
          <ChangiLogo />
          <DemoRibbon label="demo" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 xl:block">
          <ul className="flex items-center justify-center gap-0.5">
            {navMenus.map((menu) => (
              <li key={menu.label}>
                <button
                  type="button"
                  aria-expanded={openMenu === menu.label}
                  onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sand-deep/50",
                    openMenu === menu.label && "bg-sand-deep/50",
                  )}
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      openMenu === menu.label && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <Link
            to="/help"
            aria-label="Search"
            className="rounded-full p-2 text-ink hover:bg-sand-deep/50"
          >
            <Search className="size-5" aria-hidden />
          </Link>
          <Button to="/rewards" size="sm">
            Changi Rewards
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto rounded-full p-2 text-ink hover:bg-sand-deep/50 xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {navMenus.map(
          (menu) =>
            openMenu === menu.label && (
              <MegaMenu key={menu.label} menu={menu} onClose={() => setOpenMenu(null)} />
            ),
        )}
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
