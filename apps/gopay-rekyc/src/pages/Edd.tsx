import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Navbar } from "../components/ui/Navbar";
import { RadioRow } from "../components/ui/RadioRow";
import { Stepper } from "../components/ui/Stepper";
import { useDemo } from "../context/useDemo";
import { INCOME_OPTIONS, PURPOSE_OPTIONS } from "../data/copy";
import { decideSession, submitEdd } from "../lib/api";

export function EddPage() {
  const navigate = useNavigate();
  const { sessionId } = useDemo();
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choosePurpose(value: string) {
    if (!sessionId || !income) return;
    setPurpose(value);
    setError(null);
    try {
      await submitEdd(sessionId, income, value);
      const decided = await decideSession(sessionId);
      navigate("/rekyc/result", { state: { decision: decided.decision } });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not save answers");
    }
  }

  const options = step === 0 ? INCOME_OPTIONS : PURPOSE_OPTIONS;
  const question = step === 0 ? "What is your source of income?" : "What is purpose of upgrading?";

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <StatusBar />
      <Navbar title="GoPay Plus" onBack={() => (step === 0 ? navigate("/rekyc/ktp") : setStep(0))} />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8">
        <h1 className="text-[22px] font-extrabold leading-7">Answer these questions to continue your upgrade</h1>
        <p className="mt-2 text-body-small text-text-body">Per BI regulation, please answer the questions to continue verification</p>
        <div className="mt-4 rounded-2xl bg-card p-4">
          <Stepper steps={[{ label: "Source of income" }, { label: "Upgrade Purpose" }]} current={step} />
        </div>
        <div className="mt-4 rounded-2xl bg-card px-4 py-2">
          <h2 className="py-3 text-title-small font-bold">{question}</h2>
          <div role="radiogroup" aria-label={question}>
            {options.map((option) => (
              <RadioRow
                key={option}
                label={option}
                checked={step === 0 ? income === option : purpose === option}
                onSelect={() => {
                  if (step === 0) {
                    setIncome(option);
                    setStep(1);
                    return;
                  }
                  void choosePurpose(option);
                }}
              />
            ))}
          </div>
        </div>
        {error ? <p className="mt-3 text-xs text-danger">{error}</p> : null}
      </div>
      <HomeIndicator />
    </div>
  );
}
