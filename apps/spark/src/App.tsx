import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { TravelAndMovePage } from "@/pages/TravelAndMovePage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TravelAndMovePage />} />
        <Route path="/online/shop/promotions/travel-and-move" element={<TravelAndMovePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
