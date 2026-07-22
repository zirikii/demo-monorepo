import Link from "next/link";
import { Smartphone, Wifi, Tablet, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import { quickLinks } from "@/lib/constants/marketing";

const ICONS: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  wifi: Wifi,
  devices: Tablet,
  zap: Zap,
};

export function QuickLinkGrid() {
  return (
    <section className="container py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => {
          const Icon = ICONS[link.icon] ?? Smartphone;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring group rounded-lg border border-line bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-optus-teal-light text-optus-teal">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-optus-ink">{link.title}</h3>
              <p className="mt-1 text-sm text-optus-ink/70">{link.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-optus-teal">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
