import Link from "next/link";
import { appCta } from "@/lib/constants/travel-move";

export function AppDownloadCta() {
  const s = appCta;
  return (
    <section className="bg-spark-purple text-white">
      <div className="container grid items-center gap-8 py-14 md:grid-cols-2 md:py-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{s.title}</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">{s.body}</p>
          <Link
            href={s.cta.href}
            className="mt-8 inline-flex h-12 items-center rounded-md bg-white px-6 text-sm font-semibold text-spark-purple hover:bg-white/90"
          >
            {s.cta.label}
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg">
          <img src={s.image} alt="People using phones" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
