import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { DriversPage } from "./pages/Drivers";
import { MerchantsPage } from "./pages/Merchants";
import { CareersPage } from "./pages/Careers";
import { NewsroomPage } from "./pages/Newsroom";
import { AboutPage } from "./pages/About";
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/newsroom" element={<NewsroomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
