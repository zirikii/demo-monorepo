import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedProperty } from "@/data/property";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";
import { applyEffect, type PropertyEffect } from "./effects";
import type { DemandEvent, PropertyState } from "./types";

const STORAGE_KEY = "siteminder-property-v1";

export type PropertyContextValue = PropertyState & {
  signedIn: boolean;
  apply: (effect: PropertyEffect, values: Record<string, string | undefined>) => void;
  update: (fn: (s: PropertyState) => PropertyState) => void;
  addEvent: (event: Omit<DemandEvent, "id">) => void;
  removeEvent: (id: string) => void;
  reset: () => void;
};

const PropertyContext = createContext<PropertyContextValue | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<PropertyState>(
    () => readJson<PropertyState | null>(STORAGE_KEY, null) ?? seedProperty(),
  );

  useEffect(() => writeJson(STORAGE_KEY, state), [state]);

  useEffect(() => {
    if (!user) return;
    setState((s) =>
      s.profile.email === user.email
        ? s
        : {
            ...s,
            profile: {
              ...s.profile,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          },
    );
  }, [user]);

  const apply = useCallback(
    (effect: PropertyEffect, values: Record<string, string | undefined>) => {
      setState((s) => applyEffect(s, effect, values));
    },
    [],
  );

  const update = useCallback((fn: (s: PropertyState) => PropertyState) => setState(fn), []);

  const addEvent = useCallback((event: Omit<DemandEvent, "id">) => {
    setState((s) => ({ ...s, events: [...s.events, { ...event, id: `evt-${Date.now()}` }] }));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setState((s) => ({ ...s, events: s.events.filter((e) => e.id !== id) }));
  }, []);

  const reset = useCallback(() => setState(seedProperty()), []);

  const value = useMemo<PropertyContextValue>(
    () => ({ ...state, signedIn: Boolean(user), apply, update, addEvent, removeEvent, reset }),
    [state, user, apply, update, addEvent, removeEvent, reset],
  );

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperty(): PropertyContextValue {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperty must be used inside <PropertyProvider>");
  return ctx;
}
