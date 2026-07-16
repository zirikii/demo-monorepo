import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HomePage } from "@/pages/Home";
import { SectionPage } from "@/pages/Section";
import { SportPage } from "@/pages/Sport";
import { ArticlePage } from "@/pages/Article";
import { ShoppingPage } from "@/pages/Shopping";
import { TvPage } from "@/pages/Tv";
import { TvShowPage } from "@/pages/TvShow";
import { LivePage } from "@/pages/Live";
import { SearchPage } from "@/pages/Search";
import { LoginPage } from "@/pages/Login";
import { SignupPage } from "@/pages/Signup";
import { AccountPage } from "@/pages/Account";
import { SettingsPage } from "@/pages/Settings";
import { NewsletterPage } from "@/pages/Newsletter";
import { HoroscopesPage } from "@/pages/Horoscopes";
import { AboutPage } from "@/pages/About";
import { PrivacyPage, TermsPage } from "@/pages/Legal";
import { NotFoundPage } from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<SectionPage pillar="news" />} />
          <Route path="/news/:slug" element={<ArticlePage pillar="news" />} />
          <Route path="/sport" element={<SportPage />} />
          <Route path="/sport/:slug" element={<ArticlePage pillar="sport" />} />
          <Route path="/lifestyle" element={<SectionPage pillar="lifestyle" />} />
          <Route path="/lifestyle/:slug" element={<ArticlePage pillar="lifestyle" />} />
          <Route path="/travel" element={<SectionPage pillar="travel" />} />
          <Route path="/travel/:slug" element={<ArticlePage pillar="travel" />} />
          <Route path="/entertainment" element={<SectionPage pillar="entertainment" />} />
          <Route path="/entertainment/:slug" element={<ArticlePage pillar="entertainment" />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/shopping/:slug" element={<ArticlePage pillar="shopping" />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/tv/show/:showSlug" element={<TvShowPage />} />
          <Route path="/tv/:slug" element={<ArticlePage pillar="tv" />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/horoscopes" element={<HoroscopesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
