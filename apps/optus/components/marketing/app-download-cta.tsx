import Link from "next/link";
import { appCta } from "@/lib/constants/optus-landing";

export function AppDownloadCta() {
  return (
    <section className="bg-optus-teal text-white">
      <div className="container flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div><h2 className="text-3xl font-black tracking-tight md:text-4xl">{appCta.title}</h2><p className="mt-4 max-w-2xl text-white/85">{appCta.body}</p></div>
        <Link href={appCta.cta.href} className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-white px-6 text-sm font-bold text-optus-teal-dark hover:bg-optus-yellow hover:text-optus-ink">{appCta.cta.label}</Link>
      </div>
    </section>
  );
}
