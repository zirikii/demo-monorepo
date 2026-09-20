import type { ReactNode } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CookieBanner } from "./CookieBanner";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageLayout({ title, children }: { title: string; children: ReactNode }) {
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
