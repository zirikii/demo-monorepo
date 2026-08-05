import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { LifeStages } from "@/components/marketing/LifeStages";
import { ComparisonTable } from "@/components/products/ComparisonTable";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { RateTable } from "@/components/ui/RateTable";
import { getProductsByCategory, products } from "@/data/products";
import { savingsRates } from "@/data/rates";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const steps = [
  {
    title: "Choose your account",
    body: "Start by selecting a bank account that matches how you plan to use it — everyday spending, saving money, or managing your finances online.",
  },
  {
    title: "Apply online in minutes",
    body: "Most personal bank accounts can be opened online without visiting a branch. You will need identity documents and an Australian mobile number.",
  },
  {
    title: "Activate and start banking",
    body: "Access your account in NetBank and the CommBank app, activate your debit card, and set up payments, transfers and savings goals.",
  },
];

export function BankAccountsPage() {
  useDocumentTitle("Bank accounts");
  const accounts = getProductsByCategory("Bank accounts");
  const everyday = accounts.filter((product) => product.slug === "smart-access");
  const savings = accounts.filter((product) =>
    ["netbank-saver", "goalsaver", "youthsaver", "term-deposit"].includes(product.slug),
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking", to: "/banking" }, { label: "Bank accounts" }]} />
      <PageHero
        eyebrow="Bank accounts"
        title="Our range of bank accounts"
        intro="Everyday transaction accounts for your day-to-day spending, and savings accounts to help you reach your goals."
      >
        <ButtonLink to="#compare" variant="dark">
          Compare accounts
        </ButtonLink>
        <ButtonLink to="/tools-and-calculators#savings" variant="secondary">
          Savings calculator
        </ButtonLink>
      </PageHero>

      <Section
        id="debit"
        title="Everyday accounts"
        intro="Everyday transaction accounts for your day-to-day spending and banking needs."
      >
        <ProductGrid products={everyday} />
      </Section>

      <Section
        id="savings"
        tone="tint"
        title="Savings accounts & Term Deposits"
        intro="Savings accounts to give you greater peace of mind and help you reach your savings goals."
      >
        <ProductGrid products={savings} />
      </Section>

      <Section id="term-deposits" title="Current savings rates">
        <div className="space-y-10">
          {savingsRates.map((group) => (
            <RateTable key={group.id} group={group} />
          ))}
        </div>
      </Section>

      <Section id="compare" tone="tint" title="Compare our accounts">
        <ComparisonTable products={accounts} caption="Comparison of CommBank bank accounts" />
      </Section>

      <Section id="youth" title="How to open a bank account">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-cba-lg border border-line-soft p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cba-yellow text-base font-extrabold text-ink">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <LifeStages />

      <Section
        id="moving"
        tone="tint"
        title="Securely manage your accounts, when and where it suits you"
        intro="Our award-winning digital technology gives you the freedom and flexibility to access, track and manage your money on a range of devices."
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "CommBank app",
              body: "Bank on the go, pay someone, and track your spending.",
            },
            { title: "NetBank", body: "Handle more complex tasks from your laptop or desktop." },
            { title: "Digital wallets", body: "Pay with your phone or wearable wherever you are." },
          ].map((item) => (
            <li key={item.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <h3 className="text-[15px] font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="students" title="Accounts for every stage">
        <p className="max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Students and apprentices, concession card holders, retirees, parents opening an account
          for a child, and teenagers from 14 can all access fee-free or reduced-fee everyday
          banking. Speak with us in branch or message us in the CommBank app to check which options
          apply to you.
        </p>
        <p id="concession" className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          The Pensioner Security Account is available to eligible pension and concession card
          holders over 55, and pays interest on your balance with no monthly account fee.
        </p>
        <p id="retirees" className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Retirees can combine a Pensioner Security Account with a Term Deposit to balance access
          with a fixed return. Our {products.length} demo products are illustrative only.
        </p>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
