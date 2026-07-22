import { InsightsDashboard } from "@/components/insights/insights-dashboard";
import { ReportSubscriptionList } from "@/components/insights/report-subscription-list";
import { PageHeader } from "@/components/layout/page-header";
import { getInsights, getReportSubscriptions } from "@/lib/data/business";
export default async function InsightsPage() {
  const [insights, reports] = await Promise.all([getInsights(), getReportSubscriptions()]);
  return (
    <div>
      <PageHeader
        eyebrow="Insight Plus"
        title="Billing and inbound call analytics"
        description="Explore simulated usage reports, cost-centre trends, call queues, and report subscriptions."
      />
      <InsightsDashboard insights={insights} />
      <div className="mt-6">
        <ReportSubscriptionList reports={reports} />
      </div>
    </div>
  );
}
