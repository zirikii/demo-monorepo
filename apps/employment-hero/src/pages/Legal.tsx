import type { ReactNode } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function LegalShell({
  title,
  blurb,
  crumb,
  children,
}: {
  title: string;
  blurb: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title={title}
        blurb={blurb}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: crumb }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-eh-ink-soft">
          {children}
        </div>
      </Section>
    </SiteLayout>
  );
}

export function PrivacyPage() {
  useDocumentTitle("Privacy");

  return (
    <LegalShell
      title="Privacy"
      blurb="What this demo stores, where it stores it, and why there is very little of it."
      crumb="Privacy"
    >
      <h2 className="font-display text-2xl font-bold text-eh-ink">This is a demonstration build</h2>
      <p>
        This site is an unofficial recreation of employmenthero.com built to demonstrate a web
        application. It is not operated by Employment Hero Pty Ltd and it does not connect to any
        Employment Hero service.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">What is stored</h2>
      <p>
        Everything you enter stays in your own browser. The demo session, leave decisions, pay run
        approvals, candidate stages and integration toggles are written to <code>localStorage</code>{" "}
        under keys prefixed with <code>employment-hero-demo-</code>. Nothing is transmitted to a
        server, because there is no server.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">How to remove it</h2>
      <p>
        Clearing site data for this origin removes every trace of the demo. The settings page inside
        the platform also has a reset control that restores the seed data.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">Authentication</h2>
      <p>
        The login is intentionally mock and accepts any credentials, matching the convention across
        every demo app in this repository. Do not enter a real password anywhere on this site.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">Content</h2>
      <p>
        Company names, testimonials, case studies, salary figures and job listings are fabricated
        for the demo. Any resemblance to real published figures is for realism only and should not
        be relied upon. {site.abn} appears for the same reason.
      </p>
    </LegalShell>
  );
}

export function TermsPage() {
  useDocumentTitle("Terms");

  return (
    <LegalShell
      title="Terms of use"
      blurb="The short version: this is a demo, use it as one."
      crumb="Terms"
    >
      <h2 className="font-display text-2xl font-bold text-eh-ink">No affiliation</h2>
      <p>
        This site is not affiliated with, endorsed by, or connected to Employment Hero Pty Ltd. All
        trade marks referenced belong to their respective owners and are used here only to describe
        what is being demonstrated.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">No advice</h2>
      <p>
        Nothing on this site is legal, financial, taxation or employment advice. Award
        interpretations, superannuation obligations and pay figures shown here are illustrative and
        may be wrong. Do not make an employment decision based on anything you read here.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">No service commitment</h2>
      <p>
        There is no uptime commitment, no support obligation and no warranty of any kind. The demo
        may be changed or removed at any time.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">Known defects</h2>
      <p>
        This build contains at least one deliberate defect used to demonstrate a bug-fixing
        workflow. The log-in page fails to render for that reason. Use the start free flow to reach
        the platform instead.
      </p>
    </LegalShell>
  );
}

export function AccessibilityPage() {
  useDocumentTitle("Accessibility");

  return (
    <LegalShell
      title="Accessibility"
      blurb="What we did, and where this demo falls short."
      crumb="Accessibility"
    >
      <h2 className="font-display text-2xl font-bold text-eh-ink">What is in place</h2>
      <p>
        Every interactive control is reachable by keyboard and shows a visible focus ring. Menus
        report their expanded state, tabs use the correct roles, tables use header cells with the
        right scope, and decorative graphics are hidden from assistive technology.
      </p>
      <p>
        Colour contrast was checked against the brand palette. Purple Heart on white and white on
        Purple Heart both meet the AA contrast requirement for body text.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">Known gaps</h2>
      <p>
        The homepage customer marquee animates continuously and does not currently respect a reduced
        motion preference; the same list is available as text to screen readers. The nine-box talent
        grid conveys some information through position alone.
      </p>
      <h2 className="font-display text-2xl font-bold text-eh-ink">Telling us about a problem</h2>
      <p>
        This is a demo build, so there is no accessibility hotline. In the real product, barriers
        should be reported through the service centre.
      </p>
    </LegalShell>
  );
}
