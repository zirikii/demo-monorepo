import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ONBOARDING_COPY } from "../data/copy";

export function OnboardingPage() {
  const navigate = useNavigate();
  const copy = ONBOARDING_COPY.rekyc;
  return (
    <div className="relative flex h-full flex-col bg-[#f3f5f6]">
      <div className="relative bg-gradient-to-b from-[#2ec5e0] to-[#19b3a2]">
        <StatusBar tone="light" />
        <button
          type="button"
          onClick={() => navigate("/rekyc/face")}
          aria-label="Back"
          className="absolute left-4 top-14 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-text-title"
        >
          ‹
        </button>
        <div className="h-[150px] overflow-hidden">
          <img src="/figma/onboarding-art.png" alt="" className="h-[200px] w-[140%] max-w-none -translate-x-16 object-cover object-top" />
        </div>
      </div>
      <Card className="relative z-10 mx-4 -mt-6 px-4 pb-4 pt-5">
        <h1 className="text-center text-[22px] font-extrabold">{copy.title}</h1>
        <p className="mt-1 text-center text-body-small text-text-body">{copy.subtitle}</p>
        <ol className="mt-4 space-y-3">
          {copy.steps.map((step) => (
            <li key={step.n} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-quaternary text-xs font-bold">{step.n}</span>
              <span className="flex-1 text-title-tiny font-semibold">{step.label}</span>
              <span className="h-6 w-9 rounded bg-[#d7f3fb]" aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="mt-4 flex gap-2 rounded-xl bg-bg-quaternary px-3 py-2 text-xs text-text-body">
          <span aria-hidden="true">ℹ</span>
          {copy.note}
        </p>
      </Card>
      <p className="mx-4 mt-3 flex items-center justify-center gap-2 rounded-full bg-card py-2 text-xs font-semibold text-gopay-active">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {copy.supervised}
      </p>
      <div className="mt-auto px-4 pb-8">
        <p className="mb-3 text-center text-xs text-text-body">
          {copy.legalLead} <span className="font-bold text-gopay-active">{copy.terms}</span> and{" "}
          <span className="font-bold text-gopay-active">{copy.privacy}</span>
        </p>
        <Button onClick={() => navigate("/rekyc/ktp")}>{copy.cta}</Button>
      </div>
      <HomeIndicator />
    </div>
  );
}
