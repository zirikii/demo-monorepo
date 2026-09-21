import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getAccount, type AccountResponse } from "../lib/api";
import { DemoContext, type DemoContextValue } from "./useDemo";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const instant = import.meta.env.MODE === "test";

  const refresh = useCallback(async () => {
    const next = await getAccount();
    setAccount(next);
    setError(null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    getAccount()
      .then((next) => {
        if (!cancelled) setAccount(next);
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Could not load account");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<DemoContextValue>(
    () => ({
      account,
      loading,
      error,
      toast,
      sessionId,
      refresh,
      notify: setToast,
      dismissToast: () => setToast(null),
      setSessionId,
      instant,
    }),
    [account, error, instant, loading, refresh, sessionId, toast],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
