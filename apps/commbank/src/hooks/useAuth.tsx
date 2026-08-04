import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { clearSession, logonWithCredentials, readSession, type DemoUser } from "@/lib/auth";

type AuthContextValue = {
  user: DemoUser | null;
  logon: (clientNumber: string, password: string) => void;
  logoff: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readSession());

  const logon = useCallback((clientNumber: string, password: string) => {
    setUser(logonWithCredentials(clientNumber, password));
  }, []);

  const logoff = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, logon, logoff }), [user, logon, logoff]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
