import type { ReactNode } from "react";
import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { CommBankLogo } from "@/components/brand/CommBankLogo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/netbank", label: "Home", end: true },
  { to: "/netbank/transfer", label: "Transfers & BPAY" },
  { to: "/netbank/payees", label: "Payees" },
  { to: "/netbank/cards", label: "Cards" },
  { to: "/netbank/statements", label: "Statements" },
  { to: "/netbank/yello", label: "CommBank Yello" },
  { to: "/netbank/settings", label: "Settings" },
];

export function NetBankLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, logoff } = useAuth();
  const location = useLocation();

  if (!user) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/logon?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-tint">
      <header className="bg-black text-white">
        <div className="container-page flex items-center gap-4 py-3">
          <Link to="/" aria-label="CommBank homepage" className="focus-ring rounded">
            <CommBankLogo tone="light" />
          </Link>
          <DemoRibbon
            label="Mock NetBank"
            className="hidden border-white/25 text-[10px] text-white/70 sm:inline-flex"
          />
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-sm text-white/70 sm:inline">
              {user.name} · Client {user.clientNumber}
            </span>
            <button
              type="button"
              onClick={logoff}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-black"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Log off
            </button>
          </div>
        </div>

        <nav aria-label="NetBank" className="border-t border-white/15">
          <ul className="container-page flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "focus-ring relative block whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors",
                      isActive ? "text-cba-yellow" : "text-white/75 hover:text-white",
                    )
                  }
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <>
                      {item.label}
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-2 bottom-0 h-1 rounded-t bg-cba-yellow"
                        />
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main-content" className="flex-1 py-8">
        <div className="container-page">
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-black sm:text-3xl">{title}</h1>
          {children}
        </div>
      </main>

      <footer className="border-t border-line bg-surface py-6">
        <div className="container-page text-xs text-ink-muted">
          Mock NetBank. Balances, transactions and payees are fabricated and stored only in this
          browser&apos;s local storage. Not affiliated with the Commonwealth Bank of Australia.
        </div>
      </footer>
    </div>
  );
}
