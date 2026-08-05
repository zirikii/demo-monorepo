import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  clearSession,
  loginWithCredentials,
  readSession,
  registerCustomer,
  type DemoUser,
} from "@/lib/auth";

type AuthContextValue = {
  user: DemoUser | null;
  login: (clientNumber: string, password: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readSession());

  const login = useCallback((clientNumber: string, password: string) => {
    setUser(loginWithCredentials(clientNumber, password));
  }, []);

  const register = useCallback((name: string, email: string) => {
    setUser(registerCustomer(name, email));
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
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
