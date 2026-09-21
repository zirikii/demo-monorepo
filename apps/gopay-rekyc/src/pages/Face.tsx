import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { FaceFailure, FaceLockout } from "../components/rekyc/FaceFailure";
import { BottomSheet } from "../components/ui/BottomSheet";
import { Button } from "../components/ui/Button";
import { useDemo } from "../context/useDemo";
import { submitFace } from "../lib/api";
import { LIVENESS_PHASES, simulationDelay } from "../lib/simulate";

type Stage = "ready" | "guides" | "capture" | "fail" | "lockout";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function FacePage() {
  const navigate = useNavigate();
  const { sessionId, instant } = useDemo();
  const [stage, setStage] = useState<Stage>("ready");
  const [phase, setPhase] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [error, setError] = useState<string | null>(null);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!sessionId) navigate("/rekyc/review");
  }, [navigate, sessionId]);

  useEffect(() => {
    if (stage !== "capture" || !sessionId) return;
    let cancelled = false;
    async function run() {
      for (let index = 0; index < LIVENESS_PHASES.length; index += 1) {
        if (cancelled) return;
        setPhase(index);
        await wait(simulationDelay(instant));
      }
      if (cancelled || !sessionId) return;
      try {
        const result = await submitFace(sessionId);
        if (cancelled) return;
        if (result.decision.outcome === "passed") {
          navigate("/rekyc/onboarding");
          return;
        }
        if (result.decision.outcome === "lockout") {
          setStage("lockout");
          return;
        }
        setAttemptsLeft(result.decision.attemptsLeft);
        setStage("fail");
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Face check failed");
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [instant, navigate, runId, sessionId, stage]);

  if (stage === "fail") {
    return (
      <div className="relative h-full">
        <FaceFailure
          attemptsLeft={attemptsLeft}
          onRetry={() => {
            setStage("capture");
            setRunId((value) => value + 1);
          }}
          onHelp={() => navigate("/dira")}
          onClose={() => navigate("/rekyc/review")}
        />
        <HomeIndicator tone="light" />
      </div>
    );
  }

  if (stage === "lockout") {
    return (
      <div className="relative h-full">
        <FaceLockout onHelp={() => navigate("/dira")} onClose={() => navigate("/rekyc/review")} />
        <HomeIndicator tone="light" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-[#8d8d8d] text-static-white">
      <StatusBar tone="light" />
      <div className="flex items-center justify-between px-2">
        <button type="button" onClick={() => navigate("/rekyc/review")} aria-label="Back" className="flex h-10 w-10 items-center justify-center text-xl">
          ‹
        </button>
        <button type="button" className="pr-3 text-body-small font-semibold" onClick={() => setStage("guides")}>
          View Guides
        </button>
      </div>
      <p className="mt-6 text-center text-title-small font-bold">Fit your face in the photo area</p>
      <div className="relative mx-auto mt-4 h-56 w-56 overflow-hidden rounded-full bg-[#6f6f6f]">
        <img src="/figma/face-photo.png" alt="" className="h-full w-full object-cover" />
        <span
          className="absolute inset-3 rounded-full border-4 border-transparent border-t-gopay-active"
          style={{ transform: `rotate(${phase * 120}deg)` }}
        />
      </div>
      {error ? <p className="mt-3 px-6 text-center text-xs">{error}</p> : null}
      <div className="mt-auto">
        {stage === "guides" ? (
          <BottomSheet>
            <h2 className="text-title-moderate font-bold text-text-title">Biar verifikasinya lancar, pastiin kamu:</h2>
            <ul className="mt-3 space-y-2 text-body-small text-text-body">
              <li>Enough lighting — not too dark or too bright.</li>
              <li>No glasses, mask, or hat.</li>
              <li>Photosensitivity warning: the next screen contains bright and flashing lights.</li>
            </ul>
            <div className="mt-4">
              <Button onClick={() => setStage("ready")}>Close guides</Button>
            </div>
          </BottomSheet>
        ) : (
          <BottomSheet>
            <h2 className="text-center text-[20px] font-extrabold text-text-title">Get ready for face verification</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-text-title">
              {["Enough lighting", "No glasses", "Don't wear hat"].map((item) => (
                <div key={item} className="rounded-2xl bg-bg-quaternary px-2 py-3">
                  <span className="mb-2 block text-lg" aria-hidden="true">
                    {item === "Enough lighting" ? "💡" : item === "No glasses" ? "🕶️" : "🧢"}
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                onClick={() => {
                  setError(null);
                  setStage("capture");
                  setRunId((value) => value + 1);
                }}
              >
                Got it, I&apos;m ready
              </Button>
            </div>
          </BottomSheet>
        )}
      </div>
      <HomeIndicator tone="light" />
    </div>
  );
}
