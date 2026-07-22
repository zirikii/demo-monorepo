import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { readJson } from "@/lib/data/json-store";
import type { Phone } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Mobile phones" };

export default async function PhonesPage() {
  const phones = await readJson<Phone[]>("phones.json");
  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Phones</p>
      <h1 className="mt-2 text-4xl font-black text-optus-ink">Phones on Optus plans</h1>
      <p className="mt-4 max-w-2xl text-optus-ink/80">Pair a 5G handset with an Optus mobile plan. Prices are demo monthly device payments in AUD.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {phones.map((phone) => (
          <article key={phone.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-2"><p className="text-xs font-bold uppercase tracking-wide text-optus-ink/60">{phone.brand}</p>{phone.tag ? <Badge>{phone.tag}</Badge> : null}</div>
            <div className="mt-5 flex h-32 items-center justify-center rounded-lg bg-optus-teal-light text-5xl font-black text-optus-teal-dark">{phone.brand.slice(0, 1)}</div>
            <h2 className="mt-4 text-lg font-black text-optus-ink">{phone.name}</h2>
            <p className="mt-1 text-sm text-optus-ink/70">{phone.storage}</p>
            <p className="mt-4 text-2xl font-black text-optus-teal-dark">{formatAud(phone.priceFrom)}<span className="text-sm font-normal text-optus-ink/60"> /mth</span></p>
            <p className="mt-1 text-xs text-optus-ink/60">From {formatAud(phone.upfront)} upfront (demo)</p>
          </article>
        ))}
      </div>
    </div>
  );
}
