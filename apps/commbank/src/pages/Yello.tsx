import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { formatDateLong } from "@/lib/format";
import { yelloOffers, yelloTiers } from "@/data/yello";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const howItWorks = [
  {
    title: "Bank the way you normally do",
    body: "Your eligibility is assessed monthly, based on your activity in the previous month across eligible CommBank products.",
  },
  {
    title: "See your tier in the app",
    body: "Tap CommBank Yello in the latest version of the CommBank app to see your tier and how you are tracking.",
  },
  {
    title: "Activate and enjoy",
    body: "Activate the offers you want. Cashback on CommBank products is paid automatically to eligible customers.",
  },
];

export function YelloPage() {
  useDocumentTitle("CommBank Yello");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "CommBank Yello" }]} />
      <PageHero
        eyebrow="CommBank Yello"
        title="Unlock value just for banking with us"
        intro="Our customer recognition program gives eligible customers cashback on CommBank products, discounts with participating brands, and access to exclusive experiences."
      >
        <ButtonLink to="#tiers" variant="dark">
          See the tiers
        </ButtonLink>
        <ButtonLink to="#offers" variant="secondary">
          Browse offers
        </ButtonLink>
      </PageHero>

      <Section id="cashback" title="What you could get">
        <dl className="grid gap-6 sm:grid-cols-3">
          {[
            { value: "Up to $460", label: "cashback each year on CommBank products" },
            { value: "Up to $680", label: "in discounts on mobile, NBN and electricity in a year" },
            { value: "Hundreds", label: "of dollars a year on discretionary spending" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-cba-lg bg-cba-yellow p-8">
              <dd className="text-3xl font-extrabold text-ink">{stat.value}</dd>
              <dt className="mt-2 text-[15px] text-ink/80">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="how-it-works" tone="tint" title="How CommBank Yello works">
        <ol className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <li key={step.title} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-base font-extrabold text-cba-yellow">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="tiers"
        title="Tiers and eligibility"
        intro="There are four customer tiers. To be eligible for any tier you must first hold an eligible CommBank transaction account."
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {yelloTiers.map((tier) => (
            <article
              key={tier.name}
              className="flex h-full flex-col rounded-cba-lg border border-line-soft p-6 shadow-cba"
            >
              <Badge tone={tier.name === "Diamond" ? "dark" : "yellow"}>{tier.name}</Badge>
              <p className="mt-3 text-2xl font-extrabold text-ink">{tier.annualValue}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">{tier.requirement}</p>
              <ul className="mt-4 flex-1 space-y-2 border-t border-line-soft pt-4">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-sm leading-relaxed text-ink-soft">
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="offers" tone="tint" title="Current partner offers">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {yelloOffers.map((offer) => (
            <li key={offer.id} className="rounded-cba-lg bg-surface p-6 shadow-cba">
              <Badge tone="muted">{offer.category}</Badge>
              <h3 className="mt-3 text-base font-bold text-ink">{offer.brand}</h3>
              <p className="mt-1 text-[15px] font-bold text-ink">{offer.headline}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{offer.detail}</p>
              <p className="mt-3 text-[12px] text-ink-faint">
                Offer ends {formatDateLong(offer.expires)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "CommBank Yello benefits are provided subject to the program terms and conditions, and the terms of any third-party provider.",
          "Eligibility is assessed monthly based on the previous month's activity. If you do not requalify you may move down one tier.",
          "Travel money cards, corporate credit cards, business debit cards and pre-paid Mastercards are not eligible cards for cashback offers.",
          "All offers shown in this demo are illustrative only.",
        ]}
      />
    </PageLayout>
  );
}
