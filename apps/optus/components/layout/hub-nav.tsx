"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hubNavItems } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
export function HubNav() {
  const pathname = usePathname();
  return (
    <nav className="space-y-1" aria-label="Optus Business Hub">
      {hubNavItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition",
              active
                ? "bg-optus-yellow text-optus-ink"
                : "text-white/75 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
