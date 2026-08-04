import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedNetBank } from "@/components/layout/NetBankLayout";
import { AuthProvider } from "@/context/AuthContext";
import { publicPages } from "@/data/publicPages";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AccountDetailPage, AccountsPage } from "@/pages/netbank/AccountsPages";
import { CardsPage } from "@/pages/netbank/CardsPage";
import { DashboardPage } from "@/pages/netbank/DashboardPage";
import { LoginPage } from "@/pages/netbank/LoginPage";
import { BpayPage, ScheduledPaymentsPage, TransferPage } from "@/pages/netbank/PaymentsPages";
import {
  InboxPage,
  ProfilePage,
  SecurityPage,
  SettingsPage,
  StatementsPage,
} from "@/pages/netbank/ServicePages";
import { CalculatorPage } from "@/pages/public/CalculatorPage";
import { ContentPage } from "@/pages/public/ContentPage";
import { HomePage } from "@/pages/public/HomePage";
import { LocationsPage } from "@/pages/public/LocationsPage";
import { SearchPage } from "@/pages/public/SearchPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {publicPages.map((page) => (
            <Route key={page.path} path={page.path} element={<ContentPage page={page} />} />
          ))}
          <Route path="/home-loans/calculator" element={<CalculatorPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/netbank/logon" element={<LoginPage />} />
          <Route path="/netbank" element={<ProtectedNetBank />}>
            <Route index element={<DashboardPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="accounts/:id" element={<AccountDetailPage />} />
            <Route path="transfer" element={<TransferPage />} />
            <Route path="bpay" element={<BpayPage />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="payments" element={<ScheduledPaymentsPage />} />
            <Route path="statements" element={<StatementsPage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
