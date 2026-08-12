import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/portal/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

import { HomePage } from "./pages/Home";
import { PricingPage } from "./pages/Pricing";
import { ProductsIndexPage } from "./pages/ProductsIndex";
import { ProductDetailPage } from "./pages/ProductDetail";
import { SolutionsPage } from "./pages/Solutions";
import { SmallBusinessPage } from "./pages/SmallBusiness";
import { EnterprisePage } from "./pages/Enterprise";
import { AccountantsPage } from "./pages/Accountants";
import { CustomersPage } from "./pages/Customers";
import { CustomerDetailPage } from "./pages/CustomerDetail";
import { ResourcesPage } from "./pages/Resources";
import { BlogIndexPage } from "./pages/Blog";
import { BlogPostPage } from "./pages/BlogPost";
import { AboutPage } from "./pages/About";
import { CareersPage } from "./pages/Careers";
import { PartnersPage } from "./pages/Partners";
import { ContactPage } from "./pages/Contact";
import { RequestDemoPage } from "./pages/RequestDemo";
import { HelpPage } from "./pages/Help";
import { PrivacyPage } from "./pages/Privacy";
import { TermsPage } from "./pages/Terms";
import { SecurityPage } from "./pages/Security";
import { RegionPage } from "./pages/Region";
import { SearchResultsPage } from "./pages/SearchResults";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { NotFoundPage } from "./pages/NotFound";
import { PortalOverviewPage } from "./pages/portal/Overview";
import { PortalPeoplePage } from "./pages/portal/People";
import { PortalLeavePage } from "./pages/portal/Leave";
import { PortalPayrollPage } from "./pages/portal/Payroll";
import { PortalRecruitmentPage } from "./pages/portal/Recruitment";
import { PortalSettingsPage } from "./pages/portal/Settings";

function Protected({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/products" element={<ProductsIndexPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/small-business" element={<SmallBusinessPage />} />
          <Route path="/solutions/enterprise" element={<EnterprisePage />} />
          <Route path="/solutions/accountants" element={<AccountantsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:slug" element={<CustomerDetailPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-demo" element={<RequestDemoPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/regions/:code" element={<RegionPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/portal" element={<Protected><PortalOverviewPage /></Protected>} />
          <Route path="/portal/people" element={<Protected><PortalPeoplePage /></Protected>} />
          <Route path="/portal/leave" element={<Protected><PortalLeavePage /></Protected>} />
          <Route path="/portal/payroll" element={<Protected><PortalPayrollPage /></Protected>} />
          <Route path="/portal/recruitment" element={<Protected><PortalRecruitmentPage /></Protected>} />
          <Route path="/portal/settings" element={<Protected><PortalSettingsPage /></Protected>} />
          <Route path="/app" element={<Navigate to="/portal" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
