import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { benefits, leadership, milestones, openRoles, values } from "@/data/company";
import { heroFoundation, heroStats, site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function AboutUsPage() {
  useDocumentTitle("About us");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="We started because employment admin was eating small businesses alive."
        blurb="An employment lawyer kept watching the same thing: owners who wanted to hire well, buried under paperwork that had nothing to do with the work itself."
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About us" }]}
      />

      <Section>
        <SectionHeading eyebrow="What we believe" title="Four things we hold to" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-eh-lg border border-eh-line bg-white p-7">
              <h3 className="font-display text-xl font-bold text-eh-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-eh-ink-soft">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Timeline" title="How we got here" />
        <ol className="mt-12 space-y-6">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="flex gap-6">
              <span className="font-display w-16 shrink-0 text-xl font-bold text-eh-purple">
                {milestone.year}
              </span>
              <span className="flex-1 border-l border-eh-line pb-6 pl-6 text-base text-eh-ink-soft">
                {milestone.event}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="purple">
        <SectionHeading title="Where we are today" align="center" tone="light" />
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} tone="light" />
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading eyebrow="Leadership" title="The people accountable for it" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <div key={person.name} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <Avatar name={person.name} size="lg" />
              <h3 className="mt-4 text-lg font-semibold text-eh-ink">{person.name}</h3>
              <p className="text-sm font-medium text-eh-purple">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-eh-ink-soft">{person.bio}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-eh-ink-faint">
          Demo profiles. These are not real Employment Hero employees. {site.abn} is used only for
          realism in this unofficial clone.
        </p>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function CareersPage() {
  useDocumentTitle("Careers");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Careers"
        title="Come and build the boring parts properly."
        blurb="Awards, entitlements and compliance are not glamorous. Getting them exactly right is the entire product, and it is genuinely hard."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      >
        <ButtonLink to="/jobs">See all roles</ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Open roles" title={`${openRoles.length} roles open right now`} />
        <ul className="mt-10 divide-y divide-eh-line overflow-hidden rounded-eh-lg border border-eh-line bg-white">
          {openRoles.map((role) => (
            <li
              key={role.title}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
            >
              <div>
                <p className="font-semibold text-eh-ink">{role.title}</p>
                <p className="mt-0.5 text-sm text-eh-ink-faint">
                  {role.team} · {role.location}
                </p>
              </div>
              <ButtonLink to="/contact" variant="secondary" size="sm">
                Apply
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Benefits" title="What you get working here" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <h3 className="text-lg font-semibold text-eh-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not seeing your role?"
        blurb="Tell us what you would want to work on and we will let you know when it opens."
        primaryLabel="Get in touch"
        primaryTo="/contact"
        secondaryLabel="Browse the job board"
        secondaryTo="/jobs"
      />
    </SiteLayout>
  );
}

export function HeroFoundationPage() {
  useDocumentTitle("Hero Foundation");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Hero Foundation"
        title="Unlocking work for people who face barriers to it."
        blurb={heroFoundation.body}
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Hero Foundation" }]}
      >
        <ButtonLink to="/contact" variant="inverse">
          Partner with us
        </ButtonLink>
      </PageHero>

      <Section>
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {heroFoundation.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </dl>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="How it works" title="Three ways employers take part" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "List inclusive roles",
              body: "Flag roles that are open to candidates re-entering work, at no cost.",
            },
            {
              title: "Offer a placement",
              body: "Host a supported placement with coaching provided by our partner organisations.",
            },
            {
              title: "Mentor a candidate",
              body: "Give an hour a month to someone preparing for interviews in your industry.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <Badge tone="lime">Free</Badge>
              <h3 className="mt-4 text-lg font-semibold text-eh-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Join the program."
        blurb="It is free to every business already on the platform."
        primaryLabel="Get involved"
        primaryTo="/contact"
        secondaryLabel="Read our story"
        secondaryTo="/about-us"
      />
    </SiteLayout>
  );
}

export function MediaCentrePage() {
  useDocumentTitle("Media centre");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Media centre"
        title="Assets, facts and contacts."
        blurb="Everything a journalist or partner needs to write about the platform accurately."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Media centre" }]}
      />

      <Section>
        <SectionHeading eyebrow="Brand assets" title="Logos and marks" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { file: "/brand/logo.svg", label: "Horizontal lockup", tone: "light" },
            { file: "/brand/logo-white.svg", label: "Reversed lockup", tone: "dark" },
            { file: "/brand/symbol.svg", label: "Symbol", tone: "light" },
            { file: "/brand/symbol-white.svg", label: "Symbol reversed", tone: "dark" },
          ].map((asset) => (
            <div key={asset.file} className="rounded-eh-lg border border-eh-line bg-white p-5">
              <div
                className={
                  asset.tone === "dark"
                    ? "grid h-24 place-items-center rounded-eh bg-eh-ink p-4"
                    : "grid h-24 place-items-center rounded-eh bg-eh-surface-tint p-4"
                }
              >
                <img src={asset.file} alt={asset.label} className="max-h-14 max-w-full" />
              </div>
              <p className="mt-3 text-sm font-semibold text-eh-ink">{asset.label}</p>
              <a
                href={asset.file}
                download
                className="focus-eh mt-1 inline-block text-xs font-semibold text-eh-purple hover:underline"
              >
                Download SVG
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-eh-ink-faint">
          These marks are recreations drawn for an unofficial demo. They are not the official
          Employment Hero brand assets and must not be used to represent the company.
        </p>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Fast facts" title="The numbers we quote" />
        <dl className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </dl>
      </Section>

      <CtaBand
        title="Media enquiries"
        blurb="Reach the communications team for interviews, data requests or fact checks."
        primaryLabel="Contact us"
        primaryTo="/contact"
        secondaryLabel="Read the newsroom"
        secondaryTo="/news"
      />
    </SiteLayout>
  );
}
