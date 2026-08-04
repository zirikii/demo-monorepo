import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ButtonLink } from "@/components/ui/Button";
import { appFeatures, awards } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function CommBankAppPage() {
  useDocumentTitle("CommBank app");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Digital banking", to: "/digital-banking" }, { label: "CommBank app" }]}
      />
      <PageHero
        eyebrow="Digital banking"
        title="Australia's best banking app"
        intro="Pay someone, transfer money, manage your cards and bills, and stay aware of your spending patterns — all on the go."
      >
        <ButtonLink to="/login" variant="dark">
          Log on
        </ButtonLink>
        <ButtonLink to="/digital-banking/netbank" variant="secondary">
          Compare with NetBank
        </ButtonLink>
      </PageHero>

      <Section title="What's inside the app">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {appFeatures.map((feature) => (
            <li key={feature.id} className="rounded-cba-lg border border-line-soft p-6">
              <h3 className="text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{feature.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="Recognition">
        <ul className="space-y-2">
          {awards.map((award) => (
            <li key={award.id} className="text-[15px] text-ink-soft">
              {award.label}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-ink-faint">
          The CommBank app is free to download, however your mobile network provider charges you for
          accessing data on your phone. NetBank access with NetCode SMS is required. Minimum
          operating system requirements apply.
        </p>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
