import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { FACE_ATTEMPT_LIMIT, RekycProvider, useRekyc } from "@/hooks/useRekyc";
import { ON_FILE_KTP, UPDATED_KTP } from "@/data/account";
import { approvedSubmission, dataInUse } from "@/lib/rekyc/engine";

function wrapper({ children }: { children: ReactNode }) {
  return <RekycProvider>{children}</RekycProvider>;
}

function setup() {
  return renderHook(() => useRekyc(), { wrapper });
}

beforeEach(() => window.localStorage.clear());

describe("re-KYC flow state", () => {
  it("opens on the home screen with the seeded approved submission", () => {
    const { result } = setup();

    expect(result.current.screen).toBe("home");
    expect(dataInUse(result.current.state)).toEqual(ON_FILE_KTP);
  });

  it("walks the happy path from review to an approved submission", () => {
    const { result } = setup();

    act(() => result.current.startRekyc());
    expect(result.current.screen).toBe("ektp-review");

    act(() => result.current.go("capture-onboarding"));
    act(() => result.current.completeFaceCheck());
    expect(result.current.screen).toBe("ktp-capture");

    let outcome: string | undefined;
    act(() => {
      outcome = result.current.submitCapture();
    });

    expect(outcome).toBe("approved");
    expect(result.current.lastOutcome).toBe("approved");
    expect(dataInUse(result.current.state)).toEqual(UPDATED_KTP);
    expect(result.current.lastRejection).toBeNull();
  });

  it("never reaches capture when the face check fails, and blocks after the limit", () => {
    const { result } = setup();

    act(() => result.current.setScenario("face_fail"));
    act(() => result.current.startRekyc());

    for (let attempt = 1; attempt < FACE_ATTEMPT_LIMIT; attempt += 1) {
      act(() => result.current.completeFaceCheck());
      expect(result.current.screen).toBe("fr-failed");
      act(() => result.current.retryFaceCheck());
    }

    act(() => result.current.completeFaceCheck());
    expect(result.current.screen).toBe("fr-blocked");
    expect(result.current.faceAttemptsUsed).toBe(FACE_ATTEMPT_LIMIT);
    expect(dataInUse(result.current.state)).toEqual(ON_FILE_KTP);
  });

  it("records the rejection reason when a different card is captured", () => {
    const { result } = setup();

    act(() => result.current.setScenario("nik_mismatch"));
    act(() => result.current.startRekyc());

    let outcome: string | undefined;
    act(() => {
      outcome = result.current.submitCapture();
    });

    expect(outcome).toBe("rejected");
    expect(result.current.lastRejection).toBe("rekyc_id_mismatch");
    expect(dataInUse(result.current.state)).toEqual(ON_FILE_KTP);
  });

  it("collects EDD answers before a high-risk profile can be decided", () => {
    const { result } = setup();

    act(() => result.current.setScenario("high_risk"));
    act(() => result.current.startRekyc());

    let gate: string | undefined;
    act(() => {
      gate = result.current.submitCapture();
    });
    expect(gate).toBe("edd_required");
    expect(approvedSubmission(result.current.state)?.type).toBe("initial_kyc");

    act(() => result.current.answerEdd({ sourceOfIncome: "Salary" }));
    let decided: string | undefined;
    act(() => {
      decided = result.current.submitCapture({
        sourceOfIncome: "Salary",
        upgradePurpose: "Bill payment",
      });
    });

    expect(decided).toBe("approved");
    expect(approvedSubmission(result.current.state)?.eddAnswers).toEqual({
      sourceOfIncome: "Salary",
      upgradePurpose: "Bill payment",
    });
  });

  it("shows the pending result instead of restarting while a review is queued", () => {
    const { result } = setup();

    act(() => result.current.setScenario("manual_review"));
    act(() => result.current.startRekyc());
    act(() => {
      result.current.submitCapture();
    });

    act(() => result.current.startRekyc());
    expect(result.current.screen).toBe("result-pending");
  });

  it("restores persisted state and clears it on reset", () => {
    const first = setup();
    act(() => first.result.current.submitCapture());
    expect(dataInUse(first.result.current.state)).toEqual(UPDATED_KTP);
    first.unmount();

    const second = setup();
    expect(dataInUse(second.result.current.state)).toEqual(UPDATED_KTP);

    act(() => second.result.current.reset());
    expect(dataInUse(second.result.current.state)).toEqual(ON_FILE_KTP);
    expect(second.result.current.screen).toBe("home");
  });
});
