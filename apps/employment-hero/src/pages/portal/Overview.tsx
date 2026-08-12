import { Link } from "react-router-dom";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { leaveRequests } from "@/data/leave";
import { payRuns } from "@/data/payroll";
import { people } from "@/data/people";
import { jobs } from "@/data/recruitment";
import { formatCurrency } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortalOverviewPage() {
  useDocumentTitle("Portal overview");
  const pendingLeave = leaveRequests.filter((l) => l.status === "Pending").length;
  const openRoles = jobs.filter((j) => j.status === "Open").length;
  const nextPay = payRuns.find((p) => p.status === "Draft" || p.status === "Processing");

  return (
    <PortalLayout title="Overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["People", String(people.length), "/portal/people"],
          ["Pending leave", String(pendingLeave), "/portal/leave"],
          ["Open roles", String(openRoles), "/portal/recruitment"],
          ["Next pay run", nextPay ? formatCurrency(nextPay.total) : "—", "/portal/payroll"],
        ].map(([label, value, to]) => (
          <Link key={label} to={to} className="focus-eh rounded-eh-lg border border-line bg-white p-5 shadow-eh hover:shadow-eh-lift">
            <p className="text-sm text-ink-faint">{label}</p>
            <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-eh-lg border border-line bg-white p-5 shadow-eh">
          <h2 className="font-bold">Needs attention</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>{pendingLeave} leave requests waiting on manager approval</li>
            <li>{openRoles} open requisitions with active candidates</li>
            <li>{nextPay ? `Pay run ${nextPay.period} is ${nextPay.status.toLowerCase()}` : "No upcoming pay run"}</li>
          </ul>
        </section>
        <section className="rounded-eh-lg border border-line bg-white p-5 shadow-eh">
          <h2 className="font-bold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-eh-purple">
            <li><Link to="/portal/people" className="hover:underline">Review headcount</Link></li>
            <li><Link to="/portal/leave" className="hover:underline">Approve leave</Link></li>
            <li><Link to="/portal/payroll" className="hover:underline">Open payroll</Link></li>
            <li><Link to="/portal/settings" className="hover:underline">Company settings</Link></li>
          </ul>
        </section>
      </div>
    </PortalLayout>
  );
}
