import { readJson } from "@/lib/data/json-store";
import type { AddOn } from "@/lib/types";
import { formatAud } from "@/lib/utils/format";

export default async function AddOnsPage() {
  const addOns = await readJson<AddOn[]>("add-ons.json");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-3xl font-black text-optus-ink">Add-ons</h2>
        <p className="text-optus-ink/65">Roaming, entertainment and safety options.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {addOns.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-start justify-between">
              <h3 className="font-black text-optus-ink">{item.name}</h3>
              <span className="rounded-full bg-optus-teal-light px-3 py-1 text-xs font-bold text-optus-navy">
                {item.active ? "Active" : "Available"}
              </span>
            </div>
            <p className="mt-2 text-sm text-optus-ink/65">{item.description}</p>
            <p className="mt-4 text-2xl font-black text-optus-navy">{formatAud(item.price)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
