import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CreditCard, Home, ArrowLeftRight, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const links = [
  { to: "/netbank", label: "Accounts", icon: Home, end: true },
  { to: "/netbank/transfers", label: "Transfers", icon: ArrowLeftRight },
  { to: "/netbank/cards", label: "Cards", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function NetBankShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src="/brand/commbank-logo.svg" alt="CommBank" className="h-7 w-auto" />
            </Link>
            <span className="rounded bg-cba-yellow px-2 py-0.5 text-xs font-bold text-cba-black">NetBank</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-ink-soft sm:inline">Hi, {user?.name}</span>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-semibold text-ink hover:text-cba-blue"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Log off
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="NetBank" className="h-fit rounded-xl border border-line bg-card p-3">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold",
                      isActive ? "bg-cba-yellow text-cba-black" : "text-ink-soft hover:bg-surface hover:text-ink",
                    )
                  }
                >
                  <link.icon aria-hidden="true" className="h-4 w-4" />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
