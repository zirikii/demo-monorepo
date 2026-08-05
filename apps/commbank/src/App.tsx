import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAuth } from "./components/netbank/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";
import { BankingProvider } from "./hooks/useBanking";

import { HomePage } from "./pages/Home";
import { BankingPage } from "./pages/Banking";
import { BankAccountsPage } from "./pages/BankAccounts";
import { CreditCardsPage } from "./pages/CreditCards";
import { PersonalLoansPage } from "./pages/PersonalLoans";
import { TravelPage } from "./pages/Travel";
import { HomeLoansPage } from "./pages/HomeLoans";
import { HomeLoanTypesPage } from "./pages/HomeLoanTypes";
import { HomeLoanRatesPage } from "./pages/HomeLoanRates";
import { InsurancePage } from "./pages/Insurance";
import { InvestingAndSuperPage } from "./pages/InvestingAndSuper";
import { BusinessPage } from "./pages/Business";
import { InstitutionalPage } from "./pages/Institutional";
import { YelloPage } from "./pages/Yello";
import { DigitalBankingPage } from "./pages/DigitalBanking";
import { NetBankInfoPage } from "./pages/NetBankInfo";
import { CommBankAppPage } from "./pages/CommBankApp";
import { RatesAndFeesPage } from "./pages/RatesAndFees";
import { ToolsAndCalculatorsPage } from "./pages/ToolsAndCalculators";
import { SupportPage } from "./pages/Support";
import { ContactUsPage } from "./pages/ContactUs";
import { SecurityPage } from "./pages/Security";
import { LocateUsPage } from "./pages/LocateUs";
import { AboutUsPage, CareersPage } from "./pages/Corporate";
import { ArticlePage, NewsroomPage } from "./pages/Newsroom";
import { AccessibilityPage, ImportantInfoPage, PrivacyPage } from "./pages/Legal";
import { SearchResultsPage } from "./pages/SearchResults";
import { ProductDetailPage } from "./pages/ProductDetail";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { NotFoundPage } from "./pages/NotFound";

import { NetBankOverviewPage } from "./pages/netbank/Overview";
import { NetBankAccountDetailPage } from "./pages/netbank/AccountDetail";
import { NetBankTransferPage } from "./pages/netbank/Transfer";
import { NetBankPayPage } from "./pages/netbank/Pay";
import { NetBankCardsPage } from "./pages/netbank/Cards";
import { NetBankYelloPage } from "./pages/netbank/YelloHub";
import { NetBankSettingsPage } from "./pages/netbank/Settings";

export default function App() {
  return (
    <AuthProvider>
      <BankingProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/banking" element={<BankingPage />} />
            <Route path="/bank-accounts" element={<BankAccountsPage />} />
            <Route path="/credit-cards" element={<CreditCardsPage />} />
            <Route path="/personal-loans" element={<PersonalLoansPage />} />
            <Route path="/travel" element={<TravelPage />} />

            <Route path="/home-loans" element={<HomeLoansPage />} />
            <Route path="/home-loans/types" element={<HomeLoanTypesPage />} />
            <Route path="/home-loans/rates" element={<HomeLoanRatesPage />} />

            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/investing-and-super" element={<InvestingAndSuperPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/institutional" element={<InstitutionalPage />} />
            <Route path="/commbank-yello" element={<YelloPage />} />

            <Route path="/digital-banking" element={<DigitalBankingPage />} />
            <Route path="/digital-banking/netbank" element={<NetBankInfoPage />} />
            <Route path="/digital-banking/app" element={<CommBankAppPage />} />

            <Route path="/rates-and-fees" element={<RatesAndFeesPage />} />
            <Route path="/tools-and-calculators" element={<ToolsAndCalculatorsPage />} />

            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/contact-us" element={<ContactUsPage />} />
            <Route path="/support/security" element={<SecurityPage />} />
            <Route path="/locate-us" element={<LocateUsPage />} />

            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/newsroom/:slug" element={<ArticlePage />} />

            <Route path="/important-info" element={<ImportantInfoPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/netbank"
              element={
                <RequireAuth>
                  <NetBankOverviewPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/accounts/:accountId"
              element={
                <RequireAuth>
                  <NetBankAccountDetailPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/transfer"
              element={
                <RequireAuth>
                  <NetBankTransferPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/pay"
              element={
                <RequireAuth>
                  <NetBankPayPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/cards"
              element={
                <RequireAuth>
                  <NetBankCardsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/yello"
              element={
                <RequireAuth>
                  <NetBankYelloPage />
                </RequireAuth>
              }
            />
            <Route
              path="/netbank/settings"
              element={
                <RequireAuth>
                  <NetBankSettingsPage />
                </RequireAuth>
              }
            />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/support.html" element={<Navigate to="/support" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </BankingProvider>
    </AuthProvider>
  );
}
