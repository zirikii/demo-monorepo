import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/jira/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import PricingPage from "./pages/Pricing";
import SolutionsPage from "./pages/Solutions";
import SolutionDetailPage from "./pages/SolutionDetail";
import CollectionDetailPage from "./pages/CollectionDetail";
import CustomersPage from "./pages/Customers";
import CustomerStoryPage from "./pages/CustomerStory";
import ResourcesPage from "./pages/Resources";
import ResourceDetailPage from "./pages/ResourceDetail";
import CompanyPage from "./pages/Company";
import CareersPage from "./pages/Careers";
import EnterprisePage from "./pages/Enterprise";
import TrustPage from "./pages/Trust";
import MarketplacePage from "./pages/Marketplace";
import CommunityPage from "./pages/Community";
import PartnersPage from "./pages/Partners";
import ContactPage from "./pages/Contact";
import SupportPage from "./pages/Support";
import TryPage from "./pages/Try";
import LegalPage from "./pages/Legal";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import NotFoundPage from "./pages/NotFound";

import BoardPage from "./pages/jira/Board";
import BacklogPage from "./pages/jira/Backlog";
import IssuePage from "./pages/jira/Issue";
import SettingsPage from "./pages/jira/Settings";
import JiraRovoPage from "./pages/jira/Rovo";

import ConfluenceHomePage from "./pages/confluence/Home";
import ConfluencePage from "./pages/confluence/Page";
import JsmQueuesPage from "./pages/jsm/Queues";
import JsmRequestPage from "./pages/jsm/Request";
import JpdIdeasPage from "./pages/jpd/Ideas";
import JpdIdeaPage from "./pages/jpd/Idea";
import BitbucketReposPage from "./pages/bitbucket/Repos";
import BitbucketRepoPage from "./pages/bitbucket/Repo";
import BitbucketPullRequestPage from "./pages/bitbucket/PullRequest";
import TrelloBoardPage from "./pages/trello/Board";
import LoomLibraryPage from "./pages/loom/Library";
import LoomWatchPage from "./pages/loom/Watch";
import RovoStudioPage from "./pages/rovo/Studio";
import AdminHubPage from "./pages/admin/Hub";

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

          <Route path="/software" element={<ProductsPage />} />
          <Route path="/software/jira/pricing" element={<PricingPage />} />
          <Route path="/software/:slug" element={<ProductDetailPage />} />

          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />

          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:slug" element={<CustomerStoryPage />} />

          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ResourceDetailPage />} />

          <Route path="/company" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/try" element={<TryPage />} />

          <Route path="/legal/privacy" element={<LegalPage variant="privacy" />} />
          <Route path="/legal/terms" element={<LegalPage variant="terms" />} />
          <Route path="/legal/copyright" element={<LegalPage variant="copyright" />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/jira"
            element={
              <Guarded>
                <BoardPage />
              </Guarded>
            }
          />
          <Route
            path="/jira/backlog"
            element={
              <Guarded>
                <BacklogPage />
              </Guarded>
            }
          />
          <Route
            path="/jira/issues/:key"
            element={
              <Guarded>
                <IssuePage />
              </Guarded>
            }
          />
          <Route
            path="/jira/settings"
            element={
              <Guarded>
                <SettingsPage />
              </Guarded>
            }
          />
          <Route
            path="/jira/rovo"
            element={
              <Guarded>
                <JiraRovoPage />
              </Guarded>
            }
          />

          <Route
            path="/confluence"
            element={
              <Guarded>
                <ConfluenceHomePage />
              </Guarded>
            }
          />
          <Route
            path="/confluence/pages/:id"
            element={
              <Guarded>
                <ConfluencePage />
              </Guarded>
            }
          />

          <Route
            path="/jsm"
            element={
              <Guarded>
                <JsmQueuesPage />
              </Guarded>
            }
          />
          <Route
            path="/jsm/requests/:key"
            element={
              <Guarded>
                <JsmRequestPage />
              </Guarded>
            }
          />

          <Route
            path="/jpd"
            element={
              <Guarded>
                <JpdIdeasPage />
              </Guarded>
            }
          />
          <Route
            path="/jpd/ideas/:key"
            element={
              <Guarded>
                <JpdIdeaPage />
              </Guarded>
            }
          />

          <Route
            path="/bitbucket"
            element={
              <Guarded>
                <BitbucketReposPage />
              </Guarded>
            }
          />
          <Route
            path="/bitbucket/:repo"
            element={
              <Guarded>
                <BitbucketRepoPage />
              </Guarded>
            }
          />
          <Route
            path="/bitbucket/:repo/pull-requests/:id"
            element={
              <Guarded>
                <BitbucketPullRequestPage />
              </Guarded>
            }
          />

          <Route
            path="/trello"
            element={
              <Guarded>
                <TrelloBoardPage />
              </Guarded>
            }
          />

          <Route
            path="/loom"
            element={
              <Guarded>
                <LoomLibraryPage />
              </Guarded>
            }
          />
          <Route
            path="/loom/:id"
            element={
              <Guarded>
                <LoomWatchPage />
              </Guarded>
            }
          />

          <Route
            path="/rovo"
            element={
              <Guarded>
                <RovoStudioPage />
              </Guarded>
            }
          />
          <Route
            path="/admin"
            element={
              <Guarded>
                <AdminHubPage />
              </Guarded>
            }
          />

          <Route path="/products" element={<Navigate to="/software" replace />} />
          <Route path="/about" element={<Navigate to="/company" replace />} />
          <Route path="/pricing" element={<Navigate to="/software/jira/pricing" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
