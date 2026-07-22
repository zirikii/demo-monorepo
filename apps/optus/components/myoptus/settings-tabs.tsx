"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { href: "/settings", label: "Overview" },
  { href: "/settings/account", label: "Account" },
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/team", label: "Team" },
  { href: "/settings/integrations", label: "Integrations" },
] as const;

export function SettingsTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-1 border-b border-line" aria-label="Settings">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-semibold",
              active
                ? "border-optus-ink text-optus-ink"
                : "border-transparent text-optus-ink-soft hover:text-optus-ink",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
