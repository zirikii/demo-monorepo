import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/ui/Card";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function LegalShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PageLayout>
      <Breadcrumb items={[{ label: title }]} />
      <PageHero eyebrow="Legal" title={title} description={description} tone="light" />
      <section className="py-12">
        <div className="container-page max-w-3xl space-y-6 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      </section>
      <ThingsYouShouldKnow>
        <p>
          These legal pages are illustrative placeholders written for the demo. They are not real
          policies and create no obligations.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}

export function PrivacyPage() {
  useDocumentTitle("Privacy");
  return (
    <LegalShell
      title="Privacy"
      description="How this demo application handles the small amount of data it stores."
    >
      <h2 className="text-lg font-bold text-black">What this demo stores</h2>
      <p>
        This application stores everything locally in your browser using <code>localStorage</code>.
        That includes your mock session, the demo account balances and transactions, your card
        toggle states, and your settings preferences. Nothing is transmitted to a server.
      </p>
      <h2 className="text-lg font-bold text-black">What it does not do</h2>
      <p>
        It does not use cookies for tracking, does not run analytics, and does not integrate with
        any real banking, identity, payment or advertising system. There is no back end.
      </p>
      <h2 className="text-lg font-bold text-black">Clearing your data</h2>
      <p>
        Clearing site data for this origin in your browser removes everything the demo has stored.
        You can also reset the demo accounts from{" "}
        <Link to="/netbank/settings" className="font-semibold text-black underline">
          NetBank settings
        </Link>
        .
      </p>
    </LegalShell>
  );
}

export function TermsPage() {
  useDocumentTitle("Terms of use");
  return (
    <LegalShell
      title="Terms of use"
      description="The terms that apply to this unofficial demonstration application."
    >
      <h2 className="text-lg font-bold text-black">Not a bank</h2>
      <p>
        This application is an unofficial user-interface demonstration. It is not operated by,
        affiliated with, or endorsed by the Commonwealth Bank of Australia. No banking services are
        provided and no real money can be moved.
      </p>
      <h2 className="text-lg font-bold text-black">No advice</h2>
      <p>
        Nothing in this application is financial, credit, tax or legal advice. All rates, fees,
        product features and calculator outputs are fabricated for illustration.
      </p>
      <h2 className="text-lg font-bold text-black">Trade marks</h2>
      <p>
        Brand names and marks referenced here remain the property of their respective owners and are
        used only to make the demonstration recognisable.
      </p>
    </LegalShell>
  );
}

export function AccessibilityPage() {
  useDocumentTitle("Accessibility");
  return (
    <LegalShell title="Accessibility" description="How this demo approaches accessible design.">
      <SectionHeading title="Our approach" className="mb-2" />
      <p>
        This demo was built to be keyboard navigable and screen-reader friendly. Interactive
        controls expose their state, and every page follows a single logical heading order.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>A skip link jumps straight to the main content on every page.</li>
        <li>
          Menus and disclosures expose <code>aria-expanded</code>, and filter chips expose{" "}
          <code>aria-pressed</code>.
        </li>
        <li>
          Toggles are implemented as <code>role=&quot;switch&quot;</code> with{" "}
          <code>aria-checked</code>.
        </li>
        <li>All interactive controls show a visible focus ring.</li>
        <li>Data tables use scoped row and column headers with a caption.</li>
        <li>Live regions announce calculator results and filter counts as they change.</li>
      </ul>
    </LegalShell>
  );
}

const infoCategories = [
  {
    heading: "Bank accounts",
    items: [
      "Transaction and Savings Accounts Terms and Conditions",
      "Electronic Banking Terms and Conditions",
      "Financial Services Guide",
    ],
  },
  {
    heading: "Credit cards",
    items: [
      "Credit Card Conditions of Use",
      "Commonwealth Awards Program Terms and Conditions",
      "Credit Card Insurances Product Disclosure Statement",
    ],
  },
  {
    heading: "Home loans",
    items: [
      "Consumer Mortgage Lending Products Terms and Conditions",
      "Home Loan Product Guide",
      "Wealth Package Terms and Conditions",
    ],
  },
  {
    heading: "Personal lending",
    items: ["Personal Loan Terms and Conditions", "Personal Overdraft Terms and Conditions"],
  },
  {
    heading: "Insurance",
    items: [
      "Home Insurance Product Disclosure Statement",
      "Car Insurance Product Disclosure Statement",
      "Premium, Excess and Discount Guide",
    ],
  },
  {
    heading: "Business",
    items: [
      "Terms and Conditions for Business Transaction and Savings Accounts",
      "Merchant Agreement",
      "Business Overdraft Terms and Conditions",
    ],
  },
];

export function ImportantInfoPage() {
  useDocumentTitle("Important information");
  return (
    <LegalShell
      title="Important information"
      description="Product disclosure statements, terms and conditions, and guides by product category."
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {infoCategories.map((category) => (
          <div key={category.heading}>
            <h2 className="text-base font-bold text-black">{category.heading}</h2>
            <ul className="mt-3 space-y-2">
              {category.items.map((item) => (
                <li key={item} className="text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-line pt-6">
        In the real world these documents would be downloadable PDFs. In this demo they are listed
        to mirror the structure of the site and are not available.
      </p>
    </LegalShell>
  );
}
