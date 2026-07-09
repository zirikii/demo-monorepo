import { QrCode, Banknote, ScanLine, BellRing, ShieldCheck, Send } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { PageHero } from "../components/shared/PageHero";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { AppStoreBadges } from "../components/shared/AppStoreBadges";
import { upiFaqs } from "../data/faqs";
import { safetyTips } from "../data/support";

const features = [
  { icon: Send, title: "Send to any UPI app", body: "Pay any UPI ID or number — receivers don't need this app to get money instantly." },
  { icon: Banknote, title: "Straight from your bank", body: "Real-time account-to-account transfers, 24x7, weekends and holidays included." },
  { icon: ScanLine, title: "One scanner for everything", body: "Shops, street vendors, bills, autos — a single scan-and-pay flow everywhere." },
  { icon: BellRing, title: "Reminders & autopay", body: "Schedule rent, EMIs, and subscriptions so due dates never sneak up." },
  { icon: QrCode, title: "Receive with your QR", body: "Share a personal QR to collect payments — settled directly to your account." },
  { icon: ShieldCheck, title: "Protected by design", body: "Device binding, UPI PIN, and real-time fraud checks guard every rupee." },
];

const steps = [
  { n: "1", title: "Link your bank account", body: "Verify your mobile number and pick your bank — your UPI ID is created instantly." },
  { n: "2", title: "Set your UPI PIN", body: "A one-time setup with your debit card details; the PIN stays with you alone." },
  { n: "3", title: "Scan or enter and pay", body: "Scan any QR or type a UPI ID/number, confirm the amount, enter the PIN, done." },
];

const infoSections = [
  {
    heading: "Why pay with UPI here",
    paragraphs: [
      "A payments home that shows balances across linked accounts, categorises spends automatically, and produces a monthly statement you can export to Excel or PDF. Splitting a dinner bill, collecting society dues, or requesting rent from a flatmate all take a couple of taps.",
      "Everything rides on the same UPI rails banks use, and the demo build simulates these flows without moving money.",
    ],
  },
];

export function UpiPage() {
  useDocumentTitle("UPI Money Transfer");

  return (
    <PageLayout>
      <PageHero
        tone="navy"
        title={
          <>
            Pay anyone, directly from your <span className="text-paytm-cyan">bank account</span>
          </>
        }
        subtitle="BHIM UPI money transfers that are instant, free, and work with every UPI app in India."
      >
        <AppStoreBadges />
      </PageHero>

      <section aria-label="UPI features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-2xl bg-card p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paytm-sky">
                <Icon aria-hidden="true" className="h-5 w-5 text-paytm-navy" />
              </span>
              <h2 className="mt-4 text-sm font-bold text-ink">{title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="How to get started" className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-paytm-navy">Get started in three steps</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-hairline p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paytm-cyan text-sm font-extrabold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 text-sm font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Safety tips" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-paytm-navy">Stay safe while you pay</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {safetyTips.map((tip) => (
            <li key={tip.title} className="rounded-2xl border border-warning/40 bg-warning/5 p-5">
              <h3 className="text-sm font-bold text-ink">{tip.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{tip.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection faqs={upiFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
