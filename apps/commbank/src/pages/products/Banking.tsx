import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { primaryNav } from "@/data/nav";

const netbankCapabilities = [
  "Manage your accounts, balances and transactions in one place",
  "Make and schedule payments, including transfers and bills",
  "Control your debit card and adjust ATM, cash and transfer limits",
  "View statements and important account information online",
];

export function BankingPage() {
  useDocumentTitle("Banking");
  const bankingNav = primaryNav.find((item) => item.id === "banking");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking" }]} />
      <PageHero
        eyebrow="Banking"
        title="Everyday banking that works the way you do"
        description="Transaction and savings accounts, credit cards, personal loans and the digital tools to manage them — all in one place."
        actions={
          <>
            <ButtonLink to="/banking/bank-accounts" variant="secondary" size="lg">
              Compare bank accounts
            </ButtonLink>
            <ButtonLink to="/banking/savings-accounts" variant="outline" size="lg">
              Compare savings accounts
            </ButtonLink>
          </>
        }
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading
            title="Explore banking"
            description="Pick a category to compare products, rates and features."
          />
          <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {bankingNav?.columns.map((column) => (
              <div key={column.heading} className="border-t-2 border-black pt-5">
                <h3 className="text-lg font-bold text-black">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="focus-ring inline-flex items-center gap-1.5 rounded text-sm text-ink-soft hover:text-black hover:underline"
                      >
                        {link.label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="NetBank"
              title="Manage your banking online with NetBank"
              description="NetBank is CommBank's secure online banking platform, giving you a clear view of your money and the tools to manage it — anytime, anywhere."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/logon">Log on to NetBank</ButtonLink>
              <ButtonLink to="/digital-banking/netbank" variant="outline">
                Learn more
              </ButtonLink>
            </div>
          </div>
          <ul className="space-y-3">
            {netbankCapabilities.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-line bg-surface px-5 py-4 text-sm text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Terms, conditions, fees, charges and eligibility criteria apply to all banking products.
          Every product detail on this page is demo content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
