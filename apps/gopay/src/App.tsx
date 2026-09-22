import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { DemoRail } from "@/components/chrome/DemoRail";
import { AccountCenterScreen } from "@/components/screens/AccountCenterScreen";
import { BlockedScreen } from "@/components/screens/BlockedScreen";
import { CaptureScreen } from "@/components/screens/CaptureScreen";
import { EddScreen } from "@/components/screens/EddScreen";
import { EktpReviewScreen } from "@/components/screens/EktpReviewScreen";
import { FaceFailScreen, FaceLockedScreen, FaceScreen } from "@/components/screens/FaceScreen";
import { DiraScreen, HelpScreen, LegalScreen } from "@/components/screens/HelpScreens";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { MismatchScreen, PendingScreen, RejectedScreen } from "@/components/screens/ResultScreens";
import { SafetyScreen } from "@/components/screens/SafetyScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { useSession } from "@/hooks/useSession";
import { isOverdue } from "@/lib/kyc";

const FLOW = new Set(["/review", "/fr", "/fr/fail", "/fr/locked", "/onboarding", "/capture", "/edd", "/edd/purpose", "/mismatch", "/pending", "/rejected", "/help", "/dira"]);

function Guard({ children }: { children: ReactNode }) {
  const { account, blockEnforcement } = useSession();
  const location = useLocation();
  const blocked = blockEnforcement && isOverdue(account.oddDueAt, new Date());
  if (blocked && location.pathname !== "/blocked" && !FLOW.has(location.pathname)) {
    return <Navigate to="/blocked" replace />;
  }
  if (!blocked && location.pathname === "/blocked") {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#e7e8ec] text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-8 lg:flex-row lg:items-start lg:justify-center">
        <Guard>
          <Routes>
            <Route path="/" element={<SettingsScreen />} />
            <Route path="/safety" element={<SafetyScreen />} />
            <Route path="/account" element={<AccountCenterScreen />} />
            <Route path="/review" element={<EktpReviewScreen />} />
            <Route path="/fr" element={<FaceScreen />} />
            <Route path="/fr/fail" element={<FaceFailScreen />} />
            <Route path="/fr/locked" element={<FaceLockedScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/capture" element={<CaptureScreen />} />
            <Route path="/edd" element={<EddScreen step="income" />} />
            <Route path="/edd/purpose" element={<EddScreen step="purpose" />} />
            <Route path="/mismatch" element={<MismatchScreen />} />
            <Route path="/pending" element={<PendingScreen />} />
            <Route path="/rejected" element={<RejectedScreen />} />
            <Route path="/help" element={<HelpScreen />} />
            <Route path="/dira" element={<DiraScreen />} />
            <Route path="/terms" element={<LegalScreen kind="terms" />} />
            <Route path="/privacy" element={<LegalScreen kind="privacy" />} />
            <Route path="/blocked" element={<BlockedScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Guard>
        <DemoRail />
      </div>
    </div>
  );
}
