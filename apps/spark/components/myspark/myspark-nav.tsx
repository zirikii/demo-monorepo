"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_MYSPARK } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function MySparkNav({ userName }: { userName: string }) {
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
        <p className="text-xs font-semibold uppercase tracking-wide text-spark-ink/50">MySpark</p>
        <p className="mt-1 font-semibold text-spark-ink">{userName}</p>
      </div>
      <nav className="mt-4 flex flex-col gap-1" aria-label="MySpark">
        {NAV_MYSPARK.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold text-spark-ink/80 hover:bg-spark-purple-light hover:text-spark-purple",
              (pathname === item.href || pathname.startsWith(`${item.href}/`)) &&
                "bg-spark-purple-light text-spark-purple",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={logout}
        className="mt-6 w-full rounded-md border border-line px-3 py-2 text-sm font-semibold text-spark-ink hover:bg-surface-muted"
      >
        Log out
      </button>
    </aside>
  );
}
