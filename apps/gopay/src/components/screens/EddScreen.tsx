import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INCOME_OPTIONS, PURPOSE_OPTIONS, UPDATED_KTP } from "@/data/identity";
import { NavBar, Phone, PrimaryButton, StatusBar } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { applyResult, routeFor } from "@/lib/capturePlan";
import { recordCapture } from "@/lib/kyc";

export function EddScreen({ step }: { step: "income" | "purpose" }) {
  const navigate = useNavigate();
  const { account, scenario, setAccount, showToast, setGenie } = useSession();
  const options = step === "income" ? INCOME_OPTIONS : PURPOSE_OPTIONS;
  const [selected, setSelected] = useState<string | null>(null);
  const question =
    step === "income" ? "What is your source of income?" : "What is purpose of upgrading?";

  function next() {
    if (!selected) return;
    if (step === "income") {
      navigate("/edd/purpose");
      return;
    }
    const outcome = scenario === "dukcapil-fail" ? "dukcapil-fail" : "approved";
    const result = recordCapture(account, {
      data: UPDATED_KTP,
      riskScore: 82,
      outcome,
      now: new Date(),
    });
    if (!result.ok) {
      navigate("/review");
      return;
    }
    applyResult(result.value, outcome, setAccount, showToast, setGenie);
    navigate(routeFor(outcome));
  }

  return (
    <Phone>
      <StatusBar />
      <NavBar title="gopay" onBack={() => navigate(step === "purpose" ? "/edd" : "/onboarding")} />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="rounded-[20px] bg-card p-4 shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
          <h2 className="font-serif text-[21px] font-semibold leading-7">
            Answer these questions to continue your upgrade
          </h2>
          <p className="mt-2 text-[16px] leading-5 text-body">
            Per BI regulation, please answer the questions to continue verification
          </p>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-card-2 px-6 py-4 text-center text-[12px] font-semibold">
            <span className={step === "income" ? "text-gopay-ink" : "text-inactive"}>1 Source of income</span>
            <span className={step === "purpose" ? "text-gopay-ink" : "text-inactive"}>2 Upgrade Purpose</span>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-[20px] bg-card shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
          <p className="px-4 pb-2 pt-4 text-[16px] font-semibold">{question}</p>
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 border-t border-line px-4 py-4 text-[16px]">
              <input
                type="radio"
                name={step}
                className="size-5 accent-gopay"
                checked={selected === option}
                onChange={() => setSelected(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="bg-card p-4">
        <PrimaryButton disabled={!selected} onClick={next}>
          Continue
        </PrimaryButton>
      </div>
    </Phone>
  );
}
