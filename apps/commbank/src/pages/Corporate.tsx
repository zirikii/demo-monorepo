import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { NewsTeasers } from "@/components/marketing/NewsTeasers";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const groupFacts = [
  { label: "Customers", value: "17.6 million" },
  { label: "Employees", value: "53,000+" },
  { label: "Branches", value: "709" },
  { label: "ATMs", value: "1,916" },
];

const brands = [
  "Bankwest",
  "ASB Bank",
  "Colonial First State",
  "CommSec",
  "CommInsure",
  "Kit",
  "Truyu",
  "Home-in",
];

export function AboutUsPage() {
  useDocumentTitle("About us");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "About us" }]} />
      <PageHero
        eyebrow="About us"
        title="About CommBank"
        intro="Commonwealth Bank of Australia is Australia's largest retail bank, offering banking, lending, insurance, investing and institutional services to customers here and overseas."
      >
        <ButtonLink to="/careers" variant="dark">
          Careers
        </ButtonLink>
        <ButtonLink to="/newsroom" variant="secondary">
          Newsroom
        </ButtonLink>
      </PageHero>

      <Section title="The group at a glance">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groupFacts.map((fact) => (
            <div key={fact.label} className="rounded-cba-lg border border-line-soft p-6">
              <dd className="text-3xl font-extrabold text-ink">{fact.value}</dd>
              <dt className="mt-1 text-[13px] uppercase tracking-wider text-ink-faint">
                {fact.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[13px] text-ink-faint">
          Illustrative demo figures based on publicly reported group metrics.
        </p>
      </Section>

      <Section tone="tint" title="Our brands and subsidiaries">
        <ul className="flex flex-wrap gap-3">
          {brands.map((brand) => (
            <li
              key={brand}
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink"
            >
              {brand}
            </li>
          ))}
        </ul>
      </Section>

      <NewsTeasers limit={3} />
      <HelpBlock />
    </PageLayout>
  );
}

const roleAreas = [
  {
    title: "Technology",
    body: "Engineering, data, cyber security and platform teams building the CommBank app and NetBank.",
  },
  {
    title: "Retail Banking Services",
    body: "Branch, contact centre and home lending roles supporting personal customers.",
  },
  {
    title: "Business Banking",
    body: "Relationship managers, merchant specialists and asset finance teams.",
  },
  {
    title: "Institutional Banking & Markets",
    body: "Markets, capital markets, transaction banking and sustainable finance.",
  },
  {
    title: "Risk & Financial Services",
    body: "Credit, compliance, financial crime, finance and treasury.",
  },
  {
    title: "Graduates & interns",
    body: "Structured programs across technology, banking, risk and corporate functions.",
  },
];

export function CareersPage() {
  useDocumentTitle("Careers");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Careers" }]} />
      <PageHero
        tone="dark"
        eyebrow="Careers"
        title="Build a career at CommBank"
        intro="Work on products used by millions of Australians every day, from the CommBank app to the systems that move money across the country."
      >
        <ButtonLink to="/support/contact-us" variant="primary">
          Register your interest
        </ButtonLink>
      </PageHero>

      <Section title="Where you could work">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roleAreas.map((area) => (
            <li key={area.title} className="rounded-cba-lg border border-line-soft p-6">
              <h2 className="text-lg font-bold text-ink">{area.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{area.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-ink-faint">
          This is a demo site. No roles are advertised and no applications are accepted.
        </p>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
