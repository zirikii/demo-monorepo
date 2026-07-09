import { FileText, Download } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { Badge } from "../components/ui/Badge";
import { financialResults, pressReleases } from "../data/company";
import { formatDate } from "../lib/format";

const filings = [
  { id: "f1", date: "2026-07-01", title: "Disclosure under SEBI LODR — board meeting outcome" },
  { id: "f2", date: "2026-06-20", title: "Shareholding pattern for the quarter ended June 2026" },
  { id: "f3", date: "2026-06-05", title: "Intimation of analyst / institutional investor meet" },
  { id: "f4", date: "2026-05-28", title: "Annual Secretarial Compliance Report FY26" },
];

const infoSections = [
  {
    heading: "Investor information, demo edition",
    paragraphs: [
      "This page mirrors the shape of a listed company's investor-relations hub — quarterly results, exchange filings, and press releases — using entirely fictional figures for demonstration. For the real company's disclosures, always refer to official stock-exchange filings.",
    ],
  },
];

export function InvestorRelationsPage() {
  useDocumentTitle("Investor Relations");

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Investor <span className="text-paytm-cyan">Relations</span>
          </>
        }
        subtitle="Financial results, filings, and news for shareholders. All figures on this page are fictional demo content."
      />

      <section aria-label="Financial results" className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Quarterly Results</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {financialResults.map((r) => (
            <li key={r.id} className="rounded-2xl bg-card p-6 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-ink">{r.quarter}</h3>
                <Badge tone="green">{r.change}</Badge>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-paytm-navy">{r.revenue}</p>
              <p className="text-xs text-ink-faint">revenue from operations</p>
              <p className="mt-3 text-xs leading-relaxed text-ink-soft">{r.note}</p>
              <button
                type="button"
                className="mt-4 flex items-center gap-1.5 text-xs font-bold text-paytm-cyan hover:underline"
              >
                <Download aria-hidden="true" className="h-3.5 w-3.5" /> Results PDF (demo)
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Stock exchange filings" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Stock Exchange Filings</h2>
        <ul className="mt-5 divide-y divide-hairline rounded-2xl bg-card px-6 shadow-card">
          {filings.map((f) => (
            <li key={f.id} className="flex items-center gap-4 py-4">
              <FileText aria-hidden="true" className="h-5 w-5 shrink-0 text-paytm-navy" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{f.title}</p>
                <p className="text-xs text-ink-faint">{formatDate(f.date)}</p>
              </div>
              <button type="button" className="text-xs font-bold text-paytm-cyan hover:underline">
                View (demo)
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Press releases" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Press Releases</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pressReleases.map((pr) => (
            <li key={pr.id} className="rounded-2xl bg-card p-6 shadow-card">
              <p className="text-xs font-semibold text-paytm-cyan">{formatDate(pr.date)}</p>
              <h3 className="mt-2 text-sm font-bold leading-snug text-ink">{pr.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{pr.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
