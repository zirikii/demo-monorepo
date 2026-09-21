import { PhoneFrame } from "@/components/system/PhoneFrame";
import { AccountsCenter } from "@/screens/AccountsCenter";
import { CaptureOnboarding } from "@/screens/CaptureOnboarding";
import { DiraHelp } from "@/screens/DiraHelp";
import { EddIncome, EddPurpose } from "@/screens/EddQuestions";
import { EktpReview } from "@/screens/EktpReview";
import { FaceBlocked, FaceFailed, FaceLiveness, FaceReady } from "@/screens/FaceVerification";
import { Home } from "@/screens/Home";
import { KtpCapture } from "@/screens/KtpCapture";
import {
  ResultFailed,
  ResultPending,
  ResultReviewing,
  ResultSlow,
  ResultUploading,
} from "@/screens/ResultScreens";
import { RekycProvider, useRekyc, type Screen } from "@/hooks/useRekyc";
import { SCENARIOS, SCENARIO_ORDER } from "@/lib/scenarios";
import { approvedSubmission, pendingSubmission } from "@/lib/rekyc/engine";
import { cn } from "@/lib/cn";

function CurrentScreen() {
  const { screen } = useRekyc();

  switch (screen) {
    case "home":
      return <Home />;
    case "dira":
      return <DiraHelp />;
    case "vac":
      return <AccountsCenter />;
    case "ektp-review":
      return <EktpReview />;
    case "capture-onboarding":
      return <CaptureOnboarding />;
    case "fr-ready":
      return <FaceReady />;
    case "fr-liveness":
      return <FaceLiveness />;
    case "fr-failed":
      return <FaceFailed />;
    case "fr-blocked":
      return <FaceBlocked />;
    case "ktp-capture":
    case "ktp-slow":
      return <KtpCapture />;
    case "edd-income":
      return <EddIncome />;
    case "edd-purpose":
      return <EddPurpose />;
    case "result-uploading":
      return <ResultUploading />;
    case "result-reviewing":
      return <ResultReviewing />;
    case "result-slow":
      return <ResultSlow />;
    case "result-pending":
      return <ResultPending />;
    case "result-failed":
      return <ResultFailed />;
    default: {
      const exhaustive: never = screen;
      throw new Error(`Unhandled screen ${String(exhaustive)}`);
    }
  }
}

const JUMP_TARGETS: { screen: Screen; label: string }[] = [
  { screen: "home", label: "Home" },
  { screen: "vac", label: "Accounts Center" },
  { screen: "dira", label: "Dira help" },
  { screen: "ektp-review", label: "e-KTP review" },
];

/**
 * The demo harness beside the phone. It is not part of the GoPay design — it exposes
 * the verification scenarios and the resulting account record so the whole PRD
 * pipeline can be walked through without a backend.
 */
function Inspector() {
  const { state, scenarioId, setScenario, screen, go, reset, lastRejection } = useRekyc();
  const approved = approvedSubmission(state);
  const pending = pendingSubmission(state);

  return (
    <aside className="flex w-[320px] shrink-0 flex-col gap-[16px] text-[13px] leading-[18px] text-[#26251e]">
      <header className="flex flex-col gap-[4px]">
        <h1 className="text-[18px] leading-[24px] font-bold">GoPay self-serve re-KYC</h1>
        <p className="text-[#5d5c55]">
          Unofficial demo of the reKYC user flow. Pick a verification scenario, then start
          from any entry point.
        </p>
      </header>

      <section className="flex flex-col gap-[8px] rounded-[16px] bg-white p-[16px] shadow-sm">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a887d]">
          Scenario
        </h2>
        {SCENARIO_ORDER.map((id) => (
          <label
            key={id}
            className={cn(
              "flex cursor-pointer gap-[8px] rounded-[10px] p-[8px]",
              id === scenarioId ? "bg-[#e8f5e9]" : "hover:bg-[#f3f3f0]",
            )}
          >
            <input
              type="radio"
              name="scenario"
              className="mt-[3px] accent-[#00880d]"
              checked={id === scenarioId}
              onChange={() => setScenario(id)}
            />
            <span className="flex flex-col">
              <span className="font-semibold">{SCENARIOS[id].label}</span>
              <span className="text-[12px] text-[#5d5c55]">{SCENARIOS[id].description}</span>
            </span>
          </label>
        ))}
      </section>

      <section className="flex flex-col gap-[8px] rounded-[16px] bg-white p-[16px] shadow-sm">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a887d]">
          Jump to
        </h2>
        <div className="flex flex-wrap gap-[8px]">
          {JUMP_TARGETS.map((target) => (
            <button
              key={target.screen}
              type="button"
              onClick={() => go(target.screen)}
              className={cn(
                "cursor-pointer rounded-[999px] border px-[12px] py-[6px] text-[12px] font-semibold",
                screen === target.screen
                  ? "border-[#00880d] bg-[#00880d] text-white"
                  : "border-[#dcdcd6] bg-white hover:bg-[#f3f3f0]",
              )}
            >
              {target.label}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-[6px] rounded-[16px] bg-white p-[16px] shadow-sm">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a887d]">
          Account record
        </h2>
        <p>
          KYC status: <strong>{state.account.kycStatus}</strong>
        </p>
        <p>
          Risk tier: <strong>{approved?.riskTier ?? "—"}</strong> · ODD every{" "}
          {state.account.oddIntervalDays} days
        </p>
        <p>
          Next review:{" "}
          <strong>{new Date(state.account.oddDueAt).toLocaleDateString("en-GB")}</strong>
        </p>
        <p>
          Data in use: <strong>{approved?.data.address ?? "—"}</strong>
        </p>
        <p>
          Submissions: <strong>{state.submissions.length}</strong>
          {pending ? " · 1 in review" : null}
        </p>
        {lastRejection ? (
          <p className="text-[#c62828]">
            Last rejection: <strong>{lastRejection}</strong>
          </p>
        ) : null}
        <p>
          Partner notifications: <strong>{state.notifications.length}</strong>
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-[8px] cursor-pointer self-start rounded-[999px] border border-[#dcdcd6] px-[12px] py-[6px] text-[12px] font-semibold hover:bg-[#f3f3f0]"
        >
          Reset demo
        </button>
      </section>
    </aside>
  );
}

export function App() {
  return (
    <RekycProvider>
      <div className="flex min-h-full items-start justify-center gap-[48px] p-[40px]">
        <Inspector />
        <PhoneFrame>
          <CurrentScreen />
        </PhoneFrame>
      </div>
    </RekycProvider>
  );
}
