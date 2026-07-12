import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { AtChangiPage } from "./pages/AtChangi";
import { DestinationPage } from "./pages/Destination";
import { DineAndShopPage } from "./pages/DineAndShop";
import { ExperiencePage } from "./pages/Experience";
import { FlyPage } from "./pages/Fly";
import { HappeningsPage } from "./pages/Happenings";
import { HelpPage } from "./pages/Help";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";
import { RewardsPage } from "./pages/Rewards";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fly" element={<FlyPage />} />
        <Route path="/at-changi" element={<AtChangiPage />} />
        <Route path="/dine-and-shop" element={<DineAndShopPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/happenings" element={<HappeningsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/destinations/:slug" element={<DestinationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
