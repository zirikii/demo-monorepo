import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { readJson, writeJson } from "@/lib/storage";
import {
  seedCandidates,
  seedEmployees,
  seedLeave,
  seedPayRuns,
  type Candidate,
  type Employee,
  type LeaveRequest,
  type PayRun,
} from "@/data/platform";

const LEAVE_KEY = "employment-hero-demo-leave";
const PAYRUN_KEY = "employment-hero-demo-payruns";
const CANDIDATE_KEY = "employment-hero-demo-candidates";

type WorkspaceValue = {
  employees: Employee[];
  leave: LeaveRequest[];
  payRuns: PayRun[];
  candidates: Candidate[];
  decideLeave: (id: string, status: "Approved" | "Declined") => void;
  approvePayRun: (id: string) => void;
  advanceCandidate: (id: string) => void;
  reset: () => void;
};

const stages: Candidate["stage"][] = ["Applied", "Screening", "Interview", "Offer", "Hired"];

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [leave, setLeave] = useState<LeaveRequest[]>(() => readJson(LEAVE_KEY, seedLeave));
  const [payRuns, setPayRuns] = useState<PayRun[]>(() => readJson(PAYRUN_KEY, seedPayRuns));
  const [candidates, setCandidates] = useState<Candidate[]>(() =>
    readJson(CANDIDATE_KEY, seedCandidates),
  );

  /*
   * Approvals can be double-clicked, and reading the previous value from a captured
   * `leave`/`payRuns` closure would persist a stale array on the second call. The refs
   * always hold what was last written.
   */
  const leaveRef = useRef(leave);
  const payRunRef = useRef(payRuns);
  const candidateRef = useRef(candidates);

  const decideLeave = useCallback((id: string, status: "Approved" | "Declined") => {
    const next = leaveRef.current.map((request) =>
      request.id === id ? { ...request, status } : request,
    );
    leaveRef.current = next;
    setLeave(next);
    writeJson(LEAVE_KEY, next);
  }, []);

  const approvePayRun = useCallback((id: string) => {
    const next = payRunRef.current.map((run) =>
      run.id === id && run.status !== "Finalised"
        ? { ...run, status: "Finalised" as const, anomalies: [] }
        : run,
    );
    payRunRef.current = next;
    setPayRuns(next);
    writeJson(PAYRUN_KEY, next);
  }, []);

  const advanceCandidate = useCallback((id: string) => {
    const next = candidateRef.current.map((candidate) => {
      if (candidate.id !== id) return candidate;
      const index = stages.indexOf(candidate.stage);
      const nextStage = stages[Math.min(index + 1, stages.length - 1)];
      return nextStage ? { ...candidate, stage: nextStage } : candidate;
    });
    candidateRef.current = next;
    setCandidates(next);
    writeJson(CANDIDATE_KEY, next);
  }, []);

  const reset = useCallback(() => {
    leaveRef.current = seedLeave;
    payRunRef.current = seedPayRuns;
    candidateRef.current = seedCandidates;
    setLeave(seedLeave);
    setPayRuns(seedPayRuns);
    setCandidates(seedCandidates);
    writeJson(LEAVE_KEY, seedLeave);
    writeJson(PAYRUN_KEY, seedPayRuns);
    writeJson(CANDIDATE_KEY, seedCandidates);
  }, []);

  const value = useMemo<WorkspaceValue>(
    () => ({
      employees: seedEmployees,
      leave,
      payRuns,
      candidates,
      decideLeave,
      approvePayRun,
      advanceCandidate,
      reset,
    }),
    [leave, payRuns, candidates, decideLeave, approvePayRun, advanceCandidate, reset],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceValue {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside a WorkspaceProvider");
  return context;
}
