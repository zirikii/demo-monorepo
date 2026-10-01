import type { ReactNode } from "react";
import { ArrowLeft, Bot, FlaskConical, LayoutDashboard, MessagesSquare, Route, UserRound } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { DemoRibbon } from "@demo/ui";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/admin", label: "Overview", Icon: LayoutDashboard, end: true },
  { to: "/admin/conversations", label: "Conversations", Icon: MessagesSquare },
  { to: "/admin/routing", label: "Routing rules", Icon: Route },
  { to: "/admin/simulator", label: "Routing simulator", Icon: FlaskConical },
  { to: "/admin/assistant", label: "Assistant", Icon: Bot },
  { to: "/admin/fan", label: "Fan profile", Icon: UserRound },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-page lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="bg-midnight text-white lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center gap-3 px-5 py-5">
          <img src={asset("brand/ticketek-logo-white.svg")} alt="Ticketek" className="h-6 w-auto" />
        </div>
        <p className="px-5 text-xs font-semibold tracking-wide text-tk-pink uppercase">Support Studio</p>
        <nav aria-label="Support Studio" className="mt-3 px-3 pb-3">
          <ul className="flex gap-1 overflow-x-auto lg:block lg:space-y-0.5">
            {LINKS.map(({ to, label, Icon, end }) => (
              <li key={to} className="shrink-0">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn("flex items-center gap-2.5 rounded-tk px-3 py-2 text-sm whitespace-nowrap", isActive ? "bg-white/15 font-semibold" : "text-white/75 hover:bg-white/10 hover:text-white")
                  }
                >
                  <Icon className="size-4" aria-hidden /> {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden px-5 pt-4 lg:block">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden /> Back to ticketek.com.au
          </Link>
        </div>
      </aside>
      <main id="main" className="min-w-0 px-4 py-6 md:px-8">
        <div className="mb-4 flex justify-end">
          <DemoRibbon label="Unofficial demo · Support Studio" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export function AdminPage({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function Card({ title, children, className, action }: { title?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={cn("rounded-tk-lg bg-white p-5 shadow-tk", className)}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h2 className="font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", checked ? "bg-tk-green" : "bg-line")}
    >
      <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", checked ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}
