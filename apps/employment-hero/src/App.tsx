import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/platform/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";
import { WorkspaceProvider } from "./hooks/useWorkspace";

import { HomePage } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { EmploymentOsPage } from "./pages/EmploymentOs";
import { EarnedWageAccessPage } from "./pages/EarnedWageAccess";
import { SolutionDetailPage, SolutionsPage } from "./pages/Solutions";
import { IndustriesPage, IndustryDetailPage } from "./pages/Industries";
import { PricingPage } from "./pages/Pricing";
import { IntegrationsPage } from "./pages/Integrations";
import { AiPage } from "./pages/Ai";
import { WorkPage } from "./pages/Work";
import { JobDetailPage, JobsPage, SalaryBenchmarkingPage } from "./pages/Jobs";
import { ArticlePage, BlogPage, ComplianceCornerPage } from "./pages/Blog";
import { ResourceHubPage, ResourcesPage } from "./pages/Resources";
import { CaseStudiesPage, CaseStudyDetailPage } from "./pages/CaseStudies";
import { NewsroomPage, WebinarsPage } from "./pages/Newsroom";
import {
  CertifiedPartnerPage,
  PartnerDirectoryPage,
  PartnerNetworkPage,
  ReferralPartnerPage,
} from "./pages/Partners";
import {
  AboutUsPage,
  CareersPage,
  HeroFoundationPage,
  MediaCentrePage,
} from "./pages/Company";
import { ContactPage, RequestDemoPage } from "./pages/Contact";
import { ImplementationHubPage, SupportPage } from "./pages/Support";
import { AccessibilityPage, PrivacyPage, TermsPage } from "./pages/Legal";
import { SearchResultsPage } from "./pages/Search";
import { LoginPage } from "./pages/Login";
import { StartFreePage } from "./pages/StartFree";
import { NotFoundPage } from "./pages/NotFound";

import { PlatformDashboardPage } from "./pages/platform/Dashboard";
import { PlatformPeoplePage } from "./pages/platform/People";
import { PlatformEmployeeDetailPage } from "./pages/platform/EmployeeDetail";
import { PlatformHiringPage } from "./pages/platform/Hiring";
import { PlatformPayrollPage } from "./pages/platform/Payroll";
import { PlatformLeavePage } from "./pages/platform/Leave";
import { PlatformPerformancePage } from "./pages/platform/Performance";
import { PlatformReportsPage } from "./pages/platform/Reports";
import { PlatformSettingsPage } from "./pages/platform/Settings";

export default function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/employment-os" element={<EmploymentOsPage />} />
            <Route
              path="/products/swag-spend-account/earned-wage-access"
              element={<EarnedWageAccessPage />}
            />
            <Route path="/products/:slug" element={<ProductDetailPage />} />

            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:slug" element={<SolutionDetailPage />} />

            <Route path="/industry" element={<IndustriesPage />} />
            <Route path="/industry/:slug" element={<IndustryDetailPage />} />

            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/ai" element={<AiPage />} />
            <Route path="/responsible-ai" element={<Navigate to="/ai" replace />} />
            <Route path="/work" element={<WorkPage />} />

            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/salary-benchmarking" element={<SalaryBenchmarkingPage />} />
            <Route path="/jobs/:slug" element={<JobDetailPage />} />

            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:audience" element={<ResourceHubPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/compliance-corner" element={<ComplianceCornerPage />} />
            <Route path="/news" element={<NewsroomPage />} />
            <Route path="/webinars" element={<WebinarsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />

            <Route path="/partner-network" element={<PartnerNetworkPage />} />
            <Route
              path="/partner-network/referral-partner-program"
              element={<ReferralPartnerPage />}
            />
            <Route path="/partner-network/certified-partner" element={<CertifiedPartnerPage />} />
            <Route path="/partner-directory" element={<PartnerDirectoryPage />} />

            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/hero-foundation" element={<HeroFoundationPage />} />
            <Route path="/media-centre" element={<MediaCentrePage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/request-a-demo" element={<RequestDemoPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/implementation-hub" element={<ImplementationHubPage />} />

            <Route path="/legals/privacy" element={<PrivacyPage />} />
            <Route path="/legals/terms" element={<TermsPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            <Route path="/search" element={<SearchResultsPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/start-free" element={<StartFreePage />} />

            <Route
              path="/platform"
              element={
                <RequireAuth>
                  <PlatformDashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/people"
              element={
                <RequireAuth>
                  <PlatformPeoplePage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/people/:employeeId"
              element={
                <RequireAuth>
                  <PlatformEmployeeDetailPage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/hiring"
              element={
                <RequireAuth>
                  <PlatformHiringPage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/payroll"
              element={
                <RequireAuth>
                  <PlatformPayrollPage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/leave"
              element={
                <RequireAuth>
                  <PlatformLeavePage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/performance"
              element={
                <RequireAuth>
                  <PlatformPerformancePage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/reports"
              element={
                <RequireAuth>
                  <PlatformReportsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/platform/settings"
              element={
                <RequireAuth>
                  <PlatformSettingsPage />
                </RequireAuth>
              }
            />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/start-free" replace />} />
            <Route path="/blog/category/:slug" element={<Navigate to="/blog" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
