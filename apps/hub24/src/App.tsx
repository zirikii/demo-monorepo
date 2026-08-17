import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/portal/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

import AboutPage from "./pages/About";
import AudiencePage from "./pages/Audience";
import BdmTeamPage from "./pages/BdmTeam";
import CareersPage from "./pages/Careers";
import ContactPage from "./pages/Contact";
import CpdPage from "./pages/Cpd";
import DocumentsPage from "./pages/Documents";
import FeaturesPage from "./pages/Features";
import GroupBrandPage from "./pages/GroupBrand";
import HomePage from "./pages/Home";
import JobDetailPage from "./pages/JobDetail";
import LegalPage from "./pages/Legal";
import LoginPage from "./pages/Login";
import ManagedPortfoliosPage from "./pages/ManagedPortfolios";
import NewsPage from "./pages/News";
import NewsPostPage from "./pages/NewsPost";
import NotFoundPage from "./pages/NotFound";
import PrivateInvestPage from "./pages/PrivateInvest";
import ProductDetailPage from "./pages/ProductDetail";
import ResourcesPage from "./pages/Resources";
import ShareholdersPage from "./pages/Shareholders";
import SignUpPage from "./pages/SignUp";

import AdviserDashboardPage from "./pages/portal/AdviserDashboard";
import ClientDetailPage from "./pages/portal/ClientDetail";
import ClientsPage from "./pages/portal/Clients";
import InvestorAccountDetailPage from "./pages/portal/InvestorAccountDetail";
import InvestorAccountsPage from "./pages/portal/InvestorAccounts";
import InvestorDashboardPage from "./pages/portal/InvestorDashboard";
import InvestorStatementsPage from "./pages/portal/InvestorStatements";
import ManagerDashboardPage from "./pages/portal/ManagerDashboard";
import OrdersPage from "./pages/portal/Orders";
import PortfoliosPage from "./pages/portal/Portfolios";
import ReportsPage from "./pages/portal/Reports";
import SettingsPage from "./pages/portal/Settings";

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
          <Route path="/hub24-for-advisers" element={<AudiencePage />} />
          <Route path="/hub24-for-:slug" element={<AudiencePage />} />
          <Route path="/features-benefits" element={<FeaturesPage />} />
          <Route path="/managed-portfolios" element={<ManagedPortfoliosPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/private-invest" element={<PrivateInvestPage />} />
          <Route path="/class" element={<GroupBrandPage />} />
          <Route path="/myprosperity" element={<GroupBrandPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/cpd" element={<CpdPage />} />
          <Route path="/resources/documents" element={<DocumentsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsPostPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bdm-team" element={<BdmTeamPage />} />
          <Route path="/shareholders" element={<ShareholdersPage />} />
          <Route path="/privacy-policy" element={<LegalPage variant="privacy" />} />
          <Route path="/terms" element={<LegalPage variant="terms" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

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
                <ClientsPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/clients/:id"
            element={
              <Guarded>
                <ClientDetailPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/portfolios"
            element={
              <Guarded>
                <PortfoliosPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/orders"
            element={
              <Guarded>
                <OrdersPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/reports"
            element={
              <Guarded>
                <ReportsPage />
              </Guarded>
            }
          />
          <Route
            path="/adviserhub/settings"
            element={
              <Guarded>
                <SettingsPage />
              </Guarded>
            }
          />
          <Route
            path="/investorhub"
            element={
              <Guarded>
                <InvestorDashboardPage />
              </Guarded>
            }
          />
          <Route
            path="/investorhub/accounts"
            element={
              <Guarded>
                <InvestorAccountsPage />
              </Guarded>
            }
          />
          <Route
            path="/investorhub/accounts/:id"
            element={
              <Guarded>
                <InvestorAccountDetailPage />
              </Guarded>
            }
          />
          <Route
            path="/investorhub/statements"
            element={
              <Guarded>
                <InvestorStatementsPage />
              </Guarded>
            }
          />
          <Route
            path="/investorhub/settings"
            element={
              <Guarded>
                <SettingsPage />
              </Guarded>
            }
          />
          <Route
            path="/managerhub"
            element={
              <Guarded>
                <ManagerDashboardPage />
              </Guarded>
            }
          />

          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/investors" element={<Navigate to="/shareholders" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
