import { readJson } from "@/lib/data/json-store";
import type { SupportCase } from "@/lib/types";
import { formatShortDate } from "@/lib/utils/format";

export default async function SupportCasesPage() {
  const cases = await readJson<SupportCase[]>("support-cases.json");
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-black text-optus-ink">Support cases</h2>
      <p className="mt-1 text-optus-ink/65">Create and track help requests in the demo.</p>
      <div className="mt-6 space-y-3">
        {cases.map((item) => (
          <article key={item.id} className="rounded-2xl bg-surface-subtle p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-black text-optus-ink">{item.subject}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-optus-teal">
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-optus-ink/65">
              {item.service} - {item.priority} priority - updated {formatShortDate(item.updatedAt)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
