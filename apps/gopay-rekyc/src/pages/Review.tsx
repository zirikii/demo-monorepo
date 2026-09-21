import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIndicator } from "../components/shell/HomeIndicator";
import { StatusBar } from "../components/shell/StatusBar";
import { EktpReview } from "../components/rekyc/EktpReview";
import { Navbar } from "../components/ui/Navbar";
import { useDemo } from "../context/useDemo";
import { CONFIRM_TOAST } from "../data/copy";
import { confirmOdd, startSession } from "../lib/api";

export function ReviewPage() {
  const navigate = useNavigate();
  const { account, loading, refresh, notify, setSessionId } = useDemo();
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onConfirm() {
    setBusy(true);
    setError(null);
    try {
      await confirmOdd();
      await refresh();
      notify(CONFIRM_TOAST);
      navigate("/vac");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not confirm");
    } finally {
      setBusy(false);
    }
  }

  async function onUpdate() {
    setBusy(true);
    setError(null);
    try {
      const created = await startSession();
      setSessionId(created.session.id);
      navigate("/rekyc/face");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not start update");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex h-full flex-col bg-bg-primary">
      <StatusBar />
      <Navbar title={expanded ? "Review e-KTP data" : "Your e-KTP data"} onBack={() => navigate("/vac")} />
      {loading || !account?.masked ? (
        <p className="px-4 text-body-small text-text-body">Loading your e-KTP…</p>
      ) : (
        <EktpReview
          masked={account.masked}
          expanded={expanded}
          onToggle={() => setExpanded((value) => !value)}
          onConfirm={() => void onConfirm()}
          onUpdate={() => void onUpdate()}
          busy={busy}
        />
      )}
      {error ? <p className="px-4 pb-2 text-xs text-danger">{error}</p> : null}
      <HomeIndicator />
    </div>
  );
}
