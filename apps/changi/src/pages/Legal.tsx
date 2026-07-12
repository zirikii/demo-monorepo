import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";

export function PrivacyPage() {
  useDocumentTitle("Privacy Policy");
  return (
    <PageLayout>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <article className="prose mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-ink-soft sm:px-6">
        <p>
          This is an <strong>unofficial demo</strong> of the Changi Airport website experience. It does not
          collect personal data for Changi Airport Group and is not affiliated with CAG.
        </p>
        <p className="mt-4">
          Demo authentication details and preference toggles are stored only in your browser&apos;s local
          storage so you can explore account screens. Clear site data anytime to remove them.
        </p>
        <p className="mt-4">
          For the official privacy policy, visit{" "}
          <a className="font-bold text-purple" href="https://www.changiairport.com" target="_blank" rel="noreferrer">
            changiairport.com
          </a>
          .
        </p>
      </article>
    </PageLayout>
  );
}

export function TermsPage() {
  useDocumentTitle("By-laws & Conditions of Use");
  return (
    <PageLayout>
      <PageHero title="By-laws & Conditions of Use" crumbs={[{ label: "Conditions of Use" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-ink-soft sm:px-6">
        <p>
          This demo recreates public marketing and traveller-information patterns for educational and design
          exploration. Content is illustrative and may not reflect live airport operations, promotions, or
          legal terms.
        </p>
        <p className="mt-4">
          Brand assets are sourced from publicly available Changi pages for visual fidelity and remain the
          property of their respective owners.
        </p>
      </article>
    </PageLayout>
  );
}
