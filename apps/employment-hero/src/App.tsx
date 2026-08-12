import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/Home";
import { ProductsPage, ProductDetailPage } from "@/pages/Products";
import { PricingPage } from "@/pages/Pricing";
import { IndustriesPage, MarketingPage } from "@/pages/Marketing";
import { ResourcesPage } from "@/pages/Resources";
import { DashboardPage } from "@/pages/Dashboard";
import { FormPage } from "@/pages/Forms";
import { LoginPage } from "@/pages/Login";
import { NotFoundPage } from "@/pages/NotFound";

const marketingPaths = [
  "/solutions/small-business",
  "/solutions/medium-business",
  "/solutions/enterprise",
  "/industries/healthcare",
  "/industries/hospitality",
  "/industries/professional-services",
  "/customers",
  "/partners",
  "/about",
  "/careers",
];

const resourcePaths = [
  "/resources",
  "/resources/blog",
  "/resources/guides-and-playbooks",
  "/resources/webinars",
  "/resources/templates",
];

const dashboardPaths = [
  "/platform/dashboard",
  "/platform/people",
  "/platform/payroll",
  "/platform/recruitment",
  "/platform/leave",
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        {marketingPaths.map((path) => (
          <Route key={path} path={path} element={<MarketingPage />} />
        ))}
        {resourcePaths.map((path) => (
          <Route key={path} path={path} element={<ResourcesPage />} />
        ))}
        {dashboardPaths.map((path) => (
          <Route key={path} path={path} element={<DashboardPage />} />
        ))}
        <Route path="/contact" element={<FormPage />} />
        <Route path="/book-a-demo" element={<FormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
