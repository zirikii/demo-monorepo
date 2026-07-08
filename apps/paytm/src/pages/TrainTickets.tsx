import { useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { isValidPnr } from "../lib/validators";
import { popularTrains } from "../data/travel";

const trainFaqs = [
  { q: "Can I check PNR status here?", a: "Yes — enter your 10-digit PNR and the demo shows a sample confirmation status; the real product fetches live IRCTC data." },
  { q: "Which classes can I book?", a: "Sleeper, 3A, 2A, 1A, Chair Car, and Executive — availability is shown per train before you pay." },
  { q: "Do I need an IRCTC account?", a: "Yes, train bookings ride on your IRCTC user ID; linking it once enables faster checkouts." },
];

const infoSections = [
  {
    heading: "Train travel with fewer surprises",
    paragraphs: [
      "Live seat availability, waitlist confirmation odds, platform alerts, and PNR tracking keep long journeys predictable. Book with your IRCTC ID and manage the whole trip — meals, coach position, delays — from one screen.",
    ],
  },
];

export function TrainTicketsPage() {
  useDocumentTitle("Train Ticket Booking & PNR Status");
  const [pnr, setPnr] = useState("");
  const [pnrError, setPnrError] = useState<string | undefined>();
  const [pnrResult, setPnrResult] = useState<string | null>(null);

  const checkPnr = () => {
    if (!isValidPnr(pnr)) {
      setPnrError("Enter the 10-digit PNR from your ticket");
      setPnrResult(null);
      return;
    }
    setPnrError(undefined);
    setPnrResult(`PNR ${pnr}: CNF · Coach B4, Seat 32 (demo status)`);
  };

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Book train tickets and check PNR status</h1>
      <section className="bg-gradient-to-r from-[#0080c4] via-paytm-cyan to-[#31c7f5] pb-10 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-5 text-2xl font-extrabold text-white">Train Tickets & PNR Status</h2>
          <form
            aria-label="Check PNR status"
            className="grid gap-5 rounded-2xl bg-card p-6 shadow-float sm:grid-cols-[1fr_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              checkPnr();
            }}
          >
            <TextField
              label="PNR Number"
              placeholder="10-digit PNR"
              inputMode="numeric"
              maxLength={10}
              value={pnr}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, ""))}
              error={pnrError}
              hint="Any 10 digits work in this demo"
            />
            <Button type="submit" size="lg" className="self-end">
              Check PNR Status
            </Button>
          </form>
          {pnrResult ? (
            <p role="status" className="mt-4 rounded-xl bg-white/95 px-4 py-3 text-sm font-semibold text-success shadow-card">
              {pnrResult}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <section aria-label="Popular trains" className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Popular Trains</h2>
          <ul className="mt-4 divide-y divide-hairline">
            {popularTrains.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-4 py-4">
                <div className="min-w-48">
                  <p className="text-sm font-bold text-ink">
                    {t.number} · {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {t.from} → {t.to}
                  </p>
                </div>
                <p className="text-xs text-ink-soft">
                  Departs <span className="font-semibold text-ink">{t.departs}</span> · {t.duration}
                </p>
                <div className="ml-auto flex items-center gap-1.5">
                  {t.classes.map((c) => (
                    <Badge key={c} tone="cyan">
                      {c}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FaqSection faqs={trainFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
