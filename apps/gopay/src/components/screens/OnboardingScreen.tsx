import { Info, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Phone, PrimaryButton, StatusBar } from "@/components/chrome/Chrome";

export function OnboardingScreen() {
  const navigate = useNavigate();
  return (
    <Phone>
      <div className="h-[180px] bg-gradient-to-b from-[#c8f0cc] via-[#e7f6e8] to-page" />
      <div className="absolute inset-x-0 top-0">
        <StatusBar />
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate("/review")}
          className="ml-4 flex size-10 items-center justify-center rounded-full bg-card-2 shadow"
        >
          ←
        </button>
      </div>
      <div className="-mt-10 flex-1 overflow-y-auto px-4">
        <div className="rounded-[20px] border border-line bg-card-2 p-6 text-center shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
          <h2 className="font-serif text-[21px] font-semibold leading-7">Update your e-KTP data</h2>
          <p className="mt-1 text-[13px] text-body">Take your e-KTP and selfie</p>
          <div className="mt-4 rounded-xl bg-card px-3 py-3 text-left">
            <Step n="1" label="Take e-KTP photo" />
            <Step n="2" label="Selfie" hint="Reused from the face check you just finished" />
            <p className="mt-3 flex items-start gap-2 rounded-lg bg-mute p-2 text-[12px] leading-4 text-body">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              An electronic certificate will be generated for you by DigiSign
            </p>
          </div>
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 rounded-full bg-mute px-4 py-2 text-[12px] font-semibold text-gopay-ink">
          <ShieldCheck className="size-4" aria-hidden="true" />
          GoPay is supervised by Bank Indonesia
        </p>
      </div>
      <div className="bg-card px-4 py-4 shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
        <p className="mb-2 text-center text-[12px] leading-4 text-faint">
          By continuing, you agree to the{" "}
          <button type="button" className="font-semibold text-gopay-ink" onClick={() => navigate("/terms")}>
            Terms & Conditions
          </button>{" "}
          and{" "}
          <button type="button" className="font-semibold text-gopay-ink" onClick={() => navigate("/privacy")}>
            Privacy Policy
          </button>
        </p>
        <PrimaryButton onClick={() => navigate("/capture")}>Continue</PrimaryButton>
      </div>
    </Phone>
  );
}

function Step({ n, label, hint }: { n: string; label: string; hint?: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="flex size-5 items-center justify-center rounded-full border-2 border-line text-[12px] font-semibold text-body">
        {n}
      </span>
      <span>
        <span className="block text-[12px] font-semibold text-body">{label}</span>
        {hint ? <span className="block text-[11px] text-faint">{hint}</span> : null}
      </span>
    </div>
  );
}
