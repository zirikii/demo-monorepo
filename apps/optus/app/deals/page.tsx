import type { Metadata } from "next";
import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { Deal } from "@/lib/types";

export const metadata: Metadata = { title: "Deals" };

export default async function DealsPage() {
  const deals = await readJson<Deal[]>("deals.json");

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold text-optus-ink">Deals</h1>
      <p className="mt-3 max-w-2xl text-optus-ink/70">
        Current demo promotions with Yes yellow accents — not live Optus offers.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <article
            key={deal.id}
            className="rounded-xl border border-line bg-white p-6 shadow-sm"
          >
            <span className="inline-flex rounded-full bg-optus-yellow px-2.5 py-0.5 text-xs font-bold text-optus-ink">
              {deal.badge}
            </span>
            <h2 className="mt-3 text-xl font-bold">{deal.title}</h2>
            <p className="mt-2 text-sm text-optus-ink/70">{deal.summary}</p>
            <Link
              href={deal.href}
              className="mt-4 inline-flex text-sm font-semibold text-optus-teal hover:underline"
            >
              Learn more
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
