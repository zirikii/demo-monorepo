import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { BillForm } from "../components/bills/BillForm";
import { OperatorGrid } from "../components/recharge/OperatorGrid";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { broadbandProviders } from "../data/operators";
import { isValidConsumerNumber } from "../lib/validators";
import { formatInr } from "../lib/format";

const bbFaqs = [
  { q: "Which broadband providers can I pay for?", a: "All major fiber and DSL providers — Airtel Xstream, JioFiber, ACT, BSNL, Hathway, Tata Play Fiber, and many regional ISPs." },
  { q: "What details do I need?", a: "Just your account or landline number as printed on the bill; the amount due is fetched from the provider." },
  { q: "Can I set autopay for my wifi bill?", a: "Yes — enable autopay once and every cycle is cleared on the due date, with an alert before any debit." },
];

const infoSections = [
  {
    heading: "Wifi bills, paid before buffering starts",
    paragraphs: [
      "Fetch your latest broadband or landline bill with the account number, pay in seconds, and keep streaming. Autopay and reminders make sure the connection never drops on a due date.",
    ],
  },
];

export function BroadbandBillPage() {
  useDocumentTitle("Broadband & Landline Bill Payment");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Broadband and landline bill payment</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Broadband dues, <br /> cleared instantly
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              Fiber, DSL, and landline bills for every major provider. Demo simulates the
              fetch-and-pay flow.
            </p>
          </div>
        }
      >
        <BillForm
          title="Pay Broadband / Landline Bill"
          cta="Fetch Bill & Pay"
          successTitle="Bill Payment Successful"
          fields={[
            {
              kind: "select",
              id: "provider",
              label: "Service Provider",
              options: broadbandProviders.map((p) => ({ value: p.id, label: p.name })),
            },
            {
              kind: "text",
              id: "account",
              label: "Account / Landline Number",
              placeholder: "As printed on your bill",
              validate: (v) => (isValidConsumerNumber(v) ? undefined : "Enter 6-16 letters or digits"),
            },
          ]}
          buildSuccessLines={(values) => {
            const provider = broadbandProviders.find((p) => p.id === values.provider);
            return [
              { label: "Provider", value: provider?.name ?? "—" },
              { label: "Account", value: values.account ?? "—" },
              { label: "Amount (sample)", value: formatInr(899) },
            ];
          }}
        />
      </FormBand>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <OperatorGrid operators={broadbandProviders} suffix="Bill Payment" />
      </div>

      <FaqSection faqs={bbFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
