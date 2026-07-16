import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

type Props = {
  children: ReactNode;
  /** Reset the boundary when this value changes (e.g. the route path). */
  resetKey?: string;
};

type State = {
  hasError: boolean;
  message: string;
};

/**
 * Route-level boundary so a crash in one page's content degrades to a visible
 * error card while the surrounding shell (header, ticker, footer) keeps working.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, message: "" });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-live/10 text-live">
            <AlertTriangle className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-black text-ink">This page ran into a problem</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Something went wrong while loading this section. Our team has been notified. Please try
            again, or head back to the homepage.
          </p>
          {this.state.message ? (
            <p className="mx-auto mt-4 max-w-md rounded-md bg-surface px-3 py-2 font-mono text-xs text-ink-soft">
              {this.state.message}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-nine-deep px-4 py-2 text-sm font-semibold text-white hover:bg-nine-ink"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
