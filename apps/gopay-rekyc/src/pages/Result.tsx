import { useLocation, useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { ResultPanel } from "../components/rekyc/ResultPanel";
import { useDemo } from "../context/useDemo";
import type { CaptureDecision } from "../domain/decision";
import { SUCCESS_TOAST } from "../data/copy";

function isDecision(value: unknown): value is CaptureDecision {
  return typeof value === "object" && value !== null && "outcome" in value;
}

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify, refresh } = useDemo();
  const state = location.state as { decision?: unknown } | null;
  const rawDecision = state?.decision;
  const decision = isDecision(rawDecision) ? rawDecision : null;

  if (!decision) {
    return (
      <div className="flex h-full flex-col bg-bg-primary px-4 pt-16">
        <p className="text-body-small text-text-body">There is no verification result to show.</p>
        <button type="button" className="mt-4 font-bold text-gopay-active" onClick={() => navigate("/rekyc/review")}>
          Back to e-KTP data
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <StatusBar />
      <div className="min-h-0 flex-1">
      <ResultPanel
        decision={decision}
        onDone={() => {
          if (decision.outcome === "approve") {
            notify(SUCCESS_TOAST);
            void refresh();
          }
          navigate("/vac");
        }}
        onRetry={() => navigate("/rekyc/review")}
      />
      </div>
      <HomeIndicator />
    </div>
  );
}
