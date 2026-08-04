import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { rateRows } from "@/data/rates";
import { formatRate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function RatesPage() {
  useDocumentTitle("Rates & fees");
  return (
    <PageLayout>
      <PageHero
        eyebrow="Tools"
        title="Rates & fees"
        summary="Illustrative demo rates for savings, home loans, and personal lending."
      />
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-10 sm:px-6">
        <table className="min-w-full rounded-xl border border-line bg-card text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Comparison</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rateRows.map((row) => (
              <tr key={row.product} className="border-t border-line">
                <td className="px-4 py-3 font-semibold text-ink">{row.product}</td>
                <td className="px-4 py-3">{formatRate(row.rate)}</td>
                <td className="px-4 py-3">{row.comparison ? formatRate(row.comparison) : "—"}</td>
                <td className="px-4 py-3 text-ink-soft">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
