import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LEADERS } from "@/data/company";

export default function LeadershipPage() {
  return (
    <PageLayout title="Leadership">
      <PageHero
        eyebrow="About HUB24"
        title="Leadership team"
        body="The executive team responsible for the platform, wealth accounting and client engagement businesses."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "About us", to: "/about-us" },
          { label: "Leadership" },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="Executive"
          title="Who runs the group"
          body="Fictional people for a fictional build — any resemblance to the real executive team is coincidental."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((leader) => (
            <Card key={leader.name} className="flex h-full flex-col gap-3">
              <Avatar name={leader.name} tone="navy" className="h-14 w-14 text-base" />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                  {leader.name}
                </h3>
                <p className="text-sm font-semibold text-hub-blue">{leader.role}</p>
              </div>
              <p className="flex-1 text-sm text-ink-soft">{leader.bio}</p>
              <Badge tone="neutral">{leader.focus}</Badge>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Media enquiries"
        body="Our corporate affairs team handles media requests, interviews and background briefings."
        primary={{ label: "Contact the media team", to: "/contact-us#media" }}
        secondary={{ label: "Read insights", to: "/insights" }}
      />
    </PageLayout>
  );
}
