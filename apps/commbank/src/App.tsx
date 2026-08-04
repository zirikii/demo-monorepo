import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { NetBankShell } from "@/components/netbank/NetBankShell";
import { RequireAuth } from "@/pages/RequireAuth";
import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";
import { SignupPage } from "@/pages/Signup";
import { NotFoundPage } from "@/pages/NotFound";
import { BankingPage } from "@/pages/BankingPage";
import { EverydayAccountsPage } from "@/pages/EverydayAccountsPage";
import { SmartAccessPage } from "@/pages/SmartAccessPage";
import { SavingsAccountsPage } from "@/pages/SavingsAccountsPage";
import { NetbankSaverPage } from "@/pages/NetbankSaverPage";
import { GoalSaverPage } from "@/pages/GoalSaverPage";
import { TermDepositsPage } from "@/pages/TermDepositsPage";
import { CreditCardsPage } from "@/pages/CreditCardsPage";
import { PersonalLoansPage } from "@/pages/PersonalLoansPage";
import { CarLoansPage } from "@/pages/CarLoansPage";
import { HomeLoansPage } from "@/pages/HomeLoansPage";
import { BuyingHomePage } from "@/pages/BuyingHomePage";
import { RefinancingPage } from "@/pages/RefinancingPage";
import { HomeLoanCalculatorPage } from "@/pages/HomeLoanCalculator";
import { InsurancePage } from "@/pages/InsurancePage";
import { HomeInsurancePage } from "@/pages/HomeInsurancePage";
import { CarInsurancePage } from "@/pages/CarInsurancePage";
import { TravelInsurancePage } from "@/pages/TravelInsurancePage";
import { LifeInsurancePage } from "@/pages/LifeInsurancePage";
import { InvestingPage } from "@/pages/InvestingPage";
import { CommsecPage } from "@/pages/CommsecPage";
import { SuperPage } from "@/pages/SuperPage";
import { BusinessPage } from "@/pages/BusinessPage";
import { BusinessAccountsPage } from "@/pages/BusinessAccountsPage";
import { BusinessLoansPage } from "@/pages/BusinessLoansPage";
import { InstitutionalPage } from "@/pages/InstitutionalPage";
import { YelloPage } from "@/pages/YelloPage";
import { NetbankInfoPage } from "@/pages/NetbankInfoPage";
import { AppInfoPage } from "@/pages/AppInfoPage";
import { RatesPage } from "@/pages/Rates";
import { CalculatorsPage } from "@/pages/Calculators";
import { FindUsPage } from "@/pages/FindUs";
import { HelpPage } from "@/pages/Help";
import { ContactPage } from "@/pages/Contact";
import { SecurityPage } from "@/pages/Security";
import { OffersPage } from "@/pages/Offers";
import { TravelPage } from "@/pages/Travel";
import { AboutPage } from "@/pages/About";
import { CareersPage } from "@/pages/Careers";
import { NewsroomPage } from "@/pages/Newsroom";
import { SustainabilityPage } from "@/pages/Sustainability";
import { PrivacyPage } from "@/pages/Privacy";
import { AccessibilityPage } from "@/pages/Accessibility";
import { SitemapPage } from "@/pages/Sitemap";
import { NetBankHomePage } from "@/pages/NetBankHome";
import { NetBankAccountPage } from "@/pages/NetBankAccount";
import { NetBankTransfersPage } from "@/pages/NetBankTransfers";
import { NetBankCardsPage } from "@/pages/NetBankCards";
import { SettingsPage } from "@/pages/Settings";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/banking" element={<BankingPage />} />
          <Route path="/banking/everyday-accounts" element={<EverydayAccountsPage />} />
          <Route path="/banking/everyday-account-smart-access" element={<SmartAccessPage />} />
          <Route path="/banking/savings-accounts" element={<SavingsAccountsPage />} />
          <Route path="/banking/netbank-saver" element={<NetbankSaverPage />} />
          <Route path="/banking/goalsaver" element={<GoalSaverPage />} />
          <Route path="/banking/term-deposits" element={<TermDepositsPage />} />
          <Route path="/banking/credit-cards" element={<CreditCardsPage />} />
          <Route path="/banking/personal-loans" element={<PersonalLoansPage />} />
          <Route path="/banking/car-loans" element={<CarLoansPage />} />

          <Route path="/home-loans" element={<HomeLoansPage />} />
          <Route path="/home-loans/buying" element={<BuyingHomePage />} />
          <Route path="/home-loans/refinancing" element={<RefinancingPage />} />
          <Route path="/home-loans/calculator" element={<HomeLoanCalculatorPage />} />

          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/insurance/home" element={<HomeInsurancePage />} />
          <Route path="/insurance/car" element={<CarInsurancePage />} />
          <Route path="/insurance/travel" element={<TravelInsurancePage />} />
          <Route path="/insurance/life" element={<LifeInsurancePage />} />

          <Route path="/investing" element={<InvestingPage />} />
          <Route path="/investing/commsec" element={<CommsecPage />} />
          <Route path="/investing/super" element={<SuperPage />} />

          <Route path="/business" element={<BusinessPage />} />
          <Route path="/business/accounts" element={<BusinessAccountsPage />} />
          <Route path="/business/loans" element={<BusinessLoansPage />} />
          <Route path="/institutional" element={<InstitutionalPage />} />
          <Route path="/commbank-yello" element={<YelloPage />} />
          <Route path="/digital-banking/netbank" element={<NetbankInfoPage />} />
          <Route path="/digital-banking/app" element={<AppInfoPage />} />

          <Route path="/rates" element={<RatesPage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/find-us" element={<FindUsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/newsroom" element={<NewsroomPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          <Route
            path="/netbank"
            element={
              <RequireAuth>
                <NetBankShell />
              </RequireAuth>
            }
          >
            <Route index element={<NetBankHomePage />} />
            <Route path="accounts/:accountId" element={<NetBankAccountPage />} />
            <Route path="transfers" element={<NetBankTransfersPage />} />
            <Route path="cards" element={<NetBankCardsPage />} />
          </Route>

          <Route
            path="/settings"
            element={
              <RequireAuth>
                <NetBankShell />
              </RequireAuth>
            }
          >
            <Route index element={<SettingsPage />} />
          </Route>

          <Route path="/netbank/*" element={<Navigate to="/netbank" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
