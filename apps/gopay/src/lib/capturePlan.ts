import { GENIE_BANNER, SUCCESS_TOAST } from "@/data/identity";
import type { AccountState } from "@/lib/kyc";

export type CaptureOutcome = "approved" | "nik-mismatch" | "pending" | "dukcapil-fail";

export function applyResult(
  next: AccountState,
  outcome: CaptureOutcome,
  setAccount: (account: AccountState) => void,
  showToast: (message: string) => void,
  setGenie: (message: string | null) => void,
) {
  setAccount(next);
  if (outcome === "approved") {
    showToast(SUCCESS_TOAST);
    setGenie(GENIE_BANNER);
  }
}

export function routeFor(outcome: CaptureOutcome): string {
  switch (outcome) {
    case "approved":
      return "/account";
    case "nik-mismatch":
      return "/mismatch";
    case "pending":
      return "/pending";
    case "dukcapil-fail":
      return "/rejected";
    default: {
      const unreachable: never = outcome;
      return unreachable;
    }
  }
}
