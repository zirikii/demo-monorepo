import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES, MENUS } from "@/data/products";

export default function FeaturesPage() {
  return (
    <PageLayout title="HUB24 Platform — Features & Benefits">
      <PageHero
        eyebrow="HUB24 Platform"
        title="Together we’re creating Australia’s Best Platform"
        body="We’re committed to innovative solutions that cater to diverse client needs — from Discover for less complex portfolios through to HNW capabilities on Choice and Private Invest."
        actions={<ButtonLink to="/managed-portfolios">Managed portfolios</ButtonLink>}
      />
      <Section>
        <SectionHeading title="Four capabilities advisers ask for first" />
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <article key={feature.title} className="rounded-hub-lg border border-line p-6">
              <p className="text-xs font-bold tracking-[0.14em] text-hub-teal uppercase">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{feature.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeading title="Three investment menus" body="Switch menus as objectives change. Same account, same holdings." />
        <div className="grid gap-6 md:grid-cols-3">
          {MENUS.map((menu) => (
            <div key={menu.name} className="rounded-hub-lg bg-white p-6 shadow-hub">
              <h3 className="text-lg font-bold">{menu.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{menu.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
