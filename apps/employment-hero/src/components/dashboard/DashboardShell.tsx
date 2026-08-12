import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, HelpCircle, Menu, Search, Sparkles, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui";
import { dashboardNav } from "@/data/site";
import { cn } from "@/lib/cn";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-soft">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-line bg-ink text-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-18 items-center justify-between border-b border-white/10 px-5">
          <Link to="/" className="focus-hero rounded">
            <img
              src="/brand/logo.svg"
              alt="Employment Hero"
              className="h-7 w-auto brightness-0 invert"
            />
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="focus-hero rounded p-2 lg:hidden"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-white/10 p-4">
          <button
            type="button"
            className="focus-hero flex w-full items-center gap-3 rounded-xl bg-white/8 p-3 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-sm font-black text-ink">
              A
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">Acme Digital</span>
              <span className="block text-xs text-white/50">84 employees</span>
            </span>
            <ChevronDown aria-hidden="true" className="h-4 w-4 text-white/50" />
          </button>
        </div>
        <nav aria-label="Employment OS" className="p-3">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "focus-hero mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/8 hover:text-white",
                  active && "bg-violet text-ink hover:bg-violet hover:text-ink",
                )}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-3 right-3 rounded-2xl bg-violet/15 p-4">
          <Sparkles aria-hidden="true" className="h-5 w-5 text-violet" />
          <p className="mt-3 text-sm font-bold">Ask Hero</p>
          <p className="mt-1 text-xs leading-5 text-white/50">
            Get help with HR, payroll and people questions.
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-18 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-7">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="focus-hero rounded-full p-2 lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
          <DemoRibbon label="Product preview" className="border-line text-ink-faint" />
          <div className="ml-auto hidden w-full max-w-xs items-center rounded-full bg-neutral-soft px-4 sm:flex">
            <Search aria-hidden="true" className="h-4 w-4 text-ink-faint" />
            <input
              aria-label="Search Employment OS"
              placeholder="Search people, tasks and help"
              className="min-h-10 flex-1 bg-transparent px-3 text-sm outline-none"
            />
          </div>
          <button
            type="button"
            aria-label="Help"
            className="focus-hero rounded-full p-2 hover:bg-neutral-soft"
          >
            <HelpCircle aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="focus-hero relative rounded-full p-2 hover:bg-neutral-soft"
          >
            <Bell aria-hidden="true" className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral" />
          </button>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-green-soft text-xs font-bold">
            AC
          </span>
        </header>
        <main id="main" className="px-4 py-7 sm:px-7 sm:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
