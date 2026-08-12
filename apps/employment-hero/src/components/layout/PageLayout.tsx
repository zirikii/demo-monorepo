import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageLayout({ children }: { children: ReactNode }) {
  const [cookieOpen, setCookieOpen] = useState(
    () => localStorage.getItem("eh-cookie-demo") !== "hidden",
  );

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      {cookieOpen ? (
        <aside
          aria-label="Cookie notice"
          className="fixed bottom-4 left-4 z-50 max-w-sm rounded-hero-lg border border-line bg-white p-5 shadow-menu"
        >
          <button
            type="button"
            aria-label="Dismiss cookie notice"
            onClick={() => {
              localStorage.setItem("eh-cookie-demo", "hidden");
              setCookieOpen(false);
            }}
            className="focus-hero absolute right-3 top-3 rounded-full p-1 hover:bg-neutral-soft"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
          <p className="pr-6 text-sm font-bold">A small note about cookies</p>
          <p className="mt-2 text-xs leading-5 text-ink-soft">
            This demo only stores interface preferences in your browser. No tracking or real
            customer data is used.
          </p>
        </aside>
      ) : null}
    </div>
  );
}
