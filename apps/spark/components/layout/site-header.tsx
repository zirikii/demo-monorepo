"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { NAV_MARKETING } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const onMyspark = [
      "/dashboard",
      "/usage",
      "/plans",
      "/top-up",
      "/bills",
      "/settings",
    ].some((p) => pathname === p || pathname.startsWith(`${p}/`));
    setSignedIn(onMyspark);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Spark NZ home">
            {/* Official Spark logo — self-hosted brand asset */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="Spark NZ" className="h-9 w-auto" />
          </Link>
          <DemoRibbon className="hidden border-spark-purple/20 text-spark-ink/70 sm:inline-flex" />
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_MARKETING.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold text-spark-ink/80 hover:text-spark-purple",
                pathname === item.href && "text-spark-purple",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-semibold text-spark-ink/80 hover:text-spark-purple",
              (pathname.startsWith("/dashboard") ||
                pathname.startsWith("/usage") ||
                pathname.startsWith("/plans") ||
                pathname.startsWith("/top-up") ||
                pathname.startsWith("/bills") ||
                pathname.startsWith("/settings")) &&
                "text-spark-purple",
            )}
          >
            MySpark
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden rounded-md p-2 text-spark-ink hover:bg-surface-muted sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="hidden rounded-md p-2 text-spark-ink hover:bg-surface-muted sm:inline-flex"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          {signedIn ? (
            <Link
              href="/dashboard"
              className="hidden h-9 items-center rounded-md border border-spark-purple px-3 text-xs font-semibold text-spark-purple hover:bg-spark-purple-light sm:inline-flex"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden h-9 items-center rounded-md bg-spark-purple px-3 text-xs font-semibold text-white hover:bg-spark-purple-dark sm:inline-flex"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-spark-ink hover:bg-surface-muted lg:hidden"
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
            {NAV_MARKETING.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-spark-purple-light"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-spark-purple-light"
              onClick={() => setOpen(false)}
            >
              MySpark
            </Link>
            <Link
              href={signedIn ? "/dashboard" : "/login"}
              className="rounded-md px-3 py-2 text-sm font-semibold text-spark-purple"
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
