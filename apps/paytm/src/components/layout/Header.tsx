import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { navMenus } from "../../data/navigation";
import { cn } from "../../lib/cn";
import { SignInModal } from "../shared/SignInModal";
import { DownloadAppModal } from "../shared/DownloadAppModal";

/** Sticky white header: logo, five mega-menu groups, download + sign-in actions. */
export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" aria-label="Paytm home" className="flex shrink-0 items-center gap-2">
          <img src="/brand/paytm-upi-logo.svg" alt="Paytm and UPI" className="h-5 sm:h-6" />
          <DemoRibbon label="Demo" className="hidden border-hairline text-ink-soft lg:inline-flex" />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1">
            {navMenus.map((menu) => {
              const open = openMenu === menu.id;
              return (
                <li key={menu.id} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : menu.id)}
                    className={cn(
                      "flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors",
                      open ? "bg-surface text-paytm-cyan" : "text-paytm-navy hover:text-paytm-cyan",
                    )}
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                    />
                  </button>
                  {open ? (
                    <div className="absolute left-0 top-full z-50 mt-1 flex min-w-56 animate-fade-in gap-8 rounded-2xl border border-hairline bg-card p-5 shadow-float">
                      {menu.columns.map((col) => (
                        <div key={col.heading} className="min-w-40">
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                            {col.heading}
                          </p>
                          <ul className="space-y-1">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  to={link.to}
                                  className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-surface hover:text-paytm-cyan"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDownloadOpen(true)}
            className="hidden items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-paytm-navy hover:text-paytm-cyan md:flex"
          >
            <img src="/brand/icons/download-app.svg" alt="" aria-hidden="true" className="h-4 w-4" />
            Download App
          </button>
          <button
            type="button"
            onClick={() => setSignInOpen(true)}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-paytm-sky py-1.5 pl-1.5 pr-4 text-[13px] font-bold text-paytm-navy transition-colors hover:bg-paytm-cyan hover:text-white"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paytm-navy text-white">
              <User aria-hidden="true" className="h-4 w-4" />
            </span>
            Sign In
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-paytm-navy lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? <MobileMenu /> : null}
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
      <DownloadAppModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </header>
  );
}

function MobileMenu() {
  return (
    <nav aria-label="Mobile" className="border-t border-hairline bg-card lg:hidden">
      <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4">
        {navMenus.map((menu) => (
          <div key={menu.id}>
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
              {menu.label}
            </p>
            <ul className="grid grid-cols-2 gap-x-4">
              {menu.columns.flatMap((col) =>
                col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="block py-1.5 text-sm text-ink hover:text-paytm-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
