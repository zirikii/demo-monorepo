import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { FEATURE_ICONS } from "@/components/marketing/icons";
import { INVESTMENT_MENUS, PLATFORM_FEATURES } from "@/data/products";
import { GROUP_METRICS } from "@/data/site";
import { formatBillions, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function FeaturesBenefitsPage() {
  return (
    <PageLayout title="HUB24 Platform — features & benefits">
      <PageHero
        eyebrow="HUB24 Platform"
        title="Features & benefits"
        body="We're committed to delivering innovative solutions that cater to the diverse needs of your clients, regardless of their investment complexity — all on Australia's best platform."
        crumbs={[{ label: "Home", to: "/" }, { label: "Features & benefits" }]}
        actions={
          <>
            <ButtonLink to="/features-benefits/investment-menu/" size="lg">
              Investment menu
            </ButtonLink>
            <ButtonLink to="/product-documents/" variant="outline" size="lg">
              Product documents
            </ButtonLink>
          </>
        }
      />

      <Section tone="tint">
        <StatBand
          items={[
            { value: `${formatNumber(GROUP_METRICS.managedPortfolios)}+`, label: "Managed portfolios" },
            { value: `${formatNumber(GROUP_METRICS.managedFunds)}+`, label: "Managed funds" },
            { value: `${GROUP_METRICS.exchanges}+`, label: "International exchanges" },
            { value: formatBillions(GROUP_METRICS.platformFua), label: "Platform FUA" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Capability"
          title="Everything the platform does, in one place"
          body="Six capability areas underpin the platform. Each is available across HUB24 Invest, HUB24 Super and, where relevant, SMSF Access."
        />

        <div className="mt-12 flex flex-col gap-14">
          {PLATFORM_FEATURES.map((feature, index) => (
            <div
              key={feature.slug}
              id={feature.slug}
              className={cn(
                "grid items-start gap-8 lg:grid-cols-2",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="flex flex-col gap-4">
                <FeatureIcon icon={FEATURE_ICONS[feature.icon]} />
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {feature.eyebrow}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink-strong md:text-3xl">
                  {feature.title}
                </h3>
                <p className="text-[1.05rem] leading-relaxed text-ink-soft">{feature.body}</p>
              </div>
              <Card className="bg-surface-tint">
                <CheckList items={feature.bullets} />
              </Card>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" id="menus">
        <SectionHeading
          eyebrow="Investment menu"
          title="Flexibility with Discover, Core and Choice"
          body="Every client is different, so we've created three investment menus. Clients can move between them while retaining the same account and underlying investments."
        />
        <Tabs
          ariaLabel="Investment menus"
          className="mt-10"
          items={INVESTMENT_MENUS.map((menu) => ({
            id: menu.id,
            label: menu.name,
            content: (
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-2xl font-semibold text-ink-strong">{menu.name}</h3>
                  <p className="text-[1.05rem] leading-relaxed text-ink-soft">{menu.positioning}</p>
                  <p className="text-[0.95rem] text-ink-faint">
                    <strong className="font-semibold text-ink">Suited to:</strong> {menu.suitedTo}
                  </p>
                  <dl className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Administration fee", value: menu.adminFee },
                      { label: "Account keeping", value: menu.accountKeepingFee },
                      { label: "Minimum", value: menu.minimum },
                    ].map((item) => (
                      <div key={item.label} className="rounded-h24 border border-line bg-white p-4">
                        <dt className="text-xs font-bold tracking-[0.1em] text-ink-ghost uppercase">
                          {item.label}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-ink-strong">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <Card>
                  <p className="text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">
                    Available investments
                  </p>
                  <ul className="mt-4 flex flex-col divide-y divide-line-soft">
                    {menu.options.map((option) => (
                      <li key={option.label} className="flex items-center justify-between gap-4 py-2.5">
                        <span
                          className={cn(
                            "text-[0.95rem]",
                            option.included ? "text-ink" : "text-ink-ghost line-through",
                          )}
                        >
                          {option.label}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            option.included ? "text-positive" : "text-ink-ghost",
                          )}
                        >
                          {option.included ? (option.note ?? "Included") : "Not available"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ),
          }))}
        />
        <p className="mt-8 text-sm text-ink-faint">
          Looking for the cost-effective managed portfolio offer?{" "}
          <Link to="/discover/" className="focus-h24 font-semibold text-h24-teal-dark hover:underline">
            Read about HUB24 Discover
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="See the platform in action"
        body="Book a walkthrough with your Business Development Manager and we'll tailor it to the clients you actually service."
      />
    </PageLayout>
  );
}
