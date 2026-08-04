import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  login as createSession,
  logout as clearSession,
  readSession,
  type DemoProfile,
} from "@/lib/auth";

type AuthContextValue = {
  profile: DemoProfile | null;
  signIn: (clientNumber: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DemoProfile | null>(() => readSession());
  const signIn = useCallback((clientNumber: string, password: string) => {
    setProfile(createSession(clientNumber, password));
  }, []);
  const signOut = useCallback(() => {
    clearSession();
    setProfile(null);
  }, []);
  const value = useMemo(() => ({ profile, signIn, signOut }), [profile, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
