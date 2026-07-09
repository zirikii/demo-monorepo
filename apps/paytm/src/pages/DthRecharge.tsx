import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { BillForm } from "../components/bills/BillForm";
import { OperatorGrid } from "../components/recharge/OperatorGrid";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { dthProviders } from "../data/operators";
import { dthPacks } from "../data/rechargePlans";
import { formatInr } from "../lib/format";
import { isValidConsumerNumber } from "../lib/validators";
import { Badge } from "../components/ui/Badge";

const dthFaqs = [
  { q: "Where do I find my subscriber ID?", a: "It's on the set-top box sticker, any SMS from your provider, or the on-screen account menu — usually a 10-digit ID or your registered mobile number." },
  { q: "How quickly does the recharge activate?", a: "DTH balances update within a couple of minutes. If channels don't return, a quick set-top box restart usually does it. The demo simulates this instantly." },
  { q: "Can I change my pack while recharging?", a: "Yes — browse the popular packs below and recharge with the matching amount; the provider applies it on their side." },
];

const infoSections = [
  {
    heading: "DTH recharges for every provider",
    paragraphs: [
      "Top up Tata Play, Airtel Digital TV, Dish TV, d2h, or Sun Direct with your subscriber ID. Pick from popular monthly packs or enter a custom amount — confirmations arrive before the next ad break.",
    ],
  },
];

export function DthRechargePage() {
  useDocumentTitle("DTH Recharge Online");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">DTH recharge for all providers</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Recharge your DTH <br /> before the cliffhanger
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              All major set-top box providers with popular packs listed below. Demo simulates the
              payment.
            </p>
          </div>
        }
      >
        <BillForm
          title="DTH Recharge"
          cta="Proceed to Recharge"
          successTitle="DTH Recharge Successful"
          fields={[
            {
              kind: "select",
              id: "provider",
              label: "DTH Provider",
              options: dthProviders.map((p) => ({ value: p.id, label: p.name })),
            },
            {
              kind: "text",
              id: "subscriber",
              label: "Subscriber ID / Mobile",
              placeholder: "Registered ID or mobile number",
              validate: (v) => (isValidConsumerNumber(v) ? undefined : "Enter 6-16 letters or digits"),
            },
            {
              kind: "text",
              id: "amount",
              label: "Amount",
              placeholder: "e.g. 299",
              validate: (v) => (/^\d+$/.test(v) && Number(v) >= 50 ? undefined : "Minimum recharge is ₹50"),
            },
          ]}
          buildSuccessLines={(values) => {
            const provider = dthProviders.find((p) => p.id === values.provider);
            return [
              { label: "Provider", value: provider?.name ?? "—" },
              { label: "Subscriber ID", value: values.subscriber ?? "—" },
              { label: "Amount", value: formatInr(Number(values.amount ?? 0)) },
            ];
          }}
        />
      </FormBand>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <OperatorGrid operators={dthProviders} suffix="DTH" />
        <section aria-label="Popular packs" className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Popular Monthly Packs</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dthPacks.map((pack) => {
              const provider = dthProviders.find((p) => p.id === pack.providerId);
              return (
                <li key={pack.id} className="rounded-xl border border-hairline p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-lg font-extrabold text-paytm-navy">{formatInr(pack.price)}</span>
                    <Badge tone="cyan">{provider?.name}</Badge>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{pack.name}</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {pack.channels} · {pack.validity}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <FaqSection faqs={dthFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
