import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { FlyPage } from "./pages/Fly";
import { FlightsPage } from "./pages/Flights";
import { AtChangiPage } from "./pages/AtChangi";
import { DineShopPage } from "./pages/DineShop";
import { ExperiencePage } from "./pages/Experience";
import { HappeningsPage } from "./pages/Happenings";
import { RewardsPage } from "./pages/Rewards";
import { HelpPage } from "./pages/Help";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { AccountPage } from "./pages/Account";
import { SettingsPage } from "./pages/Settings";
import { PrivacyPage, TermsPage } from "./pages/Legal";
import { NotFoundPage } from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fly" element={<FlyPage />} />
          <Route path="/fly/flights" element={<FlightsPage />} />
          <Route path="/at-changi" element={<AtChangiPage />} />
          <Route path="/dine-and-shop" element={<DineShopPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/happenings" element={<HappeningsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
