import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AssistantProvider } from "./features/assistant/AssistantProvider";
import { Assistant } from "./features/assistant/components/Assistant";
import { FanProvider } from "./features/fan/FanProvider";
import { StudioProvider } from "./features/studio/StudioProvider";
import { AuthProvider } from "./hooks/useAuth";
import { RegionProvider } from "./hooks/useRegion";
import { AccountLayout } from "./pages/account/AccountLayout";
import { OrderDetailPage, OrdersPage } from "./pages/account/Orders";
import { AccountOverviewPage, AttendedPage, FavouritesPage, WaitlistPage } from "./pages/account/Profile";
import { CloseAccountPage, DetailsPage, NotificationsPage, PasswordPage, PaymentPage } from "./pages/account/Settings";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { ConversationDetailPage, ConversationsPage, StudioOverviewPage } from "./pages/admin/Conversations";
import { RoutingPage } from "./pages/admin/Routing";
import { AssistantSettingsPage, FanProfilePage } from "./pages/admin/Settings";
import { SimulatorPage } from "./pages/admin/Simulator";
import { HelpArticlePage, HelpCategoryPage, HelpCentrePage, SubmitRequestPage } from "./pages/Help";
import { HomePage } from "./pages/Home";
import { AccessiblePage, AgenciesPage, CartPage, GiftVouchersPage, GroupsPage, WheresMyTicketPage } from "./pages/Info";
import { ListingPage } from "./pages/Listing";
import { LoginPage, SignUpPage } from "./pages/Login";
import { NotFoundPage } from "./pages/NotFound";
import { PurchasePage } from "./pages/Purchase";
import { ShowPage } from "./pages/Show";
import { VenuePage, VenuesPage } from "./pages/Venues";

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
          <Route path="fan" element={<FanProfilePage />} />
        </Route>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="whats-on" element={<ListingPage mode="whats-on" />} />
          <Route path="category/:category" element={<ListingPage mode="category" />} />
          <Route path="search" element={<ListingPage mode="search" />} />
          <Route path="shows/:slug" element={<ShowPage />} />
          <Route path="shows/:slug/tickets/:perfId" element={<PurchasePage />} />
          <Route path="venues" element={<VenuesPage />} />
          <Route path="venues/:id" element={<VenuePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountOverviewPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="history" element={<AttendedPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="waitlist" element={<WaitlistPage />} />
            <Route path="details" element={<DetailsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="password" element={<PasswordPage />} />
            <Route path="close" element={<CloseAccountPage />} />
          </Route>
          <Route path="wheres-my-ticket" element={<WheresMyTicketPage />} />
          <Route path="gift-vouchers" element={<GiftVouchersPage />} />
          <Route path="agencies" element={<AgenciesPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="accessible-ticketing" element={<AccessiblePage />} />
          <Route path="help" element={<HelpCentrePage />} />
          <Route path="help/request" element={<SubmitRequestPage />} />
          <Route path="help/article/:slug" element={<HelpArticlePage />} />
          <Route path="help/:category" element={<HelpCategoryPage />} />
          <Route path="cart" element={<CartPage />} />
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
      <FanProvider>
        <StudioProvider>
          <RegionProvider>
            <AssistantProvider>{children}</AssistantProvider>
          </RegionProvider>
        </StudioProvider>
      </FanProvider>
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
