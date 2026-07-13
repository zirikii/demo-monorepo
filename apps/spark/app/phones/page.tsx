import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import { formatNzd } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

type Phone = {
  id: string;
  name: string;
  brand: string;
  priceFrom: number;
  upfront: number;
  storage: string;
  tag?: string;
};

export const metadata: Metadata = { title: "Mobile phones" };

export default async function PhonesPage() {
  const phones = await readJson<Phone[]>("phones.json");

  return (
    <div className="container py-14">
      <h1 className="text-4xl font-bold text-spark-ink">Mobile phones</h1>
      <p className="mt-4 max-w-2xl text-spark-ink/80">
        Pair a new 5G handset with an Endless plan. Prices shown are demo monthly device payments.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {phones.map((phone) => (
          <article key={phone.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-spark-ink/60">
                {phone.brand}
              </p>
              {phone.tag ? <Badge>{phone.tag}</Badge> : null}
            </div>
            <h2 className="mt-2 text-lg font-bold text-spark-ink">{phone.name}</h2>
            <p className="mt-1 text-sm text-spark-ink/70">{phone.storage}</p>
            <p className="mt-4 text-2xl font-bold text-spark-purple">
              {formatNzd(phone.priceFrom)}
              <span className="text-sm font-normal text-spark-ink/60"> /mth</span>
            </p>
            <p className="mt-1 text-xs text-spark-ink/60">
              From {formatNzd(phone.upfront)} upfront (demo)
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
