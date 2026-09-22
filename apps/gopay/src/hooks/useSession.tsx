import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createSeedAccount,
  type AccountState,
} from "@/lib/kyc";

export type Scenario =
  | "happy"
  | "nik-mismatch"
  | "low-confidence"
  | "high-risk"
  | "dukcapil-fail"
  | "fr-fail";

const STORAGE_KEY = "gopay-rekyc-demo";

interface Persisted {
  account: AccountState;
  scenario: Scenario;
  blockEnforcement: boolean;
  genie: string | null;
  frRemaining: number;
}

interface SessionValue {
  account: AccountState;
  scenario: Scenario;
  blockEnforcement: boolean;
  toast: string | null;
  genie: string | null;
  frRemaining: number;
  setAccount: (account: AccountState) => void;
  setScenario: (scenario: Scenario) => void;
  setBlockEnforcement: (on: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  setGenie: (message: string | null) => void;
  setFrRemaining: (count: number) => void;
  reset: () => void;
  setOddDueInDays: (days: number) => void;
}

const SessionContext = createContext<SessionValue | null>(null);

function seed(): Persisted {
  const now = new Date();
  return {
    account: createSeedAccount(now),
    scenario: "happy",
    blockEnforcement: false,
    genie: null,
    frRemaining: 3,
  };
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as Persisted;
    if (!parsed.account || !Array.isArray(parsed.account.submissions)) return seed();
    return parsed;
  } catch {
    return seed();
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => load(), []);
  const [account, setAccountState] = useState(initial.account);
  const [scenario, setScenario] = useState<Scenario>(initial.scenario);
  const [blockEnforcement, setBlockEnforcement] = useState(initial.blockEnforcement);
  const [genie, setGenie] = useState<string | null>(initial.genie);
  const [frRemaining, setFrRemaining] = useState(initial.frRemaining);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const payload: Persisted = { account, scenario, blockEnforcement, genie, frRemaining };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [account, scenario, blockEnforcement, genie, frRemaining]);

  const value = useMemo<SessionValue>(
    () => ({
      account,
      scenario,
      blockEnforcement,
      toast,
      genie,
      frRemaining,
      setAccount: setAccountState,
      setScenario,
      setBlockEnforcement,
      showToast: setToast,
      clearToast: () => setToast(null),
      setGenie,
      setFrRemaining,
      reset: () => {
        const next = seed();
        setAccountState(next.account);
        setScenario(next.scenario);
        setBlockEnforcement(next.blockEnforcement);
        setGenie(next.genie);
        setFrRemaining(next.frRemaining);
        setToast(null);
        localStorage.removeItem(STORAGE_KEY);
      },
      setOddDueInDays: (days: number) => {
        setAccountState((current) => ({
          ...current,
          oddDueAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        }));
      },
    }),
    [account, scenario, blockEnforcement, toast, genie, frRemaining],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}
