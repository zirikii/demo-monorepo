import type { ReactNode } from "react";
import { TopUtilityBar } from "./TopUtilityBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-magenta focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <TopUtilityBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
