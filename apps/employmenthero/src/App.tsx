import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/platform/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import BusinessSizeDetailPage from "./pages/BusinessSizeDetail";
import CareersPage from "./pages/Careers";
import CaseStudiesPage from "./pages/CaseStudies";
import CaseStudyDetailPage from "./pages/CaseStudyDetail";
import ContactPage from "./pages/Contact";
import GlobalTeamsPage from "./pages/GlobalTeams";
import HomePage from "./pages/Home";
import IndustryDetailPage from "./pages/IndustryDetail";
import IntegrationsPage from "./pages/Integrations";
import JobDetailPage from "./pages/JobDetail";
import JobsPage from "./pages/Jobs";
import LegalPage from "./pages/Legal";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import PartnerNetworkPage from "./pages/PartnerNetwork";
import PricingPage from "./pages/Pricing";
import ProductDetailPage from "./pages/ProductDetail";
import ProductsPage from "./pages/Products";
import QuickDemosPage from "./pages/QuickDemos";
import RequestDemoPage from "./pages/RequestDemo";
import ResourcesPage from "./pages/Resources";
import ResponsibleAiPage from "./pages/ResponsibleAi";
import SignUpPage from "./pages/SignUp";
import SolutionsPage from "./pages/Solutions";
import SupportPage from "./pages/Support";

import PlatformBenefits from "./pages/platform/Benefits";
import PlatformDashboard from "./pages/platform/Dashboard";
import PlatformEmployeeDetail from "./pages/platform/EmployeeDetail";
import PlatformHiring from "./pages/platform/Hiring";
import PlatformLeave from "./pages/platform/Leave";
import PlatformLearning from "./pages/platform/Learning";
import PlatformPayroll from "./pages/platform/Payroll";
import PlatformPeople from "./pages/platform/People";
import PlatformPerformance from "./pages/platform/Performance";
import PlatformReports from "./pages/platform/Reports";
import PlatformSettings from "./pages/platform/Settings";

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

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />

          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pricing/global-teams" element={<GlobalTeamsPage />} />

          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/industry/:slug" element={<IndustryDetailPage />} />
          <Route path="/business-size/:slug" element={<BusinessSizeDetailPage />} />

          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/quick-demos" element={<QuickDemosPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />

          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/partner-network" element={<PartnerNetworkPage />} />
          <Route path="/responsible-ai" element={<ResponsibleAiPage />} />

          <Route path="/request-a-demo" element={<RequestDemoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />

          <Route path="/legals/privacy-policy" element={<LegalPage variant="privacy" />} />
          <Route path="/legals/terms" element={<LegalPage variant="terms" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/platform"
            element={
              <Guarded>
                <PlatformDashboard />
              </Guarded>
            }
          />
          <Route
            path="/platform/people"
            element={
              <Guarded>
                <PlatformPeople />
              </Guarded>
            }
          />
          <Route
            path="/platform/people/:id"
            element={
              <Guarded>
                <PlatformEmployeeDetail />
              </Guarded>
            }
          />
          <Route
            path="/platform/hiring"
            element={
              <Guarded>
                <PlatformHiring />
              </Guarded>
            }
          />
          <Route
            path="/platform/payroll"
            element={
              <Guarded>
                <PlatformPayroll />
              </Guarded>
            }
          />
          <Route
            path="/platform/leave"
            element={
              <Guarded>
                <PlatformLeave />
              </Guarded>
            }
          />
          <Route
            path="/platform/performance"
            element={
              <Guarded>
                <PlatformPerformance />
              </Guarded>
            }
          />
          <Route
            path="/platform/learning"
            element={
              <Guarded>
                <PlatformLearning />
              </Guarded>
            }
          />
          <Route
            path="/platform/benefits"
            element={
              <Guarded>
                <PlatformBenefits />
              </Guarded>
            }
          />
          <Route
            path="/platform/reports"
            element={
              <Guarded>
                <PlatformReports />
              </Guarded>
            }
          />
          <Route
            path="/platform/settings"
            element={
              <Guarded>
                <PlatformSettings />
              </Guarded>
            }
          />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/products/employment-hero-work" element={<Navigate to="/products/work-app" replace />} />
          <Route path="/swag" element={<Navigate to="/products/work-app" replace />} />
          <Route path="/hr" element={<Navigate to="/products/hr-software" replace />} />
          <Route path="/payroll" element={<Navigate to="/products/payroll-software" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/customers" element={<Navigate to="/case-studies" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
