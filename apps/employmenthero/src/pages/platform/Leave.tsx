import { useState } from "react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { LEAVE_REQUESTS } from "@/data/platform";
import type { LeaveRequest } from "@/data/types";
import { formatDate } from "@/lib/format";

const TABS = ["Pending", "Approved", "Declined", "All"] as const;
type Tab = (typeof TABS)[number];

const STATUS_TONE = {
  Pending: "caution",
  Approved: "positive",
  Declined: "critical",
} as const;

export default function PlatformLeave() {
  const [tab, setTab] = useState<Tab>("Pending");
  const [decisions, setDecisions] = useState<Record<string, LeaveRequest["status"]>>({});

  const requests = LEAVE_REQUESTS.map((request) => ({
    ...request,
    status: decisions[request.id] ?? request.status,
  }));

  const visible = tab === "All" ? requests : requests.filter((request) => request.status === tab);
  const pendingCount = requests.filter((request) => request.status === "Pending").length;
  const upcomingDays = requests
    .filter((request) => request.status === "Approved")
    .reduce((total, request) => total + request.days, 0);

  return (
    <PlatformLayout title="Leave" description={`${pendingCount} requests awaiting your decision`}>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Awaiting decision" value={String(pendingCount)} />
        <StatTile label="Approved days ahead" value={String(upcomingDays)} />
        <StatTile label="Leave liability" value="892 hrs" trend="Across 16 employees" />
        <StatTile label="October clashes" value="2" trend="Kitchen coverage" trendTone="critical" />
      </div>

      <div className="mt-6">
        <PanelCard title="Leave requests" subtitle="Decisions apply to this browser session only">
          <Tabs tabs={TABS} active={tab} onChange={setTab} label="Leave status" className="mb-5" />

          {visible.length ? (
            <ul className="flex flex-col gap-3">
              {visible.map((request) => (
                <li
                  key={request.id}
                  className="flex flex-col gap-3 rounded-eh border border-line px-5 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.98rem] font-bold text-ink-strong">{request.employee}</p>
                    <p className="text-sm text-ink-faint">
                      {request.type} leave · {request.days} days · {formatDate(request.from)} –{" "}
                      {formatDate(request.to)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{request.note}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone={STATUS_TONE[request.status]}>{request.status}</Badge>
                    {request.status === "Pending" ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            setDecisions((current) => ({ ...current, [request.id]: "Approved" }))
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setDecisions((current) => ({ ...current, [request.id]: "Declined" }))
                          }
                        >
                          Decline
                        </Button>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title={`No ${tab.toLowerCase()} requests`}
              body="Switch to another tab to see the rest of the leave calendar."
            />
          )}
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
