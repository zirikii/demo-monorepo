import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CookieBanner } from "./CookieBanner";
import { SiteHeader } from "./SiteHeader";
import { Button } from "@/components/ui/Button";
import { PORTAL_NAV } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

export function PortalLayout({ children, title }: { children: ReactNode; title: string }) {
  useDocumentTitle(title);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-go-bg text-go-ink">
      <SiteHeader portal />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <p className="text-xs tracking-[0.16em] text-go-faint uppercase">Gojek Tech portal</p>
          <p className="mt-2 text-sm text-go-muted">{user?.name}</p>
          <nav className="mt-6 flex flex-col gap-1" aria-label="Portal">
            {PORTAL_NAV.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/portal"}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "rounded-go px-3 py-2 text-sm",
                    isActive ? "bg-white/8 text-white" : "text-go-muted hover:bg-white/4 hover:text-white",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Button
            variant="secondary"
            size="sm"
            className="mt-6"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out
          </Button>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <CookieBanner />
    </div>
  );
}
