import type { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
