import { createContext, useContext } from "react";
import type { AccountResponse } from "../lib/api";

export type DemoContextValue = {
  account: AccountResponse | null;
  loading: boolean;
  error: string | null;
  toast: string | null;
  sessionId: string | null;
  refresh: () => Promise<void>;
  notify: (message: string) => void;
  dismissToast: () => void;
  setSessionId: (sessionId: string | null) => void;
  instant: boolean;
};

export const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemo(): DemoContextValue {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used within DemoProvider");
  return value;
}
