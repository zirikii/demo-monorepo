import type { Metadata } from "next";
import Link from "next/link";
import { readJson } from "@/lib/data/json-store";
import type { PhoneDevice } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Phones" };

export default async function PhonesPage() {
  const phones = await readJson<PhoneDevice[]>("phones.json");

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-extrabold text-optus-ink">Phones</h1>
      <p className="mt-3 max-w-2xl text-optus-ink/70">
        Latest Apple, Samsung, and Google devices with demo repayments from selected monthly
        amounts.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {phones.map((phone) => (
          <article key={phone.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-optus-ink/50">{phone.brand}</p>
            <h2 className="mt-1 text-xl font-bold">{phone.name}</h2>
            <p className="mt-2 text-sm text-optus-ink/70">
              {phone.storage} · {phone.colour}
            </p>
            <p className="mt-4 text-2xl font-extrabold text-optus-teal">
              From {formatAud(phone.priceFrom)}
              <span className="text-sm font-semibold text-optus-ink/60">/mth</span>
            </p>
            <Link
              href="/deals"
              className="mt-4 inline-flex text-sm font-semibold text-optus-teal hover:underline"
            >
              See device deals
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
