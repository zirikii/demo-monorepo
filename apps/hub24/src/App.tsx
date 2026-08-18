import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/adviser/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

import AboutUsPage from "./pages/AboutUs";
import CareersPage from "./pages/Careers";
import ContactUsPage from "./pages/ContactUs";
import EducationPage from "./pages/Education";
import FaqsPage from "./pages/Faqs";
import FeaturesBenefitsPage from "./pages/FeaturesBenefits";
import HomePage from "./pages/Home";
import InsightDetailPage from "./pages/InsightDetail";
import InsightsPage from "./pages/Insights";
import LeadershipPage from "./pages/Leadership";
import LegalPage from "./pages/Legal";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetail";
import ProductDocumentsPage from "./pages/ProductDocuments";
import ProductsSolutionsPage from "./pages/ProductsSolutions";
import ScamAlertPage from "./pages/ScamAlert";
import ShareholderCentrePage from "./pages/ShareholderCentre";
import SolutionDetailPage from "./pages/SolutionDetail";

import AdviserApplicationsPage from "./pages/adviser/Applications";
import AdviserClientDetailPage from "./pages/adviser/ClientDetail";
import AdviserClientsPage from "./pages/adviser/Clients";
import AdviserDashboardPage from "./pages/adviser/Dashboard";
import AdviserPortfolioDetailPage from "./pages/adviser/PortfolioDetail";
import AdviserPortfoliosPage from "./pages/adviser/Portfolios";
import AdviserReportingPage from "./pages/adviser/Reporting";
import AdviserSettingsPage from "./pages/adviser/Settings";
import AdviserTradingPage from "./pages/adviser/Trading";

function Guarded({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/products-solutions" element={<ProductsSolutionsPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/features-benefits" element={<FeaturesBenefitsPage />} />

          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />

          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetailPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/product-documents" element={<ProductDocumentsPage />} />

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/shareholder-centre" element={<ShareholderCentrePage />} />

          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/scam-alert" element={<ScamAlertPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/legals/:doc" element={<LegalPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/adviserhub"
            element={
              <Guarded>
                <AdviserDashboardPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/clients"
            element={
              <Guarded>
                <AdviserClientsPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/clients/:id"
            element={
              <Guarded>
                <AdviserClientDetailPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/portfolios"
            element={
              <Guarded>
                <AdviserPortfoliosPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/portfolios/:slug"
            element={
              <Guarded>
                <AdviserPortfolioDetailPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/trading"
            element={
              <Guarded>
                <AdviserTradingPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/reporting"
            element={
              <Guarded>
                <AdviserReportingPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/applications"
            element={
              <Guarded>
                <AdviserApplicationsPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/settings"
            element={
              <Guarded>
                <AdviserSettingsPage />
              </Guarded>
            }
          />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="/products" element={<Navigate to="/products-solutions" replace />} />
          <Route
            path="/product/managed-accounts"
            element={<Navigate to="/product/managed-portfolios" replace />}
          />
          <Route path="/engage" element={<Navigate to="/product/engage" replace />} />
          <Route path="/solutions" element={<Navigate to="/solutions/advisers" replace />} />
          <Route path="/investor-centre" element={<Navigate to="/shareholder-centre" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
