import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  clearSession,
  loginWithCredentials,
  readSession,
  startFreeAccount,
  type DemoUser,
} from "@/lib/auth";

type AuthValue = {
  user: DemoUser | null;
  login: (email: string, password: string) => void;
  startFree: (name: string, email: string, company: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readSession());

  const login = useCallback((email: string, password: string) => {
    setUser(loginWithCredentials(email, password));
  }, []);

  const startFree = useCallback((name: string, email: string, company: string) => {
    setUser(startFreeAccount(name, email, company));
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ user, login, startFree, logout }),
    [user, login, startFree, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
