"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_MYOPTUS } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export function MyOptusNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1" aria-label="My Optus">
      {NAV_MYOPTUS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-semibold",
              active
                ? "bg-optus-teal text-white"
                : "text-optus-ink/70 hover:bg-optus-teal-light hover:text-optus-teal",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
