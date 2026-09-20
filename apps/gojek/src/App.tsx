import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/hub/RequireAuth";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AuthProvider } from "./hooks/useAuth";

import AboutUsPage from "./pages/AboutUs";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import HomePage from "./pages/Home";
import JobDetailPage from "./pages/JobDetail";
import JoinUsPage from "./pages/JoinUs";
import LifeAtGojekPage from "./pages/LifeAtGojek";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import OpenSourcePage from "./pages/OpenSource";
import ProductDetailPage from "./pages/ProductDetail";
import ProductsPage from "./pages/Products";

import HubApplicationsPage from "./pages/hub/Applications";
import HubInterviewsPage from "./pages/hub/Interviews";
import HubOverviewPage from "./pages/hub/Overview";
import HubProfilePage from "./pages/hub/Profile";
import HubSavedRolesPage from "./pages/hub/SavedRoles";

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

          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/life-at-gojek" element={<LifeAtGojekPage />} />
          <Route path="/open-source" element={<OpenSourcePage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          <Route path="/join-us" element={<JoinUsPage />} />
          <Route path="/join-us/:slug" element={<JobDetailPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/hub"
            element={
              <Guarded>
                <HubOverviewPage />
              </Guarded>
            }
          />
          <Route
            path="/hub/applications"
            element={
              <Guarded>
                <HubApplicationsPage />
              </Guarded>
            }
          />
          <Route
            path="/hub/saved"
            element={
              <Guarded>
                <HubSavedRolesPage />
              </Guarded>
            }
          />
          <Route
            path="/hub/interviews"
            element={
              <Guarded>
                <HubInterviewsPage />
              </Guarded>
            }
          />
          <Route
            path="/hub/profile"
            element={
              <Guarded>
                <HubProfilePage />
              </Guarded>
            }
          />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/careers" element={<Navigate to="/join-us" replace />} />
          <Route path="/jobs" element={<Navigate to="/join-us" replace />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/life" element={<Navigate to="/life-at-gojek" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
