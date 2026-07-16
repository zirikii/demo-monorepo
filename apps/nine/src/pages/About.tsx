import { PageLayout } from "@/components/layout/PageLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle("About");
  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">About this demo</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-nine-muted">
        <p>
          This is an unofficial look-alike of{" "}
          <a href="https://www.nine.com.au/?rf=true" className="text-nine-blue">
            nine.com.au
          </a>{" "}
          built for product demos and codebase exploration. It is not affiliated with Nine Entertainment Co.
        </p>
        <p>
          The 2026 relaunch organised the destination around six pillars — News, Sport, Lifestyle, Travel,
          Entertainment and Shopping — plus TV companion sites. This demo mirrors that information architecture
          with seeded Australian headlines.
        </p>
        <p>
          One page (<strong className="text-nine-ink">Sport</strong>) intentionally ships with a sorting /
          timestamp bug for Bugbot and QA demos. See the app README and linked Jira ticket.
        </p>
      </div>
    </PageLayout>
  );
}
