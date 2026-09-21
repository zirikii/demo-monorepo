import { Check, X } from "lucide-react";
import type { CaptureDecision } from "../../domain/decision";
import { MISMATCH_COPY } from "../../data/copy";
import { Button } from "../ui/Button";

const BENEFITS: { label: string; basic: string; verified: string }[] = [
  { label: "Transfer to bank & e-wallets", basic: "no", verified: "yes" },
  { label: "Send GoPay to friends & family", basic: "no", verified: "yes" },
  { label: "Balance limit", basic: "Rp2 Mil", verified: "Rp20 Mil" },
  { label: "Withdrawal GoPay balance", basic: "3 steps", verified: "1 step" },
  { label: "Pay GoRide & GoFood", basic: "3 steps", verified: "1 step" },
  { label: "Online payment", basic: "yes", verified: "yes" },
  { label: "Buy pulsa & paket data", basic: "yes", verified: "yes" },
  { label: "Pay at resto/supermarket", basic: "yes", verified: "yes" },
];

function Mark({ value }: { value: string }) {
  if (value === "yes") return <Check className="ml-auto h-4 w-4 text-gopay-active" aria-label="Included" />;
  if (value === "no") return <X className="ml-auto h-4 w-4 text-text-body" aria-label="Not included" />;
  return <span className="text-right text-xs font-semibold">{value}</span>;
}

export function BenefitsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-mute">
      <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr] bg-bg-quaternary px-3 py-2 text-xs font-bold">
        <span>Benefits</span>
        <span className="text-center">Basic</span>
        <span className="rounded-t-lg bg-[#e7f6ea] py-1 text-center text-gopay-active">Verified</span>
      </div>
      {BENEFITS.map((row) => (
        <div key={row.label} className="grid grid-cols-[1.4fr_0.7fr_0.8fr] items-center border-t border-border-mute px-3 py-2.5 text-xs">
          <span>{row.label}</span>
          <span className="flex justify-center">
            <Mark value={row.basic} />
          </span>
          <span className="flex justify-center bg-[#f3fbf4] py-1">
            <Mark value={row.verified} />
          </span>
        </div>
      ))}
    </div>
  );
}

export function ResultPanel({
  decision,
  onDone,
  onRetry,
}: {
  decision: CaptureDecision;
  onDone: () => void;
  onRetry: () => void;
}) {
  if (decision.outcome === "approve") {
    return (
      <div className="flex h-full flex-col bg-bg-primary px-4 pb-8">
        <h1 className="px-2 pt-6 text-center text-[22px] font-extrabold">You&apos;re verified</h1>
        <p className="mb-4 mt-1 text-center text-body-small text-text-body">GoPay Plus stays active with your updated e-KTP.</p>
        {decision.documentExpiring ? (
          <p className="mb-3 rounded-xl bg-[#fff6e8] px-3 py-2 text-xs text-text-title">Your e-KTP expires soon. The new data is still saved.</p>
        ) : null}
        <BenefitsTable />
        <p className="mt-3 text-center text-xs font-semibold text-gopay-active">Supervised by Bank Indonesia</p>
        <div className="mt-auto">
          <Button onClick={onDone}>Back to Account Center</Button>
        </div>
      </div>
    );
  }

  if (decision.outcome === "reject" && decision.reason === "rekyc_id_mismatch") {
    return (
      <div className="flex h-full flex-col px-4 pb-8 pt-8">
        <h1 className="text-[22px] font-extrabold">e-KTP doesn&apos;t match</h1>
        <p className="mt-3 text-body-small text-text-body">{MISMATCH_COPY.en}</p>
        <p className="mt-3 text-body-small text-text-title">{MISMATCH_COPY.id}</p>
        <p className="mt-4 text-xs font-semibold text-text-body">Reason code: {MISMATCH_COPY.code}</p>
        <div className="mt-auto">
          <Button onClick={onRetry}>Resubmit e-KTP</Button>
        </div>
      </div>
    );
  }

  if (decision.outcome === "reject") {
    return (
      <div className="flex h-full flex-col px-4 pb-8 pt-8">
        <h1 className="text-[22px] font-extrabold">We couldn&apos;t update your e-KTP</h1>
        <p className="mt-3 text-body-small text-text-body">
          {decision.reason === "dukcapil_not_verified"
            ? "Dukcapil could not verify the new data. Your current e-KTP and GoPay Plus access are unchanged."
            : "This session expired before verification finished. Your current e-KTP is unchanged."}
        </p>
        <div className="mt-auto">
          <Button onClick={onDone}>Back to Account Center</Button>
        </div>
      </div>
    );
  }

  if (decision.outcome === "pending_manual_review") {
    return (
      <div className="flex h-full flex-col px-4 pb-8 pt-8">
        <h1 className="text-[22px] font-extrabold">Review in progress</h1>
        <p className="mt-3 text-body-small text-text-body">
          The photo was hard to read, so this update is in the manual review queue. Your current e-KTP stays active until a reviewer decides.
        </p>
        <div className="mt-auto">
          <Button onClick={onDone}>Back to Account Center</Button>
        </div>
      </div>
    );
  }

  if (decision.outcome === "needs_edd" || decision.outcome === "retry" || decision.outcome === "pending_timeout") {
    return (
      <div className="flex h-full flex-col px-4 pb-8 pt-8">
        <h1 className="text-[22px] font-extrabold">One more step</h1>
        <p className="mt-3 text-body-small text-text-body">Continue the update from the previous screen.</p>
        <div className="mt-auto">
          <Button onClick={onRetry}>Continue</Button>
        </div>
      </div>
    );
  }

  const unreachable: never = decision;
  return unreachable;
}
