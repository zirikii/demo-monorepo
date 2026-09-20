import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/auth/RequireAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AuthProvider } from "./hooks/useAuth";
import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import CareersPage from "./pages/Careers";
import HomePage from "./pages/Home";
import JobDetailPage from "./pages/JobDetail";
import LegalPage from "./pages/Legal";
import LifePage from "./pages/Life";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import OpenSourcePage from "./pages/OpenSource";
import OssDetailPage from "./pages/OssDetail";
import ProductDetailPage from "./pages/ProductDetail";
import ProductsPage from "./pages/Products";
import SignUpPage from "./pages/SignUp";
import PortalApplicationsPage from "./pages/portal/Applications";
import PortalDashboardPage from "./pages/portal/Dashboard";
import PortalOpenSourcePage from "./pages/portal/OpenSource";
import PortalSavedJobsPage from "./pages/portal/SavedJobs";
import PortalSettingsPage from "./pages/portal/Settings";

function Guarded({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/life-at-gojek" element={<LifePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/open-source" element={<OpenSourcePage />} />
          <Route path="/open-source/:slug" element={<OssDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/legal/privacy" element={<LegalPage variant="privacy" />} />
          <Route path="/legal/cookies" element={<LegalPage variant="cookies" />} />
          <Route
            path="/portal"
            element={
              <Guarded>
                <PortalDashboardPage />
              </Guarded>
            }
          />
          <Route
            path="/portal/applications"
            element={
              <Guarded>
                <PortalApplicationsPage />
              </Guarded>
            }
          />
          <Route
            path="/portal/saved"
            element={
              <Guarded>
                <PortalSavedJobsPage />
              </Guarded>
            }
          />
          <Route
            path="/portal/opensource"
            element={
              <Guarded>
                <PortalOpenSourcePage />
              </Guarded>
            }
          />
          <Route
            path="/portal/settings"
            element={
              <Guarded>
                <PortalSettingsPage />
              </Guarded>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
