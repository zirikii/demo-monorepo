import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { MISMATCH_NIK, UPDATED_KTP, type Identity } from "@/data/identity";
import { Phone, StatusBar } from "@/components/chrome/Chrome";
import { useSession, type Scenario } from "@/hooks/useSession";
import { applyResult, routeFor, type CaptureOutcome } from "@/lib/capturePlan";
import { recordCapture, tierForScore } from "@/lib/kyc";

function outcomeFor(scenario: Scenario): {
  outcome: CaptureOutcome;
  riskScore: number;
  data: Identity;
} {
  switch (scenario) {
    case "nik-mismatch":
      return { outcome: "nik-mismatch", riskScore: 20, data: { ...UPDATED_KTP, nik: MISMATCH_NIK } };
    case "low-confidence":
      return { outcome: "pending", riskScore: 30, data: UPDATED_KTP };
    case "high-risk":
      return { outcome: "approved", riskScore: 82, data: UPDATED_KTP };
    case "dukcapil-fail":
      return { outcome: "dukcapil-fail", riskScore: 35, data: UPDATED_KTP };
    case "happy":
    case "fr-fail":
      return { outcome: "approved", riskScore: 18, data: UPDATED_KTP };
    default: {
      const unreachable: never = scenario;
      return unreachable;
    }
  }
}

export function CaptureScreen() {
  const navigate = useNavigate();
  const { scenario, account, setAccount, showToast, setGenie } = useSession();
  const [count, setCount] = useState(3);
  const accountRef = useRef(account);
  accountRef.current = account;

  useEffect(() => {
    if (count === 0) return;
    const timer = window.setTimeout(() => setCount((value) => value - 1), 700);
    return () => window.clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    if (count !== 0) return;
    const timer = window.setTimeout(() => {
      const plan = outcomeFor(scenario);
      if (plan.outcome === "approved" && tierForScore(plan.riskScore) === "high") {
        navigate("/edd", { replace: true });
        return;
      }
      const result = recordCapture(accountRef.current, {
        data: plan.data,
        riskScore: plan.riskScore,
        outcome: plan.outcome,
        now: new Date(),
      });
      if (!result.ok) {
        navigate("/review", { replace: true });
        return;
      }
      applyResult(result.value, plan.outcome, setAccount, showToast, setGenie);
      navigate(routeFor(plan.outcome), { replace: true });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [count, navigate, scenario, setAccount, setGenie, showToast]);

  return (
    <Phone className="bg-card">
      <StatusBar />
      <button type="button" className="px-4 text-left text-[14px] font-bold" onClick={() => navigate("/onboarding")}>
        Back
      </button>
      <div className="flex flex-1 flex-col items-center px-6 pt-6">
        <h2 className="text-center font-serif text-[21px] font-semibold leading-7">
          Verifying your e-KTP, please don’t leave the screen yet
        </h2>
        <div className="mt-8 h-40 w-[280px] rounded-[24px] border-2 border-dashed border-gopay bg-gradient-to-br from-[#e7f6e8] to-white p-4 text-left">
          <p className="text-[11px] font-bold text-gopay-ink">e-KTP</p>
          <p className="mt-2 text-[13px] font-semibold">REPUBLIK INDONESIA</p>
          <p className="mt-3 text-[12px] text-body">Hold the card inside the frame</p>
        </div>
        <p className="mt-4 text-center text-[12px] leading-4 text-body">
          Make sure the entire content of your KTP is clearly readable to be capture automatically.
        </p>
        <div className="mt-8 flex size-14 items-center justify-center rounded-full bg-card font-serif text-[28px] font-semibold">
          {count > 0 ? count : <Loader2 className="size-6 animate-spin" aria-hidden="true" />}
        </div>
      </div>
    </Phone>
  );
}
