"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_MYOPTUS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function MyOptusNav({ userName }: { userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="border-b border-line pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-optus-ink/50">My Optus</p>
        <p className="mt-1 font-semibold text-optus-ink">{userName}</p>
      </div>
      <nav className="mt-4 flex flex-col gap-1" aria-label="My Optus">
        {NAV_MYOPTUS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold text-optus-ink/80 hover:bg-optus-teal-light hover:text-optus-teal",
                active && "bg-optus-teal-light text-optus-teal",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="focus-ring mt-6 w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-optus-ink hover:bg-surface-muted"
      >
        Log out
      </button>
    </aside>
  );
}
