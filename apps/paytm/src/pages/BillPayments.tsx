import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { billCategories } from "../data/billers";

const infoSections = [
  {
    heading: "One hub for every household bill",
    paragraphs: [
      "Electricity, water, gas, broadband, EMIs, school fees — each category remembers your billers so a monthly chore becomes a ten-second check-in. Add autopay where you want it, keep manual control where you don't.",
      "Everything lands in a single payment history with receipts, so tax time and reimbursements stop being an archaeology project.",
    ],
  },
];

export function BillPaymentsPage() {
  useDocumentTitle("All Bill Payments & Recharges");

  return (
    <PageLayout withCategoryStrip>
      <PageHero
        title={
          <>
            Pay all your bills, <span className="text-paytm-cyan">anytime, anywhere</span>
          </>
        }
        subtitle="Every recharge and bill category in one place — with reminders, autopay, and instant receipts."
      />

      <section aria-label="Bill categories" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {billCategories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={cat.to}
                className="group flex h-full items-start gap-4 rounded-2xl bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-float"
              >
                <span aria-hidden="true" className="text-3xl">
                  {cat.emoji}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-sm font-bold text-ink group-hover:text-paytm-cyan">
                    {cat.label}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                    {cat.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
