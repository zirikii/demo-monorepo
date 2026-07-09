import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { BillForm } from "../components/bills/BillForm";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { emiLenders } from "../data/billers";
import { isValidConsumerNumber } from "../lib/validators";
import { formatInr } from "../lib/format";

const emiFaqs = [
  { q: "Which lenders' EMIs can I pay?", a: "Leading NBFCs and banks — Bajaj Finance, HDB, Tata Capital, L&T Finance, Muthoot, and more — using your loan account number." },
  { q: "When should I pay to avoid late fees?", a: "Pay at least a day before the due date; most lenders post payments the same day. Reminders here nudge you three days early." },
  { q: "Will I get a receipt for my records?", a: "Yes — every EMI payment stores a digital receipt with the lender's reference number in your history." },
];

const infoSections = [
  {
    heading: "EMIs on time, credit score intact",
    paragraphs: [
      "Missed EMIs hurt more than late fees — they dent your credit history. Search your lender, enter the loan account number, and clear the month's installment in seconds, with reminders that make sure next month is never a scramble.",
    ],
  },
];

export function LoanEmiPage() {
  useDocumentTitle("Loan EMI Payment");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Loan EMI payment for banks and NBFCs</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Loan EMI due? <br /> Done in a few taps
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              Pay pending EMIs for major lenders and keep your credit record spotless. Demo
              simulates the payment.
            </p>
          </div>
        }
      >
        <BillForm
          title="Pay Loan EMI"
          cta="Fetch EMI & Pay"
          successTitle="EMI Payment Successful"
          fields={[
            {
              kind: "select",
              id: "lender",
              label: "Lender",
              options: emiLenders.map((l) => ({ value: l.id, label: l.name })),
            },
            {
              kind: "text",
              id: "loan",
              label: "Loan Account Number",
              placeholder: "As per your loan statement",
              validate: (v) => (isValidConsumerNumber(v) ? undefined : "Enter 6-16 letters or digits"),
            },
          ]}
          buildSuccessLines={(values) => {
            const lender = emiLenders.find((l) => l.id === values.lender);
            return [
              { label: "Lender", value: lender?.name ?? "—" },
              { label: "Loan Account", value: values.loan ?? "—" },
              { label: "EMI (sample)", value: formatInr(4550) },
            ];
          }}
        />
      </FormBand>

      <FaqSection faqs={emiFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
