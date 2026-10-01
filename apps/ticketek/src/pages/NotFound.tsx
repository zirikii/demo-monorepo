import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Page not found");
  return (
    <div className="container-tk py-20 text-center">
      <p className="tk-gradient-text text-6xl font-extrabold">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">We couldn&apos;t find that page</h1>
      <p className="mt-2 text-ink-soft">The event may have finished, or the link might be wrong.</p>
      <div className="mt-6 flex justify-center gap-2">
        <Link to="/" className="btn-primary">
          Go to homepage
        </Link>
        <Link to="/whats-on" className="btn-outline">
          See what&apos;s on
        </Link>
      </div>
    </div>
  );
}
