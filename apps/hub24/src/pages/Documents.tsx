import { useMemo, useState } from "react";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Field";
import { DOCUMENTS } from "@/data/documents";
import { formatDate } from "@/lib/format";

export default function DocumentsPage() {
  const [type, setType] = useState("all");
  const rows = useMemo(
    () => DOCUMENTS.filter((doc) => type === "all" || doc.type === type),
    [type],
  );

  return (
    <PageLayout title="Product documents">
      <PageHero
        eyebrow="Disclosure"
        title="HUB24 product documents"
        body="Dummy PDS, TMD and investment booklets for Super, Invest, Pension and Private Invest. Not current disclosure — do not rely on them."
      />
      <Section>
        <div className="mb-6 max-w-xs">
          <label htmlFor="doc-type" className="mb-1.5 block text-sm font-semibold">
            Document type
          </label>
          <Select id="doc-type" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All types</option>
            <option value="PDS">PDS</option>
            <option value="TMD">TMD</option>
            <option value="Investment booklet">Investment booklet</option>
            <option value="Guide">Guide</option>
            <option value="ASX">ASX</option>
          </Select>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {rows.map((doc) => (
            <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{doc.title}</p>
                <p className="text-sm text-ink-faint">
                  {doc.product}
                  {doc.menu ? ` · ${doc.menu}` : ""} · {formatDate(doc.date)}
                </p>
              </div>
              <Badge tone="neutral">{doc.type}</Badge>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
