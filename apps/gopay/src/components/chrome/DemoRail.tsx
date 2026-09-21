import { DemoRibbon } from "@demo/ui";
import { useState } from "react";
import { useSession, type Scenario } from "@/hooks/useSession";
import { agentSetStatus, pullApproved, type SubmissionType } from "@/lib/kyc";

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: "happy", label: "Happy update" },
  { id: "nik-mismatch", label: "NIK mismatch" },
  { id: "low-confidence", label: "Manual review" },
  { id: "high-risk", label: "High risk + EDD" },
  { id: "dukcapil-fail", label: "Dukcapil reject" },
  { id: "fr-fail", label: "Face check fails" },
];

export function DemoRail() {
  const session = useSession();
  const [filter, setFilter] = useState<"all" | SubmissionType>("all");
  const [notice, setNotice] = useState<string | null>(null);
  const rows = session.account.submissions.filter((item) => filter === "all" || item.type === filter);
  const pull = pullApproved(session.account);

  function decide(id: string, status: "approved" | "rejected") {
    const result = agentSetStatus(session.account, id, status, new Date());
    if (!result.ok) {
      setNotice(
        result.error === "already_approved"
          ? "Another submission is already approved. Reject it first."
          : result.error,
      );
      return;
    }
    session.setAccount(result.value);
    setNotice(null);
  }

  return (
    <aside className="w-full max-w-md text-ink">
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">GoPay reKYC</p>
        <DemoRibbon label="Unofficial demo" />
      </div>
      <p className="mt-2 text-sm text-body">
        Signed in as Budi Pratama, GoPay Plus. The phone follows the reKYC Figma. This panel is the
        e-Money submission list.
      </p>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-faint">
        Capture scenario
        <select
          className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
          value={session.scenario}
          onChange={(event) => session.setScenario(event.target.value as Scenario)}
        >
          {SCENARIOS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="rounded-full bg-white px-3 py-1 text-xs font-semibold" onClick={() => session.setOddDueInDays(12)}>
          Review in 12 days
        </button>
        <button type="button" className="rounded-full bg-white px-3 py-1 text-xs font-semibold" onClick={() => session.setOddDueInDays(-1)}>
          Mark overdue
        </button>
        <button
          type="button"
          aria-pressed={session.blockEnforcement}
          className="rounded-full bg-white px-3 py-1 text-xs font-semibold"
          onClick={() => session.setBlockEnforcement(!session.blockEnforcement)}
        >
          Block enforcement {session.blockEnforcement ? "on" : "off"}
        </button>
        <button type="button" className="rounded-full bg-white px-3 py-1 text-xs font-semibold" onClick={session.reset}>
          Reset
        </button>
      </div>
      <p className="mt-4 text-xs text-body">
        KYC status: <span className="font-semibold">{session.account.kycStatus}</span>. Pull API{" "}
        {pull.data ? `returns ${pull.data.fullName}` : "returns no data"}.
      </p>
      <div className="mt-3 flex gap-2 text-xs">
        {(["all", "kyc", "rekyc"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            className="rounded-full bg-white px-3 py-1 font-semibold"
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {notice ? <p className="mt-2 text-xs text-error">{notice}</p> : null}
      <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto">
        {rows.map((row) => (
          <li key={row.id} className="rounded-xl bg-white p-3 text-xs">
            <p className="font-semibold">
              {row.type} · {row.status}
              {row.reason ? ` · ${row.reason}` : ""}
            </p>
            <p className="text-body">
              {row.data.fullName} · {row.riskTier} ·{" "}
              {new Intl.DateTimeFormat("en-ID", { dateStyle: "medium" }).format(new Date(row.createdAt))}
            </p>
            <div className="mt-2 flex gap-2">
              <button type="button" className="rounded-full bg-page px-2 py-1" onClick={() => decide(row.id, "approved")}>
                Approve
              </button>
              <button type="button" className="rounded-full bg-page px-2 py-1" onClick={() => decide(row.id, "rejected")}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-faint">
        Partner events: {session.account.partnerEvents.length}. Payloads carry the account id,
        event, and time only.
      </p>
    </aside>
  );
}
