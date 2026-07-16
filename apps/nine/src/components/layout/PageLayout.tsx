import type { ReactNode } from "react";
import { BreakingTicker } from "@/components/layout/BreakingTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PageLayout({ children, hideTicker }: { children: ReactNode; hideTicker?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      {!hideTicker && <BreakingTicker />}
      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
