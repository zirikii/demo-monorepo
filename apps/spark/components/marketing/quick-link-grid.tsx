import Link from "next/link";
import { quickLinks } from "@/lib/constants/travel-move";

export function QuickLinkGrid() {
  return (
    <section className="bg-white py-10 md:py-14" aria-label="Quick links">
      <div className="container grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {quickLinks.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className="group flex flex-col items-center gap-3 rounded-lg border border-line bg-surface-subtle px-3 py-6 text-center transition hover:border-spark-purple hover:bg-spark-purple-light"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <img src={item.icon} alt="" className="h-8 w-8 object-contain" />
            </span>
            <span className="text-sm font-semibold text-spark-ink group-hover:text-spark-purple">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
