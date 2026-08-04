import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { PublicHeader } from "./PublicHeader";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
