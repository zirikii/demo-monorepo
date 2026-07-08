import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { MobileRechargePage } from "./pages/MobileRecharge";
import { ElectricityBillPage } from "./pages/ElectricityBill";
import { DthRechargePage } from "./pages/DthRecharge";
import { FastagRechargePage } from "./pages/FastagRecharge";
import { BroadbandBillPage } from "./pages/BroadbandBill";
import { LoanEmiPage } from "./pages/LoanEmi";
import { BillPaymentsPage } from "./pages/BillPayments";
import { FlightsPage } from "./pages/Flights";
import { BusTicketsPage } from "./pages/BusTickets";
import { TrainTicketsPage } from "./pages/TrainTickets";
import { MoviesPage } from "./pages/Movies";
import { UpiPage } from "./pages/Upi";
import { CreditCardsPage } from "./pages/CreditCards";
import { InsurancePage } from "./pages/Insurance";
import { PersonalLoanPage } from "./pages/PersonalLoan";
import { GoldPage } from "./pages/Gold";
import { PaytmMoneyPage } from "./pages/PaytmMoney";
import { BusinessPage } from "./pages/Business";
import { OffersPage } from "./pages/Offers";
import { AboutPage } from "./pages/About";
import { CareersPage } from "./pages/Careers";
import { InvestorRelationsPage } from "./pages/InvestorRelations";
import { BlogPage } from "./pages/Blog";
import { SupportPage } from "./pages/Support";
import { SecurityPage } from "./pages/Security";
import { NotFoundPage } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recharge" element={<MobileRechargePage />} />
        <Route path="/electricity-bill-payment" element={<ElectricityBillPage />} />
        <Route path="/dth-recharge" element={<DthRechargePage />} />
        <Route path="/fastag-recharge" element={<FastagRechargePage />} />
        <Route path="/broadband-bill-payment" element={<BroadbandBillPage />} />
        <Route path="/loan-emi-payment" element={<LoanEmiPage />} />
        <Route path="/bill-payments" element={<BillPaymentsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/bus-tickets" element={<BusTicketsPage />} />
        <Route path="/train-tickets" element={<TrainTicketsPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/upi" element={<UpiPage />} />
        <Route path="/credit-cards" element={<CreditCardsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/personal-loan" element={<PersonalLoanPage />} />
        <Route path="/gold" element={<GoldPage />} />
        <Route path="/paytm-money" element={<PaytmMoneyPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/investor-relations" element={<InvestorRelationsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
