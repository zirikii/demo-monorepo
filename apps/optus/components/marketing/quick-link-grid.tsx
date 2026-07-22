import Link from "next/link";
import { Smartphone, Wifi, Tv, CreditCard } from "lucide-react";

const LINKS = [
  {
    href: "/mobile-plans",
    label: "Mobile plans",
    icon: Smartphone,
    blurb: "SIM-only Choice plans",
  },
  { href: "/internet", label: "Internet", icon: Wifi, blurb: "nbn & 5G Home Internet" },
  { href: "/entertainment", label: "Entertainment", icon: Tv, blurb: "Optus Sport & SubHub" },
  { href: "/prepaid", label: "Prepaid", icon: CreditCard, blurb: "Epic Value recharges" },
] as const;

export function QuickLinkGrid() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="group flex items-center gap-4 rounded-lg border border-line bg-surface-subtle p-5 transition hover:border-optus-ink hover:bg-white"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-optus-yellow">
              <link.icon className="h-6 w-6 text-optus-ink" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold text-optus-ink">{link.label}</span>
              <span className="block text-sm text-optus-ink-soft">{link.blurb}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
