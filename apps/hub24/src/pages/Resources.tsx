import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";

const CARDS = [
  {
    title: "Product documents",
    body: "HUB24 Super, Invest and Managed Portfolio disclosure documents and other important information.",
    to: "/resources/documents",
  },
  {
    title: "CPD education",
    body: "CPD-accredited material from HUB24 and investment managers — to support you in empowering better financial futures.",
    to: "/resources/cpd",
  },
  {
    title: "Developer Centre",
    body: "Open architecture APIs so licensees and fintechs can integrate the systems they already run.",
    to: "/resources",
  },
  {
    title: "News & insights",
    body: "ASX announcements, people stories and platform updates.",
    to: "/news",
  },
];

export default function ResourcesPage() {
  return (
    <PageLayout title="Resources">
      <PageHero
        eyebrow="Resources"
        title="Access resources for you and your clients"
        body="Professional development, product documents and insights — plus a reminder that scammers sometimes impersonate HUB24. This demo never asks for real credentials."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <LinkCard key={card.title} to={card.to}>
              <CardHeading>{card.title}</CardHeading>
              <CardBody className="mt-2">{card.body}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
