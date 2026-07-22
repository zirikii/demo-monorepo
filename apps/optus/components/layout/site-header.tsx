"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { MYOPTUS_PREFIXES, NAV_MARKETING } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

function onMyOptus(pathname: string): boolean {
  return MYOPTUS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(onMyOptus(pathname));
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Optus home">
            {/* Optus wordmark — self-hosted brand asset */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="Optus" className="h-6 w-auto" />
          </Link>
          <DemoRibbon className="hidden border-line text-optus-ink-soft sm:inline-flex" />
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_MARKETING.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "text-sm font-semibold text-optus-ink-soft hover:text-optus-ink",
                pathname === item.href && "text-optus-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            aria-current={signedIn ? "page" : undefined}
            className={cn(
              "text-sm font-semibold text-optus-ink-soft hover:text-optus-ink",
              signedIn && "text-optus-ink",
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
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden rounded-md p-2 text-optus-ink hover:bg-surface-muted sm:inline-flex"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          </button>
          {signedIn ? (
            <Link
              href="/dashboard"
              className="hidden h-9 items-center rounded-md border border-optus-ink px-3 text-xs font-semibold text-optus-ink hover:bg-surface-muted sm:inline-flex"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden h-9 items-center rounded-md bg-optus-yellow px-4 text-xs font-semibold text-optus-ink hover:bg-optus-yellow-dark sm:inline-flex"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-optus-ink hover:bg-surface-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV_MARKETING.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-surface-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-surface-muted"
              onClick={() => setOpen(false)}
            >
              My Optus
            </Link>
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              className="rounded-md px-3 py-2 text-sm font-semibold text-optus-ink"
              onClick={() => setOpen(false)}
            >
              {signedIn ? "Account" : "Sign in"}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
