import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/portal/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";
import { PortfolioProvider } from "./hooks/usePortfolio";

import HomePage from "./pages/Home";
import { AudiencePage } from "./pages/AudiencePage";
import FeaturesBenefitsPage from "./pages/FeaturesBenefits";
import InvestmentMenuPage from "./pages/InvestmentMenu";
import DiscoverPage from "./pages/Discover";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import InsightsPage from "./pages/Insights";
import InsightDetailPage from "./pages/InsightDetail";
import CpdEducationPage from "./pages/CpdEducation";
import ProductDocumentsPage from "./pages/ProductDocuments";
import AwardsPage from "./pages/Awards";
import AboutPage from "./pages/About";
import LeadershipPage from "./pages/Leadership";
import CareersPage from "./pages/Careers";
import JobDetailPage from "./pages/JobDetail";
import SustainabilityPage from "./pages/Sustainability";
import GroupPage from "./pages/Group";
import ContactPage from "./pages/Contact";
import FindBdmPage from "./pages/FindBdm";
import SearchResultsPage from "./pages/SearchResults";
import LegalPage from "./pages/Legal";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";

import ShareholderOverviewPage from "./pages/shareholder/Overview";
import AnnouncementsPage from "./pages/shareholder/Announcements";
import FinancialResultsPage from "./pages/shareholder/FinancialResults";
import SharePricePage from "./pages/shareholder/SharePrice";
import GovernancePage from "./pages/shareholder/Governance";

import InvestorOverviewPage from "./pages/investorhub/Overview";
import InvestorPortfolioPage from "./pages/investorhub/Portfolio";
import InvestorManagedPortfoliosPage from "./pages/investorhub/ManagedPortfolios";
import InvestorTransactionsPage from "./pages/investorhub/Transactions";
import InvestorSuperPage from "./pages/investorhub/Super";
import InvestorReportsPage from "./pages/investorhub/Reports";
import InvestorDocumentsPage from "./pages/investorhub/Documents";
import InvestorSettingsPage from "./pages/investorhub/Settings";

import AdviserDashboardPage from "./pages/adviserhub/Dashboard";
import AdviserClientsPage from "./pages/adviserhub/Clients";
import AdviserClientDetailPage from "./pages/adviserhub/ClientDetail";
import AdviserTradingPage from "./pages/adviserhub/Trading";
import AdviserPortfoliosPage from "./pages/adviserhub/Portfolios";
import AdviserReportsPage from "./pages/adviserhub/Reports";
import AdviserPracticePage from "./pages/adviserhub/Practice";

function Guarded({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Audience entry points — paths mirror hub24.com.au */}
            <Route path="/hub24-for-advisers/" element={<AudiencePage slug="advisers" />} />
            <Route path="/hub24-for-brokers/" element={<AudiencePage slug="private-wealth" />} />
            <Route path="/hub24-for-advised-clients/" element={<AudiencePage slug="advised-clients" />} />
            <Route
              path="/hub24-for-investment-managers/"
              element={<AudiencePage slug="investment-managers" />}
            />
            <Route path="/hub24-for-licensees/" element={<AudiencePage slug="licensees" />} />

            <Route path="/features-benefits/" element={<FeaturesBenefitsPage />} />
            <Route path="/features-benefits/investment-menu/" element={<InvestmentMenuPage />} />
            <Route path="/discover/" element={<DiscoverPage />} />
            <Route path="/products-solutions/" element={<ProductsPage />} />
            <Route path="/product/:slug/" element={<ProductDetailPage />} />

            <Route path="/insights/" element={<InsightsPage />} />
            <Route path="/insights/:slug/" element={<InsightDetailPage />} />
            <Route path="/cpd-education/" element={<CpdEducationPage />} />
            <Route path="/product-documents/" element={<ProductDocumentsPage />} />
            <Route path="/awards/" element={<AwardsPage />} />

            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/about-us/leadership/" element={<LeadershipPage />} />
            <Route path="/about-us/careers/" element={<CareersPage />} />
            <Route path="/about-us/careers/:id/" element={<JobDetailPage />} />
            <Route path="/about-us/sustainability/" element={<SustainabilityPage />} />
            <Route path="/group/" element={<GroupPage />} />

            <Route path="/shareholder-centre/overview/" element={<ShareholderOverviewPage />} />
            <Route path="/shareholder-centre/asx-announcements/" element={<AnnouncementsPage />} />
            <Route path="/shareholder-centre/financial-results/" element={<FinancialResultsPage />} />
            <Route path="/shareholder-centre/share-price/" element={<SharePricePage />} />
            <Route path="/shareholder-centre/corporate-governance/" element={<GovernancePage />} />

            <Route path="/contact-us/" element={<ContactPage />} />
            <Route path="/contact-us/find-a-bdm/" element={<FindBdmPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/legal/:slug" element={<LegalPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Convenience redirects for paths a visitor is likely to guess */}
            <Route path="/shareholder-centre" element={<Navigate to="/shareholder-centre/overview/" replace />} />
            <Route path="/about" element={<Navigate to="/about-us/" replace />} />
            <Route path="/contact" element={<Navigate to="/contact-us/" replace />} />
            <Route path="/careers" element={<Navigate to="/about-us/careers/" replace />} />
            <Route path="/platform" element={<Navigate to="/features-benefits/" replace />} />

            <Route
              path="/investorhub"
              element={
                <Guarded>
                  <InvestorOverviewPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/portfolio"
              element={
                <Guarded>
                  <InvestorPortfolioPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/managed-portfolios"
              element={
                <Guarded>
                  <InvestorManagedPortfoliosPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/transactions"
              element={
                <Guarded>
                  <InvestorTransactionsPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/super"
              element={
                <Guarded>
                  <InvestorSuperPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/reports"
              element={
                <Guarded>
                  <InvestorReportsPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/documents"
              element={
                <Guarded>
                  <InvestorDocumentsPage />
                </Guarded>
              }
            />
            <Route
              path="/investorhub/settings"
              element={
                <Guarded>
                  <InvestorSettingsPage />
                </Guarded>
              }
            />

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
              path="/adviserhub/trading"
              element={
                <Guarded>
                  <AdviserTradingPage />
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
              path="/adviserhub/reports"
              element={
                <Guarded>
                  <AdviserReportsPage />
                </Guarded>
              }
            />
            <Route
              path="/adviserhub/practice"
              element={
                <Guarded>
                  <AdviserPracticePage />
                </Guarded>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}
