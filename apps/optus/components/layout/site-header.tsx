"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { NAV_MARKETING } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const accountPaths = [
  "/dashboard",
  "/usage",
  "/plans",
  "/add-ons",
  "/bills",
  "/support-cases",
  "/settings",
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(accountPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`)));
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Optus home">
            <img src="/brand/logo.svg" alt="Optus" className="h-9 w-auto" />
          </Link>
          <DemoRibbon className="hidden border-optus-teal/20 text-optus-ink/70 sm:inline-flex" />
        </div>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_MARKETING.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold text-optus-ink/80 hover:text-optus-teal",
                pathname === item.href && "text-optus-teal",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-semibold text-optus-ink/80 hover:text-optus-teal",
              signedIn && "text-optus-teal",
            )}
          >
            My Optus
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-md p-2 text-optus-ink hover:bg-surface-muted sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="hidden rounded-md p-2 text-optus-ink hover:bg-surface-muted sm:inline-flex"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <Link
            href={signedIn ? "/dashboard" : "/login"}
            className="hidden h-9 items-center rounded-full bg-optus-teal px-4 text-xs font-bold text-white hover:bg-optus-teal-dark sm:inline-flex"
          >
            {signedIn ? "Account" : "Sign in"}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-optus-ink hover:bg-surface-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {[...NAV_MARKETING, { href: "/dashboard", label: "My Optus" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-optus-teal-light"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
