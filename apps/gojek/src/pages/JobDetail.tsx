import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Field, TextArea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { getJob } from "@/data/jobs";
import { useAuth } from "@/hooks/useAuth";
import { useDisclosure } from "@/hooks/useDisclosure";
import { toggleSavedJob, upsertApplication } from "@/lib/applications";
import { formatDate } from "@/lib/format";

export default function JobDetailPage() {
  const { slug } = useParams();
  const job = slug ? getJob(slug) : undefined;
  const { user } = useAuth();
  const navigate = useNavigate();
  const apply = useDisclosure();
  const [note, setNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  if (!job) return <Navigate to="/careers" replace />;

  return (
    <PageLayout title={job.title}>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <Link to="/careers" className="text-sm text-go-green hover:underline">
          Join us
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{job.title}</h1>
        <p className="mt-3 text-go-muted">
          {job.org} · {job.location} · {job.type} · Posted {formatDate(job.posted)}
        </p>
        <p className="mt-8 text-lg text-go-muted">{job.summary}</p>
        <p className="mt-6 text-go-muted">
          The take-home is a high-school CLI. Linux build, git history, tests. We ask for code because thousands of
          people apply and we are looking for the 0.5% who still enjoy that.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              if (!user) {
                navigate(`/login?redirect=${encodeURIComponent(`/careers/${job.slug}`)}`);
                return;
              }
              apply.show();
            }}
          >
            Apply
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              toggleSavedJob(job.slug);
              setToast("Saved to your portal list");
            }}
          >
            Save role
          </Button>
        </div>
      </article>
      <Modal open={apply.open} title={`Apply — ${job.title}`} onClose={apply.hide}>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            upsertApplication({
              jobSlug: job.slug,
              jobTitle: job.title,
              location: job.location,
              status: "submitted",
              note,
            });
            apply.hide();
            setToast("Application submitted to the dummy portal");
            navigate("/portal/applications");
          }}
        >
          <Field htmlFor="note" label="Note to the hiring squad" hint="Stored in localStorage only.">
            <TextArea
              id="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Why this role, which hub, which take-home language."
            />
          </Field>
          <Button type="submit">Submit application</Button>
        </form>
      </Modal>
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </PageLayout>
  );
}
