import Link from "next/link";
import { homeInternetTeaser } from "@/lib/constants/optus-landing";
import { AddressCheckForm } from "@/components/marketing/address-check-form";

export function HomeInternetTeaser() {
  return (
    <section className="bg-optus-teal-light">
      <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-optus-ink md:text-4xl">{homeInternetTeaser.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-optus-ink/80">{homeInternetTeaser.body}</p>
          <Link href={homeInternetTeaser.cta.href} className="mt-6 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark">{homeInternetTeaser.cta.label}</Link>
        </div>
        <div className="rounded-xl bg-optus-teal-dark p-6 text-white shadow-lg"><p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Demo address check</p><div className="mt-4"><AddressCheckForm /></div></div>
      </div>
    </section>
  );
}
