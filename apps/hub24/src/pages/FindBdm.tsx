import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeading } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BDMS } from "@/data/company";

export default function FindBdmPage() {
  const [state, setState] = useState("All states");
  const [segment, setSegment] = useState("All segments");

  const states = ["All states", ...Array.from(new Set(BDMS.map((bdm) => bdm.state)))];
  const segments = ["All segments", ...Array.from(new Set(BDMS.map((bdm) => bdm.segment)))];

  const bdms = BDMS.filter(
    (bdm) =>
      (state === "All states" || bdm.state === state) &&
      (segment === "All segments" || bdm.segment === segment),
  );

  return (
    <PageLayout title="Find a BDM">
      <PageHero
        eyebrow="Contact"
        title="Chat to your local BDM"
        body="Our national team of Business Development Managers supports advisers, private wealth practices, licensees and investment managers."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Contact us", to: "/contact-us/" },
          { label: "Find a BDM" },
        ]}
      />

      <Section>
        <SectionHeading eyebrow="Directory" title="Find the right person" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          <Field label="State" htmlFor="bdm-state">
            <Select id="bdm-state" value={state} onChange={(event) => setState(event.target.value)}>
              {states.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Segment" htmlFor="bdm-segment">
            <Select id="bdm-segment" value={segment} onChange={(event) => setSegment(event.target.value)}>
              {segments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          Showing {bdms.length} of {BDMS.length} team members
        </p>

        {bdms.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="Nobody matches that combination"
            body="Try widening the state or segment filter, or call 1300 854 994."
          />
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {bdms.map((bdm) => (
              <Card key={bdm.id} className="flex gap-4">
                <Avatar name={bdm.name} />
                <div className="flex min-w-0 flex-col gap-1.5">
                  <CardHeading className="text-base">{bdm.name}</CardHeading>
                  <p className="text-xs text-ink-faint">
                    {bdm.title} · {bdm.state}
                  </p>
                  <Badge tone="neutral" className="w-fit">
                    {bdm.segment}
                  </Badge>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                    <Phone aria-hidden className="h-3.5 w-3.5" />
                    {bdm.phone}
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-sm text-ink-soft">
                    <Mail aria-hidden className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{bdm.email}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-8 text-sm text-ink-faint">
          Contact details on this page are invented for a demonstration build.
        </p>
      </Section>
    </PageLayout>
  );
}
