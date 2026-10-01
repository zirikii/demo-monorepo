import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { RegionId } from "@/data/types";
import { REGIONS } from "@/data/nav";
import { readJson, writeJson } from "@/lib/storage";

const KEY = "ticketek-region";

type RegionContextValue = { region: RegionId; setRegion: (region: RegionId) => void };

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setState] = useState<RegionId>(() => {
    const saved = readJson<string>(KEY, "national");
    return REGIONS.some((r) => r.id === saved) ? (saved as RegionId) : "national";
  });
  const setRegion = useCallback((next: RegionId) => {
    setState(next);
    writeJson(KEY, next);
  }, []);
  const value = useMemo(() => ({ region, setRegion }), [region, setRegion]);
  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used inside <RegionProvider>");
  return ctx;
}
