import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { cn } from "@/lib/cn";
import { navMenus } from "@/data/nav";
import { SquizLogo } from "@/components/brand/SquizLogo";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Close menus whenever the route changes.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 border-b border-cream-deep/60 bg-cream/85 backdrop-blur-md">
      <div ref={navRef} className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" aria-label="Squiz home" className="flex shrink-0 items-center gap-3 text-navy">
          <SquizLogo className="header-logo__image" />
          <DemoRibbon label="demo" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {navMenus.map((menu) => (
              <li key={menu.label}>
                <button
                  type="button"
                  aria-expanded={openMenu === menu.label}
                  onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:bg-cream-deep/50",
                    openMenu === menu.label && "bg-cream-deep/50",
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

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/contact"
            className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
          >
            Log In
          </Link>
          <Button to="/book-a-call" size="sm">
            Book a call
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-navy hover:bg-cream-deep/50 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        {navMenus.map(
          (menu) =>
            openMenu === menu.label && <MegaMenu key={menu.label} menu={menu} onClose={() => setOpenMenu(null)} />,
        )}
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
