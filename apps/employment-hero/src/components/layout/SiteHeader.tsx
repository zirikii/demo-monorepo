import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { ButtonLink } from "@/components/ui/Button";
import { loginPortals, primaryNav } from "@/data/nav";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-eh flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="focus-eh shrink-0" aria-label="Employment Hero home">
            <img src="/brand/logo.svg" alt="Employment Hero" className="h-8 w-auto" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <NavLink
                  to={group.to ?? group.children[0]?.to ?? "/"}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "focus-eh inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft hover:bg-surface-soft hover:text-ink",
                      isActive && "text-eh-purple",
                    )
                  }
                >
                  {group.label}
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </NavLink>
                {openGroup === group.label ? (
                  <div className="absolute left-0 top-full z-50 min-w-64 animate-fade-in rounded-eh-lg border border-line bg-white p-2 shadow-eh-lift">
                    {group.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="focus-eh block rounded-eh px-3 py-2 hover:bg-eh-purple-tint"
                      >
                        <span className="block text-sm font-semibold text-ink">{child.label}</span>
                        {child.description ? (
                          <span className="mt-0.5 block text-xs text-ink-faint">{child.description}</span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <DemoRibbon label="Unofficial demo" className="hidden border-line text-ink-faint md:inline-flex" />
          <Link to="/search" className="focus-eh hidden rounded-full p-2 text-ink-soft hover:bg-surface-soft sm:inline-flex" aria-label="Search">
            <Search aria-hidden="true" className="h-5 w-5" />
          </Link>
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setOpenGroup("login")}
            onMouseLeave={() => setOpenGroup(null)}
          >
            <button
              type="button"
              className="focus-eh inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-surface-soft"
              aria-expanded={openGroup === "login"}
            >
              Log in
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
            {openGroup === "login" ? (
              <div className="absolute right-0 top-full z-50 min-w-56 animate-fade-in rounded-eh-lg border border-line bg-white p-2 shadow-eh-lift">
                {loginPortals.map((portal) => (
                  <Link key={portal.to} to={portal.to} className="focus-eh block rounded-eh px-3 py-2 hover:bg-eh-purple-tint">
                    <span className="block text-sm font-semibold">{portal.label}</span>
                    <span className="text-xs text-ink-faint">{portal.description}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <ButtonLink to="/request-demo" size="sm" className="hidden sm:inline-flex">
            Request a demo
          </ButtonLink>
          <button
            type="button"
            className="focus-eh inline-flex rounded-full p-2 hover:bg-surface-soft lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-eh flex flex-col gap-1 py-4">
            {primaryNav.flatMap((g) => g.children).map((link) => (
              <Link key={link.to} to={link.to} className="focus-eh rounded-eh px-3 py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {loginPortals.map((portal) => (
              <Link key={portal.to} to={portal.to} className="focus-eh rounded-eh px-3 py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>
                {portal.label}
              </Link>
            ))}
            <Link to="/request-demo" className="focus-eh mt-2 inline-flex items-center justify-center rounded-full bg-eh-purple px-5 py-2.5 text-sm font-semibold text-white" onClick={() => setMobileOpen(false)}>
              Request a demo
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
