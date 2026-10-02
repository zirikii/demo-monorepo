import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <div className="container-sm py-24 text-center">
      <p className="sm-gradient-text text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-3xl font-bold">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-ink-soft">The link may be out of date, or the page has moved.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Link to="/" className="btn-primary">
          Go to homepage
        </Link>
        <Link to="/platform" className="btn-outline">
          Explore the platform
        </Link>
      </div>
    </div>
  );
}
