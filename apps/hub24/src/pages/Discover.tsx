import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INVESTMENT_MENUS } from "@/data/products";
import { MODELS } from "@/data/platform";
import { formatPercent } from "@/lib/format";

export default function DiscoverPage() {
  const discoverModels = MODELS.filter((model) => model.menu.includes("Discover"));

  return (
    <PageLayout title="HUB24 Discover">
      <PageHero
        eyebrow="New"
        title="HUB24 Discover"
        body="An innovative, cost-effective managed portfolio platform and investment solution designed to support the needs of more of your clients throughout their wealth accumulation and retirement journey."
        crumbs={[{ label: "Home", to: "/" }, { label: "HUB24 Discover" }]}
        actions={
          <>
            <ButtonLink to="/contact-us/" size="lg">
              Talk to your BDM
            </ButtonLink>
            <ButtonLink to="/features-benefits/investment-menu/" variant="outline" size="lg">
              Compare menus
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-h24-xl border border-white/12 bg-white/8 p-7">
            <p className="text-xs font-bold tracking-[0.16em] text-h24-aqua uppercase">
              Discover at a glance
            </p>
            <CheckList
              tone="dark"
              className="mt-4"
              items={[
                "No administration fee",
                "No account keeping fee",
                "Selected managed portfolios from leading managers",
                "Available on HUB24 Invest and HUB24 Super",
              ]}
            />
          </div>
        }
      />

      <Section>
        <SectionHeading
          eyebrow="Why we built it"
          title="We listened to you and broadened the range of our investment menus"
          body="To support early-stage wealth accumulators, later-stage retirees and anyone with simple investment needs, Discover provides a cost-effective option on our award-winning platform."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {INVESTMENT_MENUS.map((menu) => (
            <Card
              key={menu.id}
              className={menu.id === "discover" ? "border-h24-teal ring-1 ring-h24-teal/30" : undefined}
            >
              <div className="flex items-center justify-between gap-3">
                <CardHeading>{menu.name}</CardHeading>
                {menu.id === "discover" ? <Badge>This page</Badge> : null}
              </div>
              <CardBody className="mt-3">{menu.positioning}</CardBody>
              <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Administration fee</dt>
                  <dd className="text-right font-semibold text-ink-strong">{menu.adminFee}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Account keeping</dt>
                  <dd className="text-right font-semibold text-ink-strong">{menu.accountKeepingFee}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Minimum</dt>
                  <dd className="text-right font-semibold text-ink-strong">{menu.minimum}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
          As your clients&apos; needs evolve, they can transition to our Core and Choice menus and
          access a wider range of investment options while retaining the same account and underlying
          investments — without incurring significant costs or CGT.
        </p>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Model range"
          title="Managed portfolios available on Discover"
          body="A streamlined selection from leading portfolio managers, backed by our managed portfolio functionality."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {discoverModels.map((model) => (
            <Card key={model.code} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">
                  {model.code}
                </span>
                <Badge tone="neutral">{model.riskProfile}</Badge>
              </div>
              <CardHeading>{model.name}</CardHeading>
              <CardBody className="flex-1">{model.objective}</CardBody>
              <dl className="grid grid-cols-3 gap-2 border-t border-line pt-4 text-center text-xs">
                <div>
                  <dt className="text-ink-ghost">1yr</dt>
                  <dd className="font-semibold text-positive">{formatPercent(model.oneYearReturn)}</dd>
                </div>
                <div>
                  <dt className="text-ink-ghost">5yr p.a.</dt>
                  <dd className="font-semibold text-ink-strong">{formatPercent(model.fiveYearReturn)}</dd>
                </div>
                <div>
                  <dt className="text-ink-ghost">Mgmt fee</dt>
                  <dd className="font-semibold text-ink-strong">{formatPercent(model.managementFee)}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-faint">
          Performance figures are invented for this demonstration build and are not indicative of any
          real product.
        </p>
      </Section>

      <CtaBand
        title="Bring more clients onto the platform"
        body="Discover complements the existing menus. Talk to us about which segment of your book it suits."
      />
    </PageLayout>
  );
}
