import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { portalFromPath } from "@/data/apps";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
    const portal = portalFromPath(location.pathname);
    return <Navigate to={`/login?portal=${portal}&redirect=${redirect}`} replace />;
  }

  return <>{children}</>;
}
