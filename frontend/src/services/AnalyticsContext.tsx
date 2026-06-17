"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAnalyticsStats, AnalyticsStats } from "@/services/useAnalyticsStats";

const AnalyticsContext = createContext<AnalyticsStats | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const stats = useAnalyticsStats();
  return (
    <AnalyticsContext.Provider value={stats}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error("useAnalytics must be inside AnalyticsProvider");
  return ctx;
}