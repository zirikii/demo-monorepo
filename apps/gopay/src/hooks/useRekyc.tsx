import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialRekycState } from "@/data/account";
import { pendingSubmission, runVerification, type VerificationOutcome } from "@/lib/rekyc/engine";
import type { EddAnswers, RejectionReason, RekycState } from "@/lib/rekyc/types";
import { SCENARIOS, type ScenarioId } from "@/lib/scenarios";
import { clearAll, readJson, writeJson } from "@/lib/storage";

export const SCREENS = [
  "home",
  "dira",
  "vac",
  "ektp-review",
  "capture-onboarding",
  "fr-ready",
  "fr-liveness",
  "fr-failed",
  "fr-blocked",
  "ktp-capture",
  "ktp-slow",
  "edd-income",
  "edd-purpose",
  "result-uploading",
  "result-reviewing",
  "result-slow",
  "result-pending",
  "result-failed",
] as const;

export type Screen = (typeof SCREENS)[number];

export const FACE_ATTEMPT_LIMIT = 4;

export type SubmitOutcome = VerificationOutcome["kind"];

interface RekycContextValue {
  state: RekycState;
  screen: Screen;
  scenarioId: ScenarioId;
  toast: string | null;
  faceAttemptsUsed: number;
  eddAnswers: Partial<EddAnswers>;
  lastRejection: RejectionReason | null;
  /** Result of the most recent pipeline run, which the result screens branch on. */
  lastOutcome: SubmitOutcome | null;
  go: (screen: Screen) => void;
  setScenario: (id: ScenarioId) => void;
  startRekyc: () => void;
  /** Runs the FR gate; a failed match never reaches KTP capture. */
  completeFaceCheck: () => void;
  retryFaceCheck: () => void;
  /** Submits the captured card through the verification pipeline. */
  submitCapture: (answers?: EddAnswers) => SubmitOutcome;
  answerEdd: (patch: Partial<EddAnswers>) => void;
  showToast: (message: string | null) => void;
  reset: () => void;
}

const RekycContext = createContext<RekycContextValue | null>(null);

const STATE_KEY = "state";
const SCENARIO_KEY = "scenario";

/** `?screen=fr-failed` deep-links the harness straight at one frame for review. */
function initialScreen(): Screen {
  const requested = new URLSearchParams(window.location.search).get("screen");
  return SCREENS.find((screen) => screen === requested) ?? "home";
}

export function RekycProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RekycState>(() => readJson(STATE_KEY, initialRekycState()));
  const [scenarioId, setScenarioId] = useState<ScenarioId>(() => readJson(SCENARIO_KEY, "happy"));
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [toast, setToast] = useState<string | null>(null);
  const [faceAttemptsUsed, setFaceAttemptsUsed] = useState(0);
  const [eddAnswers, setEddAnswers] = useState<Partial<EddAnswers>>({});
  const [lastRejection, setLastRejection] = useState<RejectionReason | null>(null);
  const [lastOutcome, setLastOutcome] = useState<SubmitOutcome | null>(null);

  useEffect(() => writeJson(STATE_KEY, state), [state]);
  useEffect(() => writeJson(SCENARIO_KEY, scenarioId), [scenarioId]);

  const go = useCallback((next: Screen) => {
    setScreen(next);
    setToast(null);
  }, []);

  // A submission already in the review queue blocks a new attempt (PRD 4.3.2), so the
  // entry point shows its status instead of restarting the flow.
  const startRekyc = useCallback(() => {
    setFaceAttemptsUsed(0);
    setEddAnswers({});
    setLastRejection(null);
    setToast(null);
    setScreen(pendingSubmission(state) ? "result-pending" : "ektp-review");
  }, [state]);

  const completeFaceCheck = useCallback(() => {
    if (SCENARIOS[scenarioId].faceMatchPassed) {
      setScreen("ktp-capture");
      return;
    }
    setFaceAttemptsUsed((used) => {
      const next = used + 1;
      setScreen(next >= FACE_ATTEMPT_LIMIT ? "fr-blocked" : "fr-failed");
      return next;
    });
  }, [scenarioId]);

  const retryFaceCheck = useCallback(() => setScreen("fr-liveness"), []);

  const answerEdd = useCallback(
    (patch: Partial<EddAnswers>) => setEddAnswers((prev) => ({ ...prev, ...patch })),
    [],
  );

  const submitCapture = useCallback(
    (answers?: EddAnswers) => {
      const scenario = SCENARIOS[scenarioId];
      const outcome = runVerification({
        state,
        capturedData: scenario.capturedData,
        faceMatchPassed: scenario.faceMatchPassed,
        ocrConfidence: scenario.ocrConfidence,
        dukcapilConfidence: scenario.dukcapilConfidence,
        dukcapilVerified: scenario.dukcapilVerified,
        nameScreeningCleared: scenario.nameScreeningCleared,
        riskScore: scenario.riskScore,
        eddAnswers: answers ?? null,
        now: new Date().toISOString(),
        submissionId: `sub_${Date.now()}`,
      });

      switch (outcome.kind) {
        case "approved":
          setState(outcome.state);
          setLastRejection(null);
          break;
        case "rejected":
          setState(outcome.state);
          setLastRejection(outcome.reason);
          break;
        case "pending_review":
          setState(outcome.state);
          setLastRejection(null);
          break;
        case "edd_required":
          break;
        default: {
          const exhaustive: never = outcome;
          throw new Error(`Unhandled outcome ${JSON.stringify(exhaustive)}`);
        }
      }

      setLastOutcome(outcome.kind);
      return outcome.kind;
    },
    [scenarioId, state],
  );

  const reset = useCallback(() => {
    clearAll();
    setState(initialRekycState());
    setScenarioId("happy");
    setFaceAttemptsUsed(0);
    setEddAnswers({});
    setLastRejection(null);
    setLastOutcome(null);
    setToast(null);
    setScreen("home");
  }, []);

  const value = useMemo<RekycContextValue>(
    () => ({
      state,
      screen,
      scenarioId,
      toast,
      faceAttemptsUsed,
      eddAnswers,
      lastRejection,
      lastOutcome,
      go,
      setScenario: setScenarioId,
      startRekyc,
      completeFaceCheck,
      retryFaceCheck,
      submitCapture,
      answerEdd,
      showToast: setToast,
      reset,
    }),
    [
      state,
      screen,
      scenarioId,
      toast,
      faceAttemptsUsed,
      eddAnswers,
      lastRejection,
      lastOutcome,
      go,
      startRekyc,
      completeFaceCheck,
      retryFaceCheck,
      submitCapture,
      answerEdd,
      reset,
    ],
  );

  return <RekycContext.Provider value={value}>{children}</RekycContext.Provider>;
}

export function useRekyc(): RekycContextValue {
  const ctx = useContext(RekycContext);
  if (!ctx) throw new Error("useRekyc must be used inside <RekycProvider>");
  return ctx;
}
