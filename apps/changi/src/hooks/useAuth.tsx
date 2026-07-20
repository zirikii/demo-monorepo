import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  clearSession,
  loginWithCredentials,
  readSession,
  writeSession,
  type DemoUser,
} from "@/lib/auth";

type AuthContextValue = {
  user: DemoUser | null;
  login: (email: string, password: string, name?: string) => void;
  logout: () => void;
  redeemPoints: (points: number) => DemoUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readSession());

  const login = useCallback((email: string, password: string, name?: string) => {
    setUser(loginWithCredentials(email, password, name));
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const redeemPoints = useCallback(
    (points: number) => {
      if (!user || user.points < points) return null;
      const updatedUser = { ...user, points: user.points - points };
      writeSession(updatedUser);
      setUser(updatedUser);
      return updatedUser;
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, login, logout, redeemPoints }),
    [user, login, logout, redeemPoints],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
