import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AssistantProvider } from "./features/assistant/AssistantProvider";
import { Assistant } from "./features/assistant/components/Assistant";
import { PropertyProvider } from "./features/property/PropertyProvider";
import { StudioProvider } from "./features/studio/StudioProvider";
import { AuthProvider } from "./hooks/useAuth";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { ConversationDetailPage, ConversationsPage, StudioOverviewPage } from "./pages/admin/Conversations";
import { RoutingPage } from "./pages/admin/Routing";
import { AssistantSettingsPage, PropertyProfilePage } from "./pages/admin/Settings";
import { SimulatorPage } from "./pages/admin/Simulator";
import { AppLayout } from "./pages/app/AppLayout";
import { BillingPage } from "./pages/app/Billing";
import { ChannelsPage } from "./pages/app/Channels";
import { DashboardPage } from "./pages/app/Dashboard";
import { EventsPage } from "./pages/app/Events";
import { HelpPage } from "./pages/app/Help";
import { RatesPage } from "./pages/app/Rates";
import { ReservationsPage } from "./pages/app/Reservations";
import { TeamPage } from "./pages/app/Team";
import { AboutPage, ContactPage, CustomersPage, IntegrationsPage, ResourceArticlePage, ResourcesPage, SolutionPage } from "./pages/Company";
import { DemoPage, GetStartedPage } from "./pages/Forms";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { PlatformPage, ProductPage } from "./pages/Platform";
import { PricingPage } from "./pages/Pricing";

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<StudioOverviewPage />} />
          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="conversations/:id" element={<ConversationDetailPage />} />
          <Route path="routing" element={<RoutingPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="assistant" element={<AssistantSettingsPage />} />
          <Route path="property" element={<PropertyProfilePage />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="channels" element={<ChannelsPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="rates" element={<RatesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="platform" element={<PlatformPage />} />
          <Route path="platform/:slug" element={<ProductPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="solutions/:slug" element={<SolutionPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:slug" element={<ResourceArticlePage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="get-started" element={<GetStartedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Assistant />
    </>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PropertyProvider>
        <StudioProvider>
          <AssistantProvider>{children}</AssistantProvider>
        </StudioProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
