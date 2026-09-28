import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/account/RequireAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AssistantProvider } from "./features/assistant/AssistantProvider";
import { Assistant } from "./features/assistant/components/Assistant";
import { AuthProvider } from "./hooks/useAuth";
import { AboutPage } from "./pages/About";
import { AccountBillsPage } from "./pages/account/Bills";
import { AccountOverviewPage } from "./pages/account/Overview";
import { AccountProfilePage } from "./pages/account/Profile";
import { AccountServicesPage } from "./pages/account/Services";
import { AccountUsagePage } from "./pages/account/Usage";
import { BusinessPage } from "./pages/Business";
import { ContactUsPage } from "./pages/ContactUs";
import { ElectricVehiclesPage } from "./pages/ElectricVehicles";
import { EnergyPlansPage } from "./pages/EnergyPlans";
import { HelpArticlePage } from "./pages/help/HelpArticle";
import { HelpCategoryPage } from "./pages/help/HelpCategory";
import { HelpSupportPage } from "./pages/help/HelpSupport";
import { HomePage } from "./pages/Home";
import { InternetPage } from "./pages/Internet";
import { LoginPage } from "./pages/Login";
import { MobilePage } from "./pages/Mobile";
import { MovingHousePage } from "./pages/MovingHouse";
import { NotFoundPage } from "./pages/NotFound";
import { SolarPage } from "./pages/Solar";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/energy" element={<EnergyPlansPage />} />
        <Route path="/internet" element={<InternetPage />} />
        <Route path="/mobile" element={<MobilePage />} />
        <Route path="/solar" element={<SolarPage />} />
        <Route path="/electric-vehicles" element={<ElectricVehiclesPage />} />
        <Route path="/moving-house" element={<MovingHousePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/help/:category" element={<HelpCategoryPage />} />
        <Route path="/help/:category/:article" element={<HelpArticlePage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<RequireAuth><AccountOverviewPage /></RequireAuth>} />
        <Route path="/account/bills" element={<RequireAuth><AccountBillsPage /></RequireAuth>} />
        <Route path="/account/usage" element={<RequireAuth><AccountUsagePage /></RequireAuth>} />
        <Route path="/account/services" element={<RequireAuth><AccountServicesPage /></RequireAuth>} />
        <Route path="/account/profile" element={<RequireAuth><AccountProfilePage /></RequireAuth>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Assistant />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AssistantProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AssistantProvider>
    </AuthProvider>
  );
}
