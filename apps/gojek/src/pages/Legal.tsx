import { PageLayout } from "@/components/layout/PageLayout";

type Variant = "privacy" | "cookies";

const COPY: Record<Variant, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy",
    body: [
      "This unofficial Gojek Tech demo stores sessions, applications, saved jobs, and integration toggles in your browser's localStorage.",
      "Nothing is sent to Gojek, GoTo, or any third party. Do not enter real passwords, identity documents, or production secrets.",
    ],
  },
  cookies: {
    title: "Cookie settings",
    body: [
      "The real gojek.io exposes Cookie Settings in the footer. This demo only uses localStorage for mock auth and applicant state.",
      "There are no analytics pixels and no advertising cookies.",
    ],
  },
};

export default function LegalPage({ variant }: { variant: Variant }) {
  const doc = COPY[variant];
  return (
    <PageLayout title={doc.title}>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-4xl font-semibold">{doc.title}</h1>
        <div className="mt-8 space-y-4 text-go-muted">
          {doc.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageLayout>
  );
}
