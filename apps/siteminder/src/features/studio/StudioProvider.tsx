import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readJson, writeJson } from "@/lib/storage";
import { defaultConfig } from "./config";
import { seedLog } from "./seedLog";
import type { ConversationRecord, RoutingRule, StudioConfig } from "./types";

const CONFIG_KEY = "siteminder-studio-config-v1";
const LOG_KEY = "siteminder-support-log-v1";
const MAX_LOG = 60;

export type StudioContextValue = {
  config: StudioConfig;
  updateConfig: (fn: (c: StudioConfig) => StudioConfig) => void;
  updateRule: (id: string, patch: Partial<RoutingRule>) => void;
  moveRule: (id: string, delta: -1 | 1) => void;
  addRule: (rule: RoutingRule) => void;
  removeRule: (id: string) => void;
  resetConfig: () => void;
  log: ConversationRecord[];
  saveRecord: (record: ConversationRecord) => void;
  clearLog: () => void;
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<StudioConfig>(() => readJson<StudioConfig | null>(CONFIG_KEY, null) ?? defaultConfig());
  const [log, setLog] = useState<ConversationRecord[]>(() => readJson<ConversationRecord[] | null>(LOG_KEY, null) ?? seedLog());

  useEffect(() => writeJson(CONFIG_KEY, config), [config]);
  useEffect(() => writeJson(LOG_KEY, log), [log]);

  const updateConfig = useCallback((fn: (c: StudioConfig) => StudioConfig) => setConfig(fn), []);

  const updateRule = useCallback((id: string, patch: Partial<RoutingRule>) => {
    setConfig((c) => ({ ...c, routing: { ...c.routing, rules: c.routing.rules.map((r) => (r.id === id ? { ...r, ...patch } : r)) } }));
  }, []);

  const moveRule = useCallback((id: string, delta: -1 | 1) => {
    setConfig((c) => {
      const rules = [...c.routing.rules];
      const from = rules.findIndex((r) => r.id === id);
      const to = from + delta;
      if (from < 0 || to < 0 || to >= rules.length) return c;
      const [rule] = rules.splice(from, 1);
      rules.splice(to, 0, rule!);
      return { ...c, routing: { ...c.routing, rules } };
    });
  }, []);

  const addRule = useCallback((rule: RoutingRule) => {
    setConfig((c) => ({ ...c, routing: { ...c.routing, rules: [rule, ...c.routing.rules] } }));
  }, []);

  const removeRule = useCallback((id: string) => {
    setConfig((c) => ({ ...c, routing: { ...c.routing, rules: c.routing.rules.filter((r) => r.id !== id) } }));
  }, []);

  const resetConfig = useCallback(() => setConfig(defaultConfig()), []);

  const saveRecord = useCallback((record: ConversationRecord) => {
    setLog((l) => [record, ...l.filter((r) => r.id !== record.id)].slice(0, MAX_LOG));
  }, []);

  const clearLog = useCallback(() => setLog([]), []);

  const value = useMemo(
    () => ({ config, updateConfig, updateRule, moveRule, addRule, removeRule, resetConfig, log, saveRecord, clearLog }),
    [config, updateConfig, updateRule, moveRule, addRule, removeRule, resetConfig, log, saveRecord, clearLog],
  );
  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio(): StudioContextValue {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside <StudioProvider>");
  return ctx;
}
