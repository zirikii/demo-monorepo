import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { FormBand } from "../components/shared/FormBand";
import { BillForm } from "../components/bills/BillForm";
import { FaqSection } from "../components/shared/FaqSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { electricityBoards, statesWithBoards } from "../data/billers";
import { electricityFaqs } from "../data/faqs";
import { isValidConsumerNumber } from "../lib/validators";
import { formatInr } from "../lib/format";

const infoSections = [
  {
    heading: "Electricity bills without the queue",
    paragraphs: [
      "Pick your state, choose the board, and enter the consumer number printed on any old bill — the amount due is fetched for you. Set a monthly reminder or autopay and the lights stay on without a second thought.",
      "Payments reach most boards within minutes, and your receipt is stored automatically for reimbursements or record-keeping.",
    ],
  },
];

export function ElectricityBillPage() {
  useDocumentTitle("Electricity Bill Payment");

  return (
    <PageLayout withCategoryStrip>
      <h1 className="sr-only">Electricity bill payment for all state boards</h1>
      <FormBand
        aside={
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">
              Pay electricity bills <br /> for every board
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              State discoms and private distributors in one place, with instant confirmations.
              Demo simulates the fetch-and-pay step.
            </p>
          </div>
        }
      >
        <BillForm
          title="Pay Electricity Bill"
          cta="Proceed"
          successTitle="Bill Payment Successful"
          fields={[
            {
              kind: "select",
              id: "state",
              label: "State",
              options: statesWithBoards.map((s) => ({ value: s, label: s })),
            },
            {
              kind: "select",
              id: "board",
              label: "Electricity Board",
              options: electricityBoards.map((b) => ({ value: b.id, label: b.name })),
            },
            {
              kind: "text",
              id: "consumer",
              label: "Consumer Number",
              placeholder: "As printed on your bill",
              validate: (v) =>
                isValidConsumerNumber(v) ? undefined : "Enter 6-16 letters or digits",
              hint: "Find it near your name on any previous bill",
            },
          ]}
          buildSuccessLines={(values) => {
            const board = electricityBoards.find((b) => b.id === values.board);
            return [
              { label: "Board", value: board?.name ?? "—" },
              { label: "Consumer Number", value: values.consumer ?? "—" },
              { label: "Amount (sample)", value: formatInr(1240) },
            ];
          }}
        />
      </FormBand>

      <section aria-label="State-wise electricity bill payment" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-card p-6 shadow-card">
          <h2 className="text-sm font-bold text-ink">Electricity Boards by State</h2>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {electricityBoards.map((b) => (
              <li key={b.id}>
                <Link
                  to="/electricity-bill-payment"
                  className="text-[13px] text-ink-soft hover:text-paytm-cyan"
                >
                  {b.name} Bill Payment
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection faqs={electricityFaqs} />
      <SeoTextBlock sections={infoSections} />
    </PageLayout>
  );
}
