import Link from "next/link";
import { ArrowRight, Plane, Smartphone, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const tiles: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}[] = [
  {
    icon: Smartphone,
    title: "Pay Monthly mobile",
    description: "Endless data plans with mins & texts included, on an open term.",
    href: "/mobile",
    cta: "Shop mobile plans",
  },
  {
    icon: Wifi,
    title: "Home broadband",
    description: "Fibre, wireless and rural plans with a Smart Mesh router.",
    href: "/broadband",
    cta: "Shop broadband",
  },
  {
    icon: Plane,
    title: "Travel & roaming",
    description: "Stay connected overseas from a few dollars a day.",
    href: "/roaming",
    cta: "Sort roaming",
  },
];

export function ProductTiles() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {tiles.map((tile) => (
        <Link
          key={tile.title}
          href={tile.href}
          className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-spark-purple-light text-spark-purple">
            <tile.icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-spark-ink">{tile.title}</h3>
          <p className="mt-1 flex-1 text-sm text-ink-secondary">{tile.description}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spark-purple">
            {tile.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
