import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { BankingProvider } from "./hooks/useBanking";
import { ScrollToTop } from "./components/layout/ScrollToTop";

import { HomePage } from "./pages/Home";
import { BankingPage } from "./pages/products/Banking";
import { BankAccountsPage } from "./pages/products/BankAccounts";
import { SavingsAccountsPage } from "./pages/products/SavingsAccounts";
import { CreditCardsPage } from "./pages/products/CreditCards";
import { PersonalLoansPage } from "./pages/products/PersonalLoans";
import { InternationalTravelPage } from "./pages/products/InternationalTravel";
import { HomeLoansPage } from "./pages/products/HomeLoans";
import { HomeLoanRatesPage } from "./pages/products/HomeLoanRates";
import { HomeLoanCalculatorPage } from "./pages/products/HomeLoanCalculator";
import { InsurancePage } from "./pages/products/Insurance";
import { InvestingSuperPage } from "./pages/products/InvestingSuper";
import { BusinessPage } from "./pages/products/Business";
import { InstitutionalPage } from "./pages/products/Institutional";
import { YelloPage } from "./pages/products/Yello";
import {
  CommBankAppPage,
  DigitalBankingPage,
  NetBankInfoPage,
} from "./pages/products/DigitalBanking";
import { RatesAndFeesPage } from "./pages/products/RatesAndFees";
import { ToolsAndCalculatorsPage } from "./pages/products/ToolsAndCalculators";

import { SupportPage } from "./pages/Support";
import { LocateUsPage } from "./pages/LocateUs";
import { SecurityPage } from "./pages/Security";
import { AboutPage, CareersPage } from "./pages/About";
import { ArticlePage, NewsroomPage } from "./pages/Newsroom";
import { SearchPage } from "./pages/Search";
import { AccessibilityPage, ImportantInfoPage, PrivacyPage, TermsPage } from "./pages/Legal";
import { LogonPage } from "./pages/Logon";
import { RegisterPage } from "./pages/Register";
import { NotFoundPage } from "./pages/NotFound";

import { NetBankDashboardPage } from "./pages/netbank/Dashboard";
import { AccountDetailPage } from "./pages/netbank/AccountDetail";
import { TransferPage } from "./pages/netbank/Transfer";
import { PayeesPage } from "./pages/netbank/Payees";
import { NetBankCardsPage } from "./pages/netbank/Cards";
import { StatementsPage } from "./pages/netbank/Statements";
import { YelloHubPage } from "./pages/netbank/YelloHub";
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
            <Route path="/banking/bank-accounts" element={<BankAccountsPage />} />
            <Route path="/banking/savings-accounts" element={<SavingsAccountsPage />} />
            <Route path="/banking/credit-cards" element={<CreditCardsPage />} />
            <Route path="/banking/personal-loans" element={<PersonalLoansPage />} />
            <Route path="/banking/international-travel" element={<InternationalTravelPage />} />

            <Route path="/home-loans" element={<HomeLoansPage />} />
            <Route path="/home-loans/rates" element={<HomeLoanRatesPage />} />
            <Route path="/home-loans/calculator" element={<HomeLoanCalculatorPage />} />

            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/investing-and-super" element={<InvestingSuperPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/institutional" element={<InstitutionalPage />} />
            <Route path="/commbank-yello" element={<YelloPage />} />

            <Route path="/digital-banking" element={<DigitalBankingPage />} />
            <Route path="/digital-banking/netbank" element={<NetBankInfoPage />} />
            <Route path="/digital-banking/app" element={<CommBankAppPage />} />

            <Route path="/products/interest-rates-and-fees" element={<RatesAndFeesPage />} />
            <Route path="/tools-and-calculators" element={<ToolsAndCalculatorsPage />} />

            <Route path="/support" element={<SupportPage />} />
            <Route path="/locate-us" element={<LocateUsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/newsroom/:slug" element={<ArticlePage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="/important-info" element={<ImportantInfoPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />

            <Route path="/logon" element={<LogonPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/netbank" element={<NetBankDashboardPage />} />
            <Route path="/netbank/accounts/:accountId" element={<AccountDetailPage />} />
            <Route path="/netbank/transfer" element={<TransferPage />} />
            <Route path="/netbank/payees" element={<PayeesPage />} />
            <Route path="/netbank/cards" element={<NetBankCardsPage />} />
            <Route path="/netbank/statements" element={<StatementsPage />} />
            <Route path="/netbank/yello" element={<YelloHubPage />} />
            <Route path="/netbank/settings" element={<NetBankSettingsPage />} />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/logon" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </BankingProvider>
    </AuthProvider>
  );
}
