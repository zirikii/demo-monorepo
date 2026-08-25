import type { ReactNode } from "react";
import { CookieBanner } from "./CookieBanner";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
