import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function LegalShell({
  title,
  intro,
  breadcrumb,
  children,
}: {
  title: string;
  intro: string;
  breadcrumb: string;
  children: ReactNode;
}) {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: breadcrumb }]} />
      <PageHero tone="light" title={title} intro={intro} />
      <Section>
        <div className="max-w-3xl">{children}</div>
      </Section>
    </PageLayout>
  );
}

const productCategories = [
  {
    id: "bank-accounts",
    title: "Bank accounts",
    content: (
      <p>
        Retail Banking Services Financial Services Guide, transaction and savings account Terms and
        Conditions, Debit Mastercard Conditions of Use, and Target Market Determinations.
      </p>
    ),
  },
  {
    id: "credit-cards",
    title: "Credit cards",
    content: (
      <p>
        Conditions of Use for consumer credit cards, Awards program terms, Key Facts Sheets and
        Target Market Determinations.
      </p>
    ),
  },
  {
    id: "home-loans",
    title: "Home loans",
    content: (
      <p>
        Consumer Mortgage Lending Products Terms and Conditions, Wealth Package product guide,
        Interest Only switching guide, discharge and refinance authority forms, and the FASTRefi
        guide.
      </p>
    ),
  },
  {
    id: "insurance",
    title: "Insurance products",
    content: (
      <p>
        Product Disclosure Statements and Financial Services Guides for home, contents, landlord,
        car and travel insurance issued by our insurance partners.
      </p>
    ),
  },
  {
    id: "investing",
    title: "Investment and superannuation products",
    content: (
      <p>
        CommSec Financial Services Guide, Terms and Conditions for share trading accounts, and
        Product Disclosure Statements for superannuation products.
      </p>
    ),
  },
];

export function ImportantInfoPage() {
  useDocumentTitle("Important information");

  return (
    <LegalShell
      breadcrumb="Important information"
      title="Important information — personal"
      intro="Financial Services Guides, Product Disclosure Statements, Terms and Conditions and Target Market Determinations across our product categories."
    >
      <Accordion items={productCategories} />
      <p className="mt-8 text-[13px] leading-relaxed text-ink-faint">
        This is a demo site. No genuine disclosure documents are hosted here. For real product
        documentation, refer to the official Commonwealth Bank of Australia website.
      </p>
    </LegalShell>
  );
}

export function PrivacyPage() {
  useDocumentTitle("Privacy");

  return (
    <LegalShell
      breadcrumb="Privacy"
      title="Privacy policy"
      intro="How this demo handles information. Because it is a demo, no personal information is collected, transmitted or stored on a server."
    >
      <div className="space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          Everything you enter in this demo — login details, transfers, payments, settings — is kept
          only in your own browser using localStorage. Nothing is sent to a server, and there is no
          backend, database or analytics provider behind this site.
        </p>
        <p>
          Clearing your browser storage will reset the demo to its seeded state, including all
          accounts, transactions and card lock states.
        </p>
        <p>
          The mock login accepts any client number and password. It is intentionally insecure and
          must never be reused for anything other than demonstration.
        </p>
        <p>
          This site is not affiliated with, endorsed by, or connected to Commonwealth Bank of
          Australia. Brand assets are used only to demonstrate visual fidelity.
        </p>
      </div>
    </LegalShell>
  );
}

export function AccessibilityPage() {
  useDocumentTitle("Accessibility");

  return (
    <LegalShell
      breadcrumb="Accessibility"
      title="Accessibility"
      intro="We build for keyboard, screen reader and high-contrast use. Here is what this demo does and where support is available."
    >
      <div className="space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          Every interactive control in this demo is reachable by keyboard and shows a visible focus
          ring. Navigation landmarks are labelled, the active page is marked with{" "}
          <code className="rounded bg-surface-tint px-1.5 py-0.5 text-[15px]">aria-current</code>,
          and expandable menus report their state with{" "}
          <code className="rounded bg-surface-tint px-1.5 py-0.5 text-[15px]">aria-expanded</code>.
        </p>
        <p>
          A skip link at the top of every page jumps straight to the main content. Decorative icons
          are hidden from assistive technology, and icon-only buttons carry accessible names.
        </p>
        <p>
          In the real world, customers who are deaf or hard of hearing can contact the bank through
          the National Relay Service on 133 677, and interpreter services are available at many
          branches. All ATMs are audio-enabled with touchscreen technology.
        </p>
      </div>
    </LegalShell>
  );
}
