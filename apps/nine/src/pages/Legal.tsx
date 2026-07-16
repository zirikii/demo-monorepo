import { PageLayout } from "@/components/layout/PageLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PrivacyPage() {
  useDocumentTitle("Privacy");
  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Privacy (demo)</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm text-nine-muted">
        <p>
          This demo stores a mock session and preference flags in your browser&apos;s localStorage only. No data
          is sent to Nine or any third party.
        </p>
        <p>
          Do not enter real passwords — any credentials are accepted and kept locally for the session mock.
        </p>
      </div>
    </PageLayout>
  );
}

export function TermsPage() {
  useDocumentTitle("Terms");
  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Terms (demo)</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm text-nine-muted">
        <p>
          Content is fictionalised for demonstration. Brand assets are used solely for visual fidelity in an
          unofficial clone.
        </p>
        <p>Use of this demo does not create any relationship with Nine Entertainment Co.</p>
      </div>
    </PageLayout>
  );
}
