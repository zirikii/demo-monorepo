import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { faqs } from "@/data/faqs";
import { getProductsByCategory } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const claimSteps = [
  {
    title: "Lodge online",
    body: "Start most claims in the CommBank app or online, 24 hours a day.",
  },
  {
    title: "Add the details",
    body: "Upload photos, receipts and any reports supporting your claim.",
  },
  {
    title: "Track progress",
    body: "Follow your claim status and message your assessor at any time.",
  },
];

export function InsurancePage() {
  useDocumentTitle("Insurance");
  const all = getProductsByCategory("Insurance");
  const home = all.filter((product) =>
    ["home-insurance", "contents-insurance", "landlord-insurance"].includes(product.slug),
  );
  const other = all.filter((product) =>
    ["car-insurance", "travel-insurance"].includes(product.slug),
  );
  const insuranceFaqs = faqs
    .filter((faq) => faq.category === "Insurance")
    .map((faq) => ({ id: faq.id, title: faq.question, content: <p>{faq.answer}</p> }));

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Insurance" }]} />
      <PageHero
        eyebrow="Insurance"
        title="Cover for your home, car and travels"
        intro="Protect the things that matter with cover you can manage in the CommBank app, and save 10% in your first year when you buy online."
      >
        <ButtonLink to="#claims" variant="dark">
          Make a claim
        </ButtonLink>
        <ButtonLink to="/support?category=Insurance" variant="secondary">
          Insurance FAQs
        </ButtonLink>
      </PageHero>

      <Section title="Home, contents and landlord">
        <ProductGrid products={home} />
      </Section>

      <Section id="travel" tone="tint" title="Car and travel">
        <ProductGrid products={other} />
      </Section>

      <Section id="life" title="Life and income protection">
        <div className="grid gap-4 sm:grid-cols-2">
          <LinkCard
            to="/investing-and-super"
            title="Life insurance"
            body="Cover that pays a lump sum to your loved ones, available through our insurance partners."
            eyebrow="Through our partners"
          />
          <LinkCard
            to="/investing-and-super"
            title="Income protection"
            body="Replace a portion of your income if illness or injury stops you working."
            eyebrow="Through our partners"
          />
        </div>
        <p id="income" className="mt-6 max-w-3xl text-[13px] leading-relaxed text-ink-faint">
          Life and income protection products are issued by third-party insurers, not by CommBank.
          In this demo they are illustrative only.
        </p>
      </Section>

      <Section id="claims" tone="tint" title="Making a claim">
        <ol className="grid gap-6 md:grid-cols-3">
          {claimSteps.map((step, index) => (
            <li key={step.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cba-yellow text-base font-extrabold text-ink">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Insurance FAQs">
        <Accordion items={insuranceFaqs} />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Insurance products are issued by an insurer, not by Commonwealth Bank of Australia. Consider the Product Disclosure Statement and Target Market Determination before deciding.",
          "The 10% online discount applies to the first year premium only and is not available in all states.",
          "Eligible CommBank Yello customers may receive $10 monthly cashback on eligible Home and Landlord insurance policies.",
        ]}
      />
    </PageLayout>
  );
}
