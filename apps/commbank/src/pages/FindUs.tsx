import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { branches } from "@/data/branches";
import { TextField } from "@/components/ui/TextField";
import { Badge } from "@/components/ui/Badge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function FindUsPage() {
  useDocumentTitle("Find a branch or ATM");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return branches;
    return branches.filter(
      (b) =>
        b.name.toLowerCase().includes(needle) ||
        b.suburb.toLowerCase().includes(needle) ||
        b.state.toLowerCase().includes(needle) ||
        b.postcode.includes(needle),
    );
  }, [q]);

  return (
    <PageLayout>
      <PageHero eyebrow="Support" title="Find us" summary="Search demo branches and ATMs across Australia." />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
        <TextField label="Suburb, city, or postcode" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Bondi, 3000, Perth" />
        <ul className="grid gap-4 md:grid-cols-2">
          {filtered.map((b) => (
            <li key={b.id} className="rounded-xl border border-line bg-card p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-ink">{b.name}</h2>
                {b.hasAtm ? <Badge>ATM</Badge> : null}
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                {b.address}, {b.suburb} {b.state} {b.postcode}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{b.open}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {b.services.join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
