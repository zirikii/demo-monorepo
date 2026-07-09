import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { HomePage } from "./pages/Home";
import { ProductDxpPage } from "./pages/ProductDxp";
import { ProductSearchPage } from "./pages/ProductSearch";
import { ProductContentIntelligencePage } from "./pages/ProductContentIntelligence";
import { CapabilitiesPage } from "./pages/Capabilities";
import { CapabilityDetailPage } from "./pages/CapabilityDetail";
import { IndustriesPage } from "./pages/Industries";
import { IndustryDetailPage } from "./pages/IndustryDetail";
import { UseCasesPage } from "./pages/UseCases";
import { UseCaseDetailPage } from "./pages/UseCaseDetail";
import { CustomerStoriesPage } from "./pages/CustomerStories";
import { StoryDetailPage } from "./pages/StoryDetail";
import { BlogPage } from "./pages/Blog";
import { BlogPostPage } from "./pages/BlogPost";
import { AboutPage } from "./pages/About";
import { CareersPage } from "./pages/Careers";
import { PartnershipsPage } from "./pages/Partnerships";
import { RoadmapPage } from "./pages/Roadmap";
import { DemosPage } from "./pages/Demos";
import { ContactPage } from "./pages/Contact";
import { BookACallPage } from "./pages/BookACall";
import { SecurityPage } from "./pages/Security";
import { LegalPage } from "./pages/Legal";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicy";
import { NotFoundPage } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/digital-experience-platform" element={<ProductDxpPage />} />
        <Route path="/products/squiz-funnelback-search" element={<ProductSearchPage />} />
        <Route path="/products/content-intelligence" element={<ProductContentIntelligencePage />} />
        <Route path="/products/capabilities" element={<CapabilitiesPage />} />
        <Route path="/products/capabilities/:slug" element={<CapabilityDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/use-cases/:slug" element={<UseCaseDetailPage />} />
        <Route path="/customer-stories" element={<CustomerStoriesPage />} />
        <Route path="/customer-stories/:slug" element={<StoryDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/demos" element={<DemosPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book-a-call" element={<BookACallPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
