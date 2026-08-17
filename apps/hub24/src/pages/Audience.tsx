import { useParams } from "react-router-dom";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCES } from "@/data/audiences";
import { MENUS } from "@/data/products";
import { BDM_TEAM } from "@/data/bdm";
import { TESTIMONIALS } from "@/data/testimonials";

const COPY: Record<
  string,
  { title: string; body: string; points: string[]; faqs: { question: string; answer: string }[] }
> = {
  advisers: {
    title: "HUB24 for Advisers",
    body: "We believe in the value of advice. By leveraging managed portfolio technology, SMSFs and high-net-worth capabilities, we’re empowering you to enhance the value of your advice across a broader range of client segments.",
    points: [
      "Create opportunities for clients with less complex needs on Discover",
      "Deliver award-winning managed portfolio functionality",
      "Local State Managers, BDMs, Training and Relationship Managers",
      "Australian-based call centre, chat and SupportHUB",
    ],
    faqs: [
      { question: "How do I get a practice on HUB24?", answer: "Contact a BDM. Transition project managers run the book move; Training and Relationship Managers stand the team up on AdviserHUB." },
      { question: "Can clients move between Discover, Core and Choice?", answer: "Yes. As needs evolve they can transition menus while retaining the same account and underlying investments without a significant CGT event." },
    ],
  },
  brokers: {
    title: "Empowering private wealth advisers",
    body: "Innovation that delivers for private wealth advisers and their high-net-worth clients — Private Invest, Engage reporting, uncapped term deposits, FX and OTC bonds.",
    points: [
      "Private Invest custodial + non-custodial administration",
      "Dedicated private-wealth BDMs and brokers desk",
      "Engage household reporting",
      "Wholesale investor onboarding",
    ],
    faqs: [
      { question: "Who can use Private Invest?", answer: "Wholesale investors, companies, trustees of trusts and SMSF trustees — typically advised HNW households." },
    ],
  },
  licensees: {
    title: "HUB24 for licensees",
    body: "A single platform standard across your advice network: licensee model portfolios, practice reporting and a transition team that has moved books of every size.",
    points: [
      "Licensee and dealer-group model portfolios",
      "Practice-level FUM, fee and compliance reporting",
      "AdviserHUB permissions aligned to your AFSL",
      "National BDM coverage",
    ],
    faqs: [
      { question: "Can we keep our own models?", answer: "Yes. Licensee models sit alongside manager models on Core and Choice." },
    ],
  },
  "investment-managers": {
    title: "Empowering better financial futures, together with investment managers",
    body: "As the platform rated #1 by advisers, we offer a broad investment menu and ManagerHUB so you can deliver your expertise without fighting the wrap.",
    points: [
      "ManagerHUB for model control and reporting",
      "Discover, Core and Choice menu access",
      "CPD distribution to advisers via the Professional Development hub",
      "Operations support for corporate actions",
    ],
    faqs: [
      { question: "How do I list a portfolio?", answer: "Contact the investment-operations team. Dummy workflow only in this demo." },
    ],
  },
  clients: {
    title: "HUB24 for advised clients",
    body: "Your adviser can connect you to super, pension, investment and insurance solutions — and InvestorHUB so you can see balances, asset allocation and statements.",
    points: [
      "HUB24 Super, Pension and Invest",
      "Managed portfolios from leading managers",
      "InvestorHUB on web and mobile",
      "Speak with your adviser — we do not give personal advice",
    ],
    faqs: [
      { question: "How do I log in?", answer: "Use InvestorHUB. In this demo any email/password works; try investor@hub24.demo / demo." },
    ],
  },
};

export default function AudiencePage() {
  const { slug = "advisers" } = useParams();
  const copy = COPY[slug] ?? COPY.advisers!;
  const audience = AUDIENCES.find((item) => copy.title.toLowerCase().includes(item.label.toLowerCase()));

  return (
    <PageLayout title={copy.title}>
      <PageHero
        eyebrow={audience?.heroKicker ?? "HUB24"}
        title={copy.title}
        body={copy.body}
        actions={
          <>
            <ButtonLink to="/contact">Contact a BDM</ButtonLink>
            <ButtonLink to="/features-benefits" variant="inverse">
              Features & benefits
            </ButtonLink>
          </>
        }
      />
      <Section>
        <SectionHeading title="What you can do on the platform" />
        <ul className="grid gap-4 md:grid-cols-2">
          {copy.points.map((point) => (
            <li key={point} className="rounded-hub-lg border border-line bg-surface-tint p-5 text-[0.95rem] leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="tint">
        <SectionHeading eyebrow="Investment menus" title="Discover, Core and Choice" />
        <div className="grid gap-6 md:grid-cols-3">
          {MENUS.map((menu) => (
            <div key={menu.name} className="rounded-hub-lg border border-line bg-white p-6">
              <h3 className="text-lg font-bold">{menu.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{menu.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading title="Delivering excellence in service and support" />
        <div className="grid gap-4 md:grid-cols-3">
          {BDM_TEAM.slice(0, 3).map((person) => (
            <div key={person.email} className="rounded-hub-lg border border-line p-5">
              <p className="font-bold">{person.name}</p>
              <p className="text-sm text-ink-soft">
                {person.role} · {person.region}
              </p>
            </div>
          ))}
        </div>
        <ButtonLink to="/bdm-team" variant="secondary" className="mt-6">
          Meet the full BDM team
        </ButtonLink>
      </Section>
      {TESTIMONIALS[1] ? (
        <Section tone="navy">
          <blockquote className="max-w-3xl font-serif text-2xl leading-relaxed">“{TESTIMONIALS[1].quote}”</blockquote>
          <p className="mt-4 text-white/70">
            {TESTIMONIALS[1].name}, {TESTIMONIALS[1].role}
          </p>
        </Section>
      ) : null}
      <Section>
        <SectionHeading title="Questions" />
        <Accordion items={copy.faqs} />
      </Section>
      <CtaBand />
    </PageLayout>
  );
}
