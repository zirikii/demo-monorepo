import { useMemo, useState } from "react";
import { Check, ShieldCheck, Sparkles, Store } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, SectionHeading } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { businessCategories, businessProducts } from "@/data/lending";

const pillars = [
  {
    Icon: Store,
    title: "Award-winning business account",
    description:
      "A Business Transaction Account with a $0 monthly account fee option and unlimited electronic transactions.",
  },
  {
    Icon: ShieldCheck,
    title: "CommBank Safe",
    description:
      "Over $900 million invested to protect Australians from scams and fraud, including NameCheck and CallerCheck.",
  },
  {
    Icon: Sparkles,
    title: "Yello for Business",
    description:
      "Offers and benefits for eligible business customers, accessible from your business profile in the app.",
  },
];

export function BusinessPage() {
  useDocumentTitle("Business banking");
  const [category, setCategory] = useState<string>("All");

  const visible = useMemo(
    () => businessProducts.filter((product) => category === "All" || product.category === category),
    [category],
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Business" }]} />
      <PageHero
        eyebrow="Business"
        title="Banking built to keep your business moving"
        description="Accounts, EFTPOS terminals and finance to keep your money safe, your doors open and your cash flow moving."
        actions={
          <>
            <ButtonLink to="/register" variant="secondary" size="lg">
              Open a business account
            </ButtonLink>
            <ButtonLink to="/logon?service=commbiz" variant="outline" size="lg">
              Log on to CommBiz
            </ButtonLink>
          </>
        }
      />

      <section className="py-16">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ Icon, title, description }) => (
              <Card key={title}>
                <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-black" />
                <h2 className="text-lg font-bold text-black">{title}</h2>
                <p className="mt-2 text-sm text-ink-soft">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            title="Explore business products"
            description="Filter by accounts, merchant services, or loans and finance."
          />
          <FilterChips
            className="mt-6"
            options={businessCategories}
            value={category}
            onChange={setCategory}
            ariaLabel="Filter business products by category"
          />
          <p className="mt-4 text-sm text-ink-soft" role="status">
            Showing <strong className="text-black">{visible.length}</strong> of{" "}
            {businessProducts.length} products
          </p>

          {visible.length === 0 ? (
            <EmptyState
              title="No products in that category"
              description="Choose a different category to see the available products."
            />
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  as="article"
                  className="flex h-full flex-col scroll-mt-28"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-black">{product.name}</h3>
                    <Badge tone="yellow">{product.priceLabel}</Badge>
                  </div>
                  <p className="text-sm font-medium text-ink-muted">{product.tagline}</p>
                  <p className="mt-3 text-sm text-ink-soft">{product.description}</p>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-sm text-ink-soft">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-positive"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <ButtonLink to="/register">Apply now</ButtonLink>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Same-day settlement applies to EFTPOS transactions made before 9:30pm Sydney time for
          eligible customers with a Business Transaction Account and a linked CommBank merchant
          facility. Bank fees and charges may apply.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
