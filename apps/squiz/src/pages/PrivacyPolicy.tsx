import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const sections = [
  {
    heading: "1. What this is",
    body: "This website is an unofficial demonstration build created for testing and evaluation purposes. It is a single-page React application with no backend: forms validate locally and no data is transmitted or stored anywhere.",
  },
  {
    heading: "2. Data we collect",
    body: "None. The demo has no analytics, no cookies, no tracking pixels, and no server. Anything you type into a form exists only in your browser tab and disappears when you close it.",
  },
  {
    heading: "3. What a real policy would cover",
    body: "A production privacy policy for a platform like this would describe categories of data collected (account, usage, support), lawful bases for processing, retention schedules, sub-processors, international transfer mechanisms, and the rights available to data subjects — including access, correction, and deletion.",
  },
  {
    heading: "4. Third-party content",
    body: "Fonts and icons are bundled with the application; no third-party requests are made at runtime. External links, where present, lead to publicly available resources.",
  },
  {
    heading: "5. Contact",
    body: "Questions about this demo should be directed to the repository maintainers through the project's issue tracker.",
  },
];

export function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <Breadcrumbs crumbs={[{ label: "Legal", to: "/legal" }, { label: "Privacy Policy" }]} />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <h1 className="text-4xl font-semibold text-navy sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-faint">Last updated: July 2026 · Demo document</p>
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-xl font-semibold text-navy">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
          </section>
        ))}
      </article>
    </PageLayout>
  );
}
