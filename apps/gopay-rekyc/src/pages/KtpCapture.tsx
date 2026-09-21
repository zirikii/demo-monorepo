import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { Button } from "../components/ui/Button";
import { useDemo } from "../context/useDemo";
import type { RetryReason } from "../domain/decision";
import { decideSession, submitKtp } from "../lib/api";
import { simulationDelay } from "../lib/simulate";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryLabel(reason: RetryReason): string {
  switch (reason) {
    case "upload_failed":
      return "Upload didn't go through. Please try the photo again.";
    case "photo_unclear":
      return "The photo isn't clear enough. Retake your e-KTP.";
    case "not_aligned":
      return "Line the whole e-KTP up inside the frame.";
    case "detect_timeout":
      return "We couldn't detect the card within 15 seconds.";
    case "unreadable":
      return "Make sure the entire content of your KTP is clearly readable.";
    default: {
      const unreachable: never = reason;
      return unreachable;
    }
  }
}

export function KtpCapturePage() {
  const navigate = useNavigate();
  const { sessionId, instant } = useDemo();
  const [count, setCount] = useState<number | null>(3);
  const [message, setMessage] = useState<string | null>(null);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!sessionId) navigate("/rekyc/review");
  }, [navigate, sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    async function run() {
      for (const step of [3, 2, 1]) {
        if (cancelled) return;
        setCount(step);
        setMessage(null);
        await wait(simulationDelay(instant));
      }
      if (cancelled || !sessionId) return;
      setCount(null);
      try {
        const preview = await submitKtp(sessionId);
        if (cancelled) return;
        if (preview.decision.outcome === "needs_edd") {
          navigate("/rekyc/edd");
          return;
        }
        if (preview.decision.outcome === "retry") {
          setMessage(retryLabel(preview.decision.reason));
          return;
        }
        if (preview.decision.outcome === "pending_timeout") {
          setMessage("Still verifying. This is taking longer than 5 minutes.");
          return;
        }
        const decided = await decideSession(sessionId);
        if (cancelled) return;
        navigate("/rekyc/result", { state: { decision: decided.decision } });
      } catch (reason) {
        if (!cancelled) setMessage(reason instanceof Error ? reason.message : "Capture failed");
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [instant, navigate, runId, sessionId]);

  return (
    <div className="relative flex h-full flex-col bg-card">
      <StatusBar />
      <button type="button" onClick={() => navigate("/rekyc/onboarding")} aria-label="Back" className="ml-3 w-10 text-left text-2xl">
        ‹
      </button>
      <h1 className="mx-8 mt-6 text-center text-[26px] font-extrabold leading-8">
        Verifying your e-KTP, please don&apos;t leave the screen yet
      </h1>
      <div className="relative mx-6 mt-8 overflow-hidden rounded-2xl">
        <img src="/figma/ktp-card.png" alt="Sample e-KTP" className="w-full scale-125" />
        {count !== null ? (
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-3xl font-bold shadow">
            {count}
          </span>
        ) : null}
      </div>
      {message ? (
        <div className="mx-6 mt-6">
          <p className="text-center text-body-small text-text-body">{message}</p>
          <div className="mt-4">
            <Button onClick={() => setRunId((value) => value + 1)}>Try again</Button>
          </div>
        </div>
      ) : (
        <p className="mx-8 mt-6 text-center text-xs text-text-body">
          Make sure the entire content of your KTP is clearly readable to be captured automatically.
        </p>
      )}
      <HomeIndicator />
    </div>
  );
}
