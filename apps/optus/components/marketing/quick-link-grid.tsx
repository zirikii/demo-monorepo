import Image from "next/image";
import Link from "next/link";
import { quickLinks } from "@/lib/constants/optus-landing";

export function QuickLinkGrid() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container grid grid-cols-2 gap-3 py-6 md:grid-cols-3 lg:grid-cols-6">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="group flex flex-col items-center gap-3 rounded-lg border border-line bg-surface-subtle px-3 py-6 text-center transition hover:border-optus-teal hover:bg-optus-teal-light">
            <Image src={item.icon} width={40} height={40} alt="" aria-hidden="true" />
            <span className="text-sm font-bold text-optus-ink group-hover:text-optus-teal-dark">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
