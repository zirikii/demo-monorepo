import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { NewsPage } from "./pages/News";
import { SportPage } from "./pages/Sport";
import { LifestylePage } from "./pages/Lifestyle";
import { TravelPage } from "./pages/Travel";
import { EntertainmentPage } from "./pages/Entertainment";
import { ShoppingPage } from "./pages/Shopping";
import { ArticlePage } from "./pages/Article";
import { VideoPage } from "./pages/Video";
import { WeatherPage } from "./pages/Weather";
import { SearchPage } from "./pages/Search";
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
          <Route path="/news" element={<NewsPage />} />
          <Route path="/sport" element={<SportPage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/entertainment" element={<EntertainmentPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/search" element={<SearchPage />} />
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
