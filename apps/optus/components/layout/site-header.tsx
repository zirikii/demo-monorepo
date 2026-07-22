"use client";

import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_MARKETING } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

const MY_OPTUS_PREFIXES = ["/dashboard", "/usage", "/plans", "/add-ons", "/bills", "/settings"];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(MY_OPTUS_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)));
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Optus Australia home">
            <img src="/brand/logo.svg" alt="Optus" className="h-9 w-auto" />
          </Link>
          <DemoRibbon className="hidden border-optus-teal/20 text-optus-ink/70 sm:inline-flex" />
        </div>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_MARKETING.map((item) => (
            <Link key={item.href} href={item.href} className={cn("text-sm font-bold text-optus-ink/80 hover:text-optus-teal-dark", pathname === item.href && "text-optus-teal-dark")}>
              {item.label}
            </Link>
          ))}
          <Link href="/dashboard" className={cn("text-sm font-bold text-optus-ink/80 hover:text-optus-teal-dark", MY_OPTUS_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)) && "text-optus-teal-dark")}>My Optus</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden rounded-md p-2 text-optus-ink hover:bg-surface-muted sm:inline-flex" aria-label="Search"><Search className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" className="hidden rounded-md p-2 text-optus-ink hover:bg-surface-muted sm:inline-flex" aria-label="Cart"><ShoppingBag className="h-5 w-5" aria-hidden="true" /></button>
          <Link href={signedIn ? "/dashboard" : "/login"} className="hidden h-9 items-center rounded-md bg-optus-teal px-3 text-xs font-bold text-white hover:bg-optus-teal-dark sm:inline-flex">{signedIn ? "Account" : "Sign in"}</Link>
          <button type="button" className="inline-flex rounded-md p-2 text-optus-ink hover:bg-surface-muted lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV_MARKETING.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-bold hover:bg-optus-teal-light" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-bold hover:bg-optus-teal-light" onClick={() => setOpen(false)}>My Optus</Link>
            <Link href={signedIn ? "/dashboard" : "/login"} className="rounded-md px-3 py-2 text-sm font-bold text-optus-teal-dark" onClick={() => setOpen(false)}>{signedIn ? "Account" : "Sign in"}</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
