import Link from "next/link";
import { quickLinks } from "@/lib/constants/optus-landing";

export function QuickLinkGrid() {
  return (
    <section className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Shop Optus</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-optus-ink md:text-4xl">
        Everything you need to stay connected
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href + link.title}
            href={link.href}
            className="flex items-center gap-4 rounded-xl border border-line bg-white p-5 transition hover:border-optus-teal hover:shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={link.icon} alt="" className="h-12 w-12" />
            <span className="text-base font-bold text-optus-ink">{link.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
