import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CategoryStrip } from "./CategoryStrip";

interface PageLayoutProps {
  children: ReactNode;
  /** Show the dark navy category subnav (product pages). */
  withCategoryStrip?: boolean;
}

export function PageLayout({ children, withCategoryStrip = false }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-paytm-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      {withCategoryStrip ? <CategoryStrip /> : null}
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
