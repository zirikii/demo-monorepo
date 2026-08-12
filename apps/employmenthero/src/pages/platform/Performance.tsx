import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PERFORMANCE_REVIEWS } from "@/data/platform";
import type { PerformanceReview } from "@/data/types";
import { formatDate } from "@/lib/format";

const STATUS_TONE = {
  "Not started": "neutral",
  "In progress": "caution",
  Complete: "positive",
} as const;

export default function PlatformPerformance() {
  const complete = PERFORMANCE_REVIEWS.filter((review) => review.status === "Complete");
  const completion = Math.round((complete.length / PERFORMANCE_REVIEWS.length) * 100);
  const averageRating =
    complete.reduce((total, review) => total + (review.rating ?? 0), 0) / (complete.length || 1);

  const columns: Column<PerformanceReview>[] = [
    {
      key: "employee",
      header: "Employee",
      render: (review) => (
        <span className="flex items-center gap-3">
          <Avatar name={review.employee} size="sm" />
          <span className="font-bold text-ink-strong">{review.employee}</span>
        </span>
      ),
    },
    { key: "cycle", header: "Cycle", hideBelow: "sm", render: (review) => review.cycle },
    { key: "reviewer", header: "Reviewer", hideBelow: "md", render: (review) => review.reviewer },
    { key: "due", header: "Due", hideBelow: "lg", render: (review) => formatDate(review.dueOn) },
    {
      key: "rating",
      header: "Rating",
      align: "right",
      hideBelow: "md",
      render: (review) => (review.rating ? `${review.rating} / 5` : "—"),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (review) => <Badge tone={STATUS_TONE[review.status]}>{review.status}</Badge>,
    },
  ];

  return (
    <PlatformLayout title="Performance" description="H1 2026 review cycle closes 29 August">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Reviews in cycle" value={String(PERFORMANCE_REVIEWS.length)} />
        <StatTile label="Completed" value={String(complete.length)} />
        <StatTile label="Average rating" value={averageRating.toFixed(1)} trend="Out of 5" />
        <StatTile label="Cycle closes" value="29 Aug" trend="17 days remaining" trendTone="caution" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
        <PanelCard title="Cycle progress">
          <ProgressBar value={completion} label="Reviews complete" />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Managers with outstanding reviews are reminded weekly until the cycle closes. Completed
            reviews feed the compensation planning round in September.
          </p>
        </PanelCard>

        <PanelCard title="Review status" bodyClassName="p-0">
          <DataTable
            columns={columns}
            rows={PERFORMANCE_REVIEWS}
            rowKey={(review) => review.id}
            caption="Performance review status"
            className="rounded-none border-0"
          />
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
