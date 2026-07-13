import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { CookieBanner } from "../marketing/CookieBanner";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-card text-ink">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
