"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";

interface AppDataContextValue {
  activeAddOnIds: Set<string>;
  isActive: (addOnId: string) => boolean;
  toggleAddOn: (addOnId: string, name?: string) => Promise<void>;
  addonsCount: number;
  billsCount: number;
}

const AppDataContext = React.createContext<AppDataContextValue | null>(null);

export function AppDataProvider({
  initialActiveAddOnIds,
  outstandingBills,
  children,
}: {
  initialActiveAddOnIds: string[];
  outstandingBills: number;
  children: React.ReactNode;
}) {
  const [activeAddOnIds, setActiveAddOnIds] = React.useState<Set<string>>(
    new Set(initialActiveAddOnIds),
  );
  const { toast } = useToast();

  const isActive = React.useCallback(
    (addOnId: string) => activeAddOnIds.has(addOnId),
    [activeAddOnIds],
  );

  const toggleAddOn = React.useCallback(
    async (addOnId: string, name?: string) => {
      const currentlyActive = activeAddOnIds.has(addOnId);
      const nextActive = !currentlyActive;

      // Optimistic update.
      setActiveAddOnIds((prev) => {
        const next = new Set(prev);
        if (nextActive) next.add(addOnId);
        else next.delete(addOnId);
        return next;
      });

      try {
        const res = await fetch("/api/addons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addOnId, active: nextActive }),
        });
        if (!res.ok) throw new Error("request failed");
        toast({
          title: nextActive ? "Add-on connected" : "Add-on removed",
          description: name,
          variant: nextActive ? "success" : undefined,
        });
      } catch {
        // Roll back on failure.
        setActiveAddOnIds((prev) => {
          const next = new Set(prev);
          if (nextActive) next.delete(addOnId);
          else next.add(addOnId);
          return next;
        });
        toast({ title: "Something went wrong", variant: "destructive" });
      }
    },
    [activeAddOnIds, toast],
  );

  const value = React.useMemo<AppDataContextValue>(
    () => ({
      activeAddOnIds,
      isActive,
      toggleAddOn,
      addonsCount: activeAddOnIds.size,
      billsCount: outstandingBills,
    }),
    [activeAddOnIds, isActive, toggleAddOn, outstandingBills],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const ctx = React.useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return ctx;
}
