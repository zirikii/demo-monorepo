import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const groups = [
  {
    title: "All the basics, in one place",
    items: [
      "See your everyday account balance",
      "Check statements and transactions",
      "Transfer money to someone or between your accounts",
      "Find your nearest ATM or branch",
      "Update your personal details",
      "Support when you need it with Ceba, your digital banking assistant",
    ],
  },
  {
    title: "Pay bills and manage payments",
    items: [
      "Make one-off or recurring payments with BPAY",
      "Get bills sent straight to NetBank with alerts and reminders",
      "Set up credit card AutoPay",
      "Set up BPAY View AutoPay",
      "Send money to more than 200 countries in over 30 currencies",
      "Receive money from overseas",
    ],
  },
  {
    title: "Manage cards and holiday prep",
    items: [
      "Activate your Debit Mastercard and choose a PIN",
      "Activate your credit card and choose a PIN",
      "Change your credit limit and amend your daily limit",
      "Lock, Block, Limit your credit card",
      "Use Lock, Block, Alert for your Debit Mastercard",
      "Activate, reload currency and secure your Travel Money Card",
    ],
  },
  {
    title: "Manage loans and property",
    items: [
      "View your loan balance and statements",
      "Make extra repayments and redraw",
      "Change your repayment amount or frequency",
      "Change to a fixed rate or refix your home loan",
      "Change to Principal & Interest",
      "Increase (top up) your loan",
    ],
  },
];

export function NetBankInfoPage() {
  useDocumentTitle("NetBank");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Digital banking", to: "/digital-banking" }, { label: "NetBank" }]}
      />
      <PageHero
        eyebrow="Digital banking"
        title="Manage your banking online with NetBank"
        intro="NetBank is CommBank's secure online banking platform, giving you a clear view of your money and the tools to manage it — anytime, anywhere. You can do your day-to-day banking from your laptop or desktop computer."
      >
        <ButtonLink to="/login" variant="dark">
          Log on to NetBank
        </ButtonLink>
        <ButtonLink to="/register" variant="secondary">
          Register for NetBank
        </ButtonLink>
      </PageHero>

      <Section title="What you can do in NetBank">
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="rounded-cba-lg border border-line-soft p-6">
              <h3 className="text-lg font-bold text-ink">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="tint"
        title="Registering for NetBank"
        intro="You can register online with your CommBank card details. You will need a valid email address and an Australian mobile phone number."
      >
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            "Enter your CommBank card number and date of birth",
            "Verify your identity with a NetCode sent by SMS",
            "Create your password and log on with your client number",
          ].map((step, index) => (
            <li key={step} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cba-yellow text-base font-extrabold text-ink">
                {index + 1}
              </span>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
