import { useLocation } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { BreakingTicker } from "./BreakingTicker";
import { ErrorBoundary } from "../ui/ErrorBoundary";

type Props = {
  children: React.ReactNode;
  /** Hide the breaking-news ticker (e.g. on auth pages). */
  ticker?: boolean;
};

export function PageLayout({ children, ticker = true }: Props) {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <SiteHeader />
      {ticker ? <BreakingTicker /> : null}
      <main className="flex-1">
        <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  );
}
