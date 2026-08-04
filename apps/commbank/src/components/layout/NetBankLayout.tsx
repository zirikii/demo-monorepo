import {
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Inbox,
  LockKeyhole,
  LogOut,
  Menu,
  Settings,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Overview", to: "/netbank", icon: Home, end: true },
  { label: "Accounts", to: "/netbank/accounts", icon: WalletCards, end: false },
  { label: "Transfer", to: "/netbank/transfer", icon: CreditCard, end: false },
  { label: "BPAY", to: "/netbank/bpay", icon: Bell, end: false },
  { label: "Cards", to: "/netbank/cards", icon: CreditCard, end: false },
  { label: "Payments", to: "/netbank/payments", icon: WalletCards, end: false },
  { label: "Statements", to: "/netbank/statements", icon: FileText, end: false },
  { label: "Inbox", to: "/netbank/inbox", icon: Inbox, end: false },
  { label: "Profile", to: "/netbank/profile", icon: UserRound, end: false },
  { label: "Security", to: "/netbank/security", icon: LockKeyhole, end: false },
  { label: "Settings", to: "/netbank/settings", icon: Settings, end: false },
] as const;

export function ProtectedNetBank() {
  const { profile } = useAuth();
  const location = useLocation();
  if (!profile) {
    return <Navigate replace to={`/netbank/logon?redirect=${encodeURIComponent(location.pathname)}`} />;
  }
  return <NetBankLayout />;
}

function NetBankLayout() {
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-cba-neutral">
      <header className="sticky top-0 z-40 border-b border-cba-line bg-white">
        <div className="flex h-16 items-center gap-4 px-4 md:px-7">
          <button
            className="rounded-lg p-2 md:hidden"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <img className="h-9 w-[48px] object-cover object-left sm:w-auto" src="/brand/commbank-logo.svg" alt="CommBank" />
          <span className="hidden border-l border-cba-line pl-4 text-sm font-semibold sm:inline">NetBank demo</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm sm:block">Hi, {profile?.name}</span>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-cba-line px-4 py-2 text-sm font-semibold hover:bg-cba-neutral"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" /> Log off
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-30 w-64 overflow-y-auto border-r border-cba-line bg-white p-4 md:sticky md:top-16 md:block md:h-[calc(100vh-4rem)]",
            open ? "block" : "hidden",
          )}
        >
          <nav aria-label="NetBank">
            <ul className="space-y-1">
              {nav.map(({ label, to, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    end={end}
                    onClick={() => setOpen(false)}
                    to={to}
                    className={({ isActive }: { isActive: boolean }) =>
                      cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                        isActive ? "bg-cba-yellow text-cba-ink" : "hover:bg-cba-neutral",
                      )
                    }
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" /> {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 rounded-xl bg-cba-neutral p-4 text-xs text-cba-ink-soft">
            <HelpCircle aria-hidden="true" className="mb-2 h-5 w-5" />
            This is a local demo. No real banking activity occurs.
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-6xl"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
