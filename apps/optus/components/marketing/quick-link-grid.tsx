import Link from "next/link";
import { Home, Smartphone, Tag, Tv, Wifi, UserRound } from "lucide-react";

const LINKS = [
  { href: "/mobile", label: "Mobile plans", icon: Smartphone },
  { href: "/home-internet", label: "Home Internet", icon: Wifi },
  { href: "/phones", label: "Phones", icon: Home },
  { href: "/deals", label: "Deals", icon: Tag },
  { href: "/entertainment", label: "Optus Sport", icon: Tv },
  { href: "/dashboard", label: "My Optus", icon: UserRound },
];

export function QuickLinkGrid() {
  return (
    <section className="border-b border-line bg-surface-subtle">
      <div className="container grid grid-cols-2 gap-3 py-8 sm:grid-cols-3 lg:grid-cols-6">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center gap-2 rounded-lg border border-transparent bg-white px-3 py-4 text-center shadow-sm transition hover:border-optus-teal/30 hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-optus-teal-light text-optus-teal transition group-hover:bg-optus-teal group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-optus-ink">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
