import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DevPanel } from "./components/dev/DevPanel";
import { PhoneFrame } from "./components/shell/PhoneFrame";
import { DemoProvider } from "./context/DemoState";
import { AccountSafetyPage } from "./pages/AccountSafety";
import { DiraPage } from "./pages/Dira";
import { EddPage } from "./pages/Edd";
import { FacePage } from "./pages/Face";
import { HomePage } from "./pages/Home";
import { KtpCapturePage } from "./pages/KtpCapture";
import { OnboardingPage } from "./pages/Onboarding";
import { ResultPage } from "./pages/Result";
import { ReviewPage } from "./pages/Review";
import { SecurityPage } from "./pages/Security";
import { SettingsPage } from "./pages/Settings";
import { VerifiedAccountCenterPage } from "./pages/VerifiedAccountCenter";

export default function App() {
  return (
    <BrowserRouter>
      <DemoProvider>
        <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 lg:flex-row lg:items-start lg:justify-center">
          <div>
            <p className="mb-3 text-center text-xs text-text-body">Unofficial GoPay demo — not affiliated with GoPay or GoTo</p>
            <PhoneFrame>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dira" element={<DiraPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/account-safety" element={<AccountSafetyPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route path="/vac" element={<VerifiedAccountCenterPage />} />
                <Route path="/rekyc/review" element={<ReviewPage />} />
                <Route path="/rekyc/face" element={<FacePage />} />
                <Route path="/rekyc/onboarding" element={<OnboardingPage />} />
                <Route path="/rekyc/ktp" element={<KtpCapturePage />} />
                <Route path="/rekyc/edd" element={<EddPage />} />
                <Route path="/rekyc/result" element={<ResultPage />} />
              </Routes>
            </PhoneFrame>
          </div>
          <DevPanel />
        </div>
      </DemoProvider>
    </BrowserRouter>
  );
}
