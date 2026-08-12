import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const links = [
  { to: "/portal", label: "Overview", end: true },
  { to: "/portal/people", label: "People" },
  { to: "/portal/leave", label: "Leave" },
  { to: "/portal/payroll", label: "Payroll" },
  { to: "/portal/recruitment", label: "Recruitment" },
  { to: "/portal/settings", label: "Settings" },
];

export function PortalLayout({ children, title }: { children: ReactNode; title: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="border-b border-line bg-white">
        <div className="container-eh flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="focus-eh">
              <img src="/brand/logo.svg" alt="Employment Hero" className="h-7 w-auto" />
            </Link>
            <DemoRibbon label="Unofficial demo" className="border-line text-ink-faint" />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-sm">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-ink-faint">{user?.company}</div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Log out
            </Button>
          </div>
        </div>
        <nav aria-label="Portal" className="container-eh flex gap-1 overflow-x-auto pb-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "focus-eh rounded-full px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-eh-purple-tint",
                  isActive && "bg-eh-purple text-white hover:bg-eh-purple",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="container-eh py-8">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
