import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { FlyPage } from "./pages/Fly";
import { FlightResultsPage } from "./pages/FlightResults";
import { AtChangiPage } from "./pages/AtChangi";
import { TerminalDetailPage } from "./pages/TerminalDetail";
import { DineAndShopPage } from "./pages/DineAndShop";
import { DiningDetailPage } from "./pages/DiningDetail";
import { ExperiencePage } from "./pages/Experience";
import { ExperienceDetailPage } from "./pages/ExperienceDetail";
import { HappeningsPage } from "./pages/Happenings";
import { HappeningDetailPage } from "./pages/HappeningDetail";
import { RewardsPage } from "./pages/Rewards";
import { HelpPage } from "./pages/Help";
import { NotFoundPage } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fly" element={<FlyPage />} />
        <Route path="/fly/flights" element={<FlightResultsPage />} />
        <Route path="/at-changi" element={<AtChangiPage />} />
        <Route path="/at-changi/:terminal" element={<TerminalDetailPage />} />
        <Route path="/dine-and-shop" element={<DineAndShopPage />} />
        <Route path="/dine-and-shop/:slug" element={<DiningDetailPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
        <Route path="/happenings" element={<HappeningsPage />} />
        <Route path="/happenings/:slug" element={<HappeningDetailPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
