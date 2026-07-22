import Link from "next/link";
import { entertainmentTeaser } from "@/lib/constants/optus-landing";

export function EntertainmentTeaser() {
  return (
    <section className="container py-14">
      <div className="rounded-2xl bg-optus-ink p-8 text-white md:p-10">
        <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Optus Sport and extras</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{entertainmentTeaser.title}</h2>
        <p className="mt-4 max-w-3xl text-white/80">{entertainmentTeaser.body}</p>
        <Link href={entertainmentTeaser.cta.href} className="mt-6 inline-flex h-11 items-center rounded-md bg-optus-yellow px-5 text-sm font-bold text-optus-ink hover:bg-white">{entertainmentTeaser.cta.label}</Link>
      </div>
    </section>
  );
}
