import type { ReactNode } from "react";
import { Bookmark, CalendarDays, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

const HUB_NAV = [
  { label: "Overview", to: "/hub", icon: LayoutDashboard, end: true },
  { label: "Applications", to: "/hub/applications", icon: Users, end: false },
  { label: "Saved roles", to: "/hub/saved", icon: Bookmark, end: false },
  { label: "Interviews", to: "/hub/interviews", icon: CalendarDays, end: false },
  { label: "Profile", to: "/hub/profile", icon: Settings, end: false },
];

export function HubLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  useDocumentTitle(`${title} · Candidate hub`);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-surface-tint">
      <header className="bg-night text-white">
        <div className="container-go-wide flex h-[68px] items-center gap-6">
          <Link to="/" className="focus-go" aria-label="Gojek Tech home">
            <BrandLogo className="h-6" />
          </Link>
          <span className="hidden text-sm font-bold text-white/50 sm:inline">Candidate hub</span>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-right text-sm sm:block">
              <span className="block font-bold text-white">{user?.name}</span>
              <span className="block text-xs text-white/50">{user?.candidateId}</span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-go-green text-sm font-extrabold text-white"
            >
              {initials(user?.name ?? "GT")}
            </span>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="focus-go inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-sm font-bold text-white/80 transition hover:bg-white/10"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-go-wide flex flex-1 flex-col gap-8 py-10 lg:flex-row">
        <nav aria-label="Candidate hub" className="lg:w-60 lg:shrink-0">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {HUB_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(
                      "focus-go flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap transition lg:rounded-go-sm",
                      isActive
                        ? "bg-ink-strong text-white"
                        : "text-ink-soft hover:bg-white hover:text-ink-strong",
                    )
                  }
                >
                  <item.icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink-strong">{title}</h1>
            <p className="text-sm text-ink-soft">{description}</p>
          </div>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
