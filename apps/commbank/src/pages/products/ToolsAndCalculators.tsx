import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/ui/Card";
import { RepaymentCalculator } from "@/components/tools/RepaymentCalculator";
import { BorrowingPowerCalculator } from "@/components/tools/BorrowingPowerCalculator";
import { SavingsGoalCalculator } from "@/components/tools/SavingsGoalCalculator";
import { FxCalculator } from "@/components/tools/FxCalculator";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const sections = [
  {
    id: "repayments",
    title: "Home loan repayments",
    description: "See what your repayments could be and how much interest you'd pay over the term.",
    Component: RepaymentCalculator,
  },
  {
    id: "borrowing-power",
    title: "Borrowing power",
    description:
      "Get an indication of how much you may be able to borrow based on your income and expenses.",
    Component: BorrowingPowerCalculator,
  },
  {
    id: "savings-goal",
    title: "Savings goal",
    description:
      "Work out how long it takes to reach a savings target, and how much of it is interest.",
    Component: SavingsGoalCalculator,
  },
  {
    id: "foreign-exchange",
    title: "Foreign exchange",
    description:
      "Convert Australian dollars into more than 10 currencies at indicative retail rates.",
    Component: FxCalculator,
  },
];

export function ToolsAndCalculatorsPage() {
  useDocumentTitle("Tools & calculators");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Tools & calculators" }]} />
      <PageHero
        eyebrow="Tools"
        title="Tools & calculators"
        description="Four working calculators to help you plan a home loan, a savings goal, or a trip overseas."
        tone="light"
      />

      <nav aria-label="Calculators" className="border-b border-line bg-surface py-4">
        <ul className="container-page flex flex-wrap gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="focus-ring inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-black hover:text-black"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map(({ id, title, description, Component }, index) => (
        <section
          key={id}
          id={id}
          className={
            index % 2 === 0
              ? "scroll-mt-28 py-14"
              : "scroll-mt-28 border-y border-line bg-surface-tint py-14"
          }
        >
          <div className="container-page">
            <SectionHeading title={title} description={description} className="mb-10" />
            <Component />
          </div>
        </section>
      ))}

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          All calculators produce estimates only, based on the assumptions stated alongside each
          result. They exclude fees and charges and are not an offer of credit.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
