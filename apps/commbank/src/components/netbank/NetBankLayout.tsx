import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { netbankNav } from "@/data/nav";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

export function NetBankLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-surface-tint text-ink">
      <header className="bg-ink text-surface">
        <div className="container-cba flex flex-wrap items-center gap-4 py-3">
          <Link to="/" aria-label="CommBank home" className="focus-cba shrink-0">
            <img
              src="/brand/logo-white.svg"
              alt="CommBank"
              width={171}
              height={53}
              className="h-8 w-auto"
            />
          </Link>
          <span className="rounded-full bg-surface/10 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-cba-yellow">
            NetBank
          </span>
          <DemoRibbon label="Unofficial demo" className="border-surface/30 text-surface/70" />
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <span className="hidden text-sm text-surface/80 sm:inline">
                {user.name} · Client {user.clientNumber}
              </span>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="focus-cba inline-flex items-center gap-1.5 rounded-full border border-surface/30 px-4 py-2 text-sm font-bold text-surface hover:bg-surface/10"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Log off
            </button>
          </div>
        </div>

        <nav aria-label="NetBank" className="border-t border-surface/15">
          <ul className="container-cba flex gap-1 overflow-x-auto py-1">
            {netbankNav.map((item) => {
              const active =
                item.to === "/netbank"
                  ? location.pathname === "/netbank"
                  : location.pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-cba block whitespace-nowrap rounded-cba px-4 py-2.5 text-sm font-bold transition-colors",
                      active
                        ? "bg-cba-yellow text-ink"
                        : "text-surface/80 hover:bg-surface/10 hover:text-surface",
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main id="main" className="flex-1 py-8">
        <div className="container-cba">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
          {intro ? <p className="mt-2 text-[15px] text-ink-soft">{intro}</p> : null}
          <div className="mt-6">{children}</div>
        </div>
      </main>

      <footer className="border-t border-line bg-surface py-6">
        <p className="container-cba text-[12px] leading-relaxed text-ink-faint">
          Demo NetBank. All balances, transactions and payees are fictional and stored only in your
          browser. Not affiliated with Commonwealth Bank of Australia.
        </p>
      </footer>
    </div>
  );
}
