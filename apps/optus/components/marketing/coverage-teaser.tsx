import Link from "next/link";
import { livingNetwork } from "@/lib/constants/optus-landing";

export function CoverageTeaser() {
  return (
    <section className="container py-14">
      <div className="overflow-hidden rounded-2xl bg-optus-ink text-white">
        <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Living Network</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{livingNetwork.title}</h2>
            <p className="mt-4 max-w-xl text-white/80">{livingNetwork.body}</p>
            <Link
              href="/network"
              className="mt-8 inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white hover:bg-optus-teal-dark"
            >
              Explore network features
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {livingNetwork.features.map((feature) => (
              <li key={feature.id} className="rounded-lg border border-white/15 bg-white/5 p-4">
                <p className="font-bold">{feature.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{feature.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
