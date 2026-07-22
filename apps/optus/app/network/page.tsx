import type { Metadata } from "next";
import Link from "next/link";
import { livingNetwork } from "@/lib/constants/optus-landing";

export const metadata: Metadata = { title: "Living Network" };

export default function NetworkPage() {
  return (
    <div>
      <section className="optus-pattern text-white">
        <div className="container py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Living Network</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            Network features that put you in control
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            Unlimited Data Day, Donate Your Data, Scamwise and Network Pulse — simulated locally for this unofficial demo.
          </p>
          <Link
            href="/network-tools"
            className="mt-8 inline-flex h-11 items-center rounded-md bg-optus-yellow px-5 text-sm font-bold text-optus-ink hover:bg-white"
          >
            Open network tools in My Optus
          </Link>
        </div>
      </section>
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {livingNetwork.features.map((feature) => (
            <article key={feature.id} className="rounded-xl border border-line bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-optus-ink">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-optus-ink/75">{feature.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl bg-optus-teal-light p-6">
          <h3 className="text-lg font-black text-optus-ink">How to start</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-optus-ink/80">
            <li>Sign in to My Optus with any demo credentials.</li>
            <li>Open Network tools from the account nav.</li>
            <li>Activate Unlimited Data Day, donate unused data or check Network Pulse status.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
