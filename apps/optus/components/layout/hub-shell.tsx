import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { HubNav } from "@/components/layout/hub-nav";
import { OptusLogo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import type { SessionUser } from "@/lib/types";
export function HubShell({ children, user }: { children: ReactNode; user: SessionUser | null }) {
  return (
    <div className="min-h-screen bg-optus-page">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-optus-teal-dark px-5 py-6 text-white lg:flex">
        <Link
          href="/overview"
          aria-label="Optus Business Hub overview"
          className="mb-8 inline-flex"
        >
          <OptusLogo variant="white" className="w-36" />
        </Link>
        <div className="mb-6 rounded-lg bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">
            Business account
          </p>
          <p className="mt-1 font-bold">Harbour Retail Group</p>
          <p className="text-sm text-white/70">BAN 8142 0091</p>
        </div>
        <HubNav />
        <div className="mt-auto rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-white/75">
          <p className="font-bold text-white">Demo mode</p>
          <p className="mt-1">Local JSON data, mock auth, and no real Optus services.</p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-optus-line bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <OptusLogo className="w-28" />
            </div>
            <div className="hidden flex-1 items-center gap-3 rounded-full bg-optus-page px-4 py-2 text-sm text-optus-muted md:flex md:max-w-md">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search services, reports, invoices
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button variant="ghost" size="sm" aria-label="Notifications">
                <Bell className="h-4 w-4" aria-hidden="true" />
              </Button>
              <div className="hidden text-right text-sm sm:block">
                <p className="font-bold text-optus-ink">{user?.name ?? "Demo Admin"}</p>
                <p className="text-optus-muted">{user?.email ?? "admin@example.com"}</p>
              </div>
              <form action="/api/auth/logout" method="post">
                <Button variant="secondary" size="sm" type="submit">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
