import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { clearSession, loginWithCredentials, readSession, signUp, type DemoUser } from "@/lib/auth";

type AuthContextValue = {
  user: DemoUser | null;
  login: (email: string, password: string) => DemoUser;
  register: (details: DemoUser) => DemoUser;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readSession());

  const login = useCallback((email: string, password: string) => {
    const next = loginWithCredentials(email, password);
    setUser(next);
    return next;
  }, []);

  const register = useCallback((details: DemoUser) => {
    const next = signUp(details);
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
