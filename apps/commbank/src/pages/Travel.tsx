import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { ForeignExchangeCalculator } from "@/components/calculators/ForeignExchangeCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const beforeYouGo = [
  "Tell us before you go so we can keep an eye out for suspicious activity",
  "Activate your credit card international travel insurance",
  "Check the foreign exchange rate and load your Travel Money Card",
  "Set travel-friendly limits with Lock, Block, Limit",
  "Save our overseas contact number: +61 2 9999 3283",
];

export function TravelPage() {
  useDocumentTitle("Travel & international");

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Banking", to: "/banking" }, { label: "Travel & international" }]}
      />
      <PageHero
        eyebrow="Travel & international"
        title="Travel money and overseas payments"
        intro="Get trip-ready with the Travel Money Card — load up to 16 currencies for exchange rate certainty — plus international money transfers to more than 200 countries."
      >
        <ButtonLink to="#fx" variant="dark">
          Foreign exchange calculator
        </ButtonLink>
        <ButtonLink to="/products/travel-insurance" variant="secondary">
          Travel insurance
        </ButtonLink>
      </PageHero>

      <Section title="Travel products & services">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LinkCard
            to="/products/travel-insurance"
            title="Travel insurance"
            body="Single trip and annual multi-trip cover for overseas medical costs, cancellation and luggage."
          />
          <LinkCard
            to="/bank-accounts"
            title="Travel Money Card"
            body="Load up to 16 currencies and lock in your exchange rate before you leave."
          />
          <LinkCard
            to="/credit-cards"
            title="Cards with $0 international fees"
            body="The Ultimate Awards Credit Card charges no international transaction fees on overseas spend."
          />
        </div>
      </Section>

      <Section id="imt" tone="tint" title="International money transfers">
        <p className="max-w-3xl text-[17px] leading-relaxed text-ink-soft">
          Send money to more than 200 countries in over 30 currencies from NetBank or the CommBank
          app, and receive money from overseas into your everyday account. Transfers made in a
          foreign currency have no CommBank transfer fee.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Countries", value: "200+" },
            { label: "Currencies", value: "30+" },
            { label: "Fee in foreign currency", value: "$0" },
            { label: "Fee in AUD", value: "$6" },
          ].map((item) => (
            <li key={item.label} className="rounded-cba-lg bg-surface p-5 shadow-cba">
              <p className="text-2xl font-extrabold text-ink">{item.value}</p>
              <p className="mt-1 text-[13px] text-ink-faint">{item.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="fx" title="Foreign exchange calculator">
        <ForeignExchangeCalculator />
      </Section>

      <Section tone="tint" title="Before you go">
        <ul className="grid gap-3 sm:grid-cols-2">
          {beforeYouGo.map((item) => (
            <li
              key={item}
              className="rounded-cba-lg bg-surface p-5 text-[15px] text-ink-soft shadow-cba"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Exchange rates shown are indicative demo values only and are not a quote.",
          "The Travel Money Card supports up to 16 currencies. Fees and limits apply.",
          "Complimentary international travel insurance on eligible credit cards must be activated before you travel and is subject to policy terms.",
        ]}
      />
    </PageLayout>
  );
}
