import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { BillForm } from "../components/bills/BillForm";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { fastagIssuers } from "../data/billers";
import { fastagFaqs } from "../data/faqs";
import { isValidVehicleNumber } from "../lib/validators";
import { formatInr } from "../lib/format";

const steps = [
  { n: "1", title: "Pick your issuer bank", body: "Choose the bank that issued your FASTag sticker." },
  { n: "2", title: "Enter vehicle number", body: "The registration on your RC, e.g. DL01AB1234." },
  { n: "3", title: "Add amount & confirm", body: "Top-ups usually reflect in the tag wallet within minutes." },
];

const infoSections = [
  {
    heading: "Never slow down at a toll plaza",
    paragraphs: [
      "A loaded FASTag means every toll gate is a drive-through. Recharge any bank's tag with your vehicle number, set a low-balance alert, and let autopay keep road trips friction-free.",
    ],
  },
];

export function FastagRechargePage() {
  useDocumentTitle("FASTag Recharge Online");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">FASTag recharge for all issuer banks</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              FASTag topped up, <br /> journey uninterrupted
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              Recharge tags issued by any major bank using just your vehicle number. Demo simulates
              the wallet top-up.
            </p>
          </div>
        }
      >
        <BillForm
          title="FASTag Recharge"
          cta="Proceed to Recharge"
          successTitle="FASTag Recharge Successful"
          fields={[
            {
              kind: "select",
              id: "issuer",
              label: "FASTag Issuer Bank",
              options: fastagIssuers.map((i) => ({ value: i.id, label: i.name })),
            },
            {
              kind: "text",
              id: "vehicle",
              label: "Vehicle Number",
              placeholder: "e.g. DL01AB1234",
              validate: (v) => (isValidVehicleNumber(v) ? undefined : "Enter a valid registration, e.g. KA05MN0007"),
            },
            {
              kind: "text",
              id: "amount",
              label: "Amount",
              placeholder: "e.g. 500",
              validate: (v) => (/^\d+$/.test(v) && Number(v) >= 100 ? undefined : "Minimum top-up is ₹100"),
            },
          ]}
          buildSuccessLines={(values) => {
            const issuer = fastagIssuers.find((i) => i.id === values.issuer);
            return [
              { label: "Issuer", value: issuer?.name ?? "—" },
              { label: "Vehicle", value: (values.vehicle ?? "").toUpperCase() },
              { label: "Amount", value: formatInr(Number(values.amount ?? 0)) },
            ];
          }}
        />
      </FormBand>

      <section aria-label="How it works" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-card p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paytm-sky text-sm font-extrabold text-paytm-navy">
                {s.n}
              </span>
              <h2 className="mt-3 text-sm font-bold text-ink">{s.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection faqs={fastagFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
