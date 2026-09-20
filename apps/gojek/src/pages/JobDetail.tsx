import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bookmark, BookmarkCheck, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { FeatureList } from "@/components/marketing/FeatureList";
import { JobCard } from "@/components/marketing/JobCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findJob } from "@/data/jobs";
import { useAuth } from "@/hooks/useAuth";
import { hasApplied, isRoleSaved, submitApplication, toggleSavedRole } from "@/lib/applications";
import { formatDate } from "@/lib/format";
import { relatedJobs } from "@/lib/jobs";

const applicationSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email address"),
  coverNote: z.string().min(20, "A couple of sentences is plenty — at least 20 characters"),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? findJob(slug) : undefined;
  const { user } = useAuth();

  const [saved, setSaved] = useState(() => (slug ? isRoleSaved(slug) : false));
  const [applied, setApplied] = useState(() => (slug ? hasApplied(slug) : false));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      coverNote: "",
    },
  });

  if (!job) return <Navigate to="/join-us" replace />;

  const related = relatedJobs(job);

  async function onSubmit(values: ApplicationValues) {
    if (!job) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
    submitApplication(job.slug, values.coverNote);
    setApplied(true);
  }

  return (
    <PageLayout title={job.title}>
      <section className="bg-night text-white">
        <div className="container-go-wide flex flex-col gap-8 py-14 sm:py-16 lg:py-20">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Join us", to: "/join-us" },
              { label: job.title },
            ]}
          />

          <div className="animate-go-rise flex flex-col gap-5">
            <h1 className="display-go max-w-3xl text-4xl sm:text-5xl">{job.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge tone="inverse">{job.team}</Badge>
              <Badge tone="inverse">{job.location}</Badge>
              <Badge tone="inverse">{job.type}</Badge>
              <Badge tone="inverse">{job.level}</Badge>
            </div>
            <p className="max-w-2xl text-lg text-white/70">{job.summary}</p>
            <p className="text-sm text-white/50">Posted {formatDate(job.postedOn)}</p>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="focus-go inline-flex h-11 items-center justify-center rounded-full bg-go-green px-6 text-[0.95rem] font-bold text-white transition hover:bg-go-green-dark"
              >
                Apply for this role
              </a>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                aria-pressed={saved}
                onClick={() => setSaved(toggleSavedRole(job.slug).includes(job.slug))}
              >
                {saved ? (
                  <BookmarkCheck aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Bookmark aria-hidden="true" className="h-4 w-4" />
                )}
                {saved ? "Saved" : "Save role"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section width="wide">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                What you will do
              </h2>
              <FeatureList items={job.responsibilities} />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                What we are looking for
              </h2>
              <FeatureList items={job.requirements} />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                Tools and stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <Badge key={tech} tone="neutral">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div
            id="apply"
            className="rounded-go-lg border border-line bg-surface-tint p-6 lg:sticky lg:top-24"
          >
            {applied ? (
              <div className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-go-green text-white">
                  <Check aria-hidden="true" className="h-5 w-5" />
                </span>
                <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
                  Application received
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft">
                  It is saved in this browser only. Track its progress, and the two others already
                  in flight, from the candidate hub.
                </p>
                <Link
                  to="/hub"
                  className="focus-go inline-flex h-11 w-fit items-center rounded-full bg-go-green px-6 text-[0.95rem] font-bold text-white transition hover:bg-go-green-dark"
                >
                  Open candidate hub
                </Link>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
                    Apply for this role
                  </h2>
                  <p className="text-sm text-ink-soft">
                    Demo mode: nothing is transmitted. Your application is stored in this browser so
                    the candidate hub has something to show.
                  </p>
                </div>

                <TextField label="Full name" error={errors.name?.message} {...register("name")} />
                <TextField
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  {...register("email")}
                />
                <TextAreaField
                  label="Why this team?"
                  hint="Two or three sentences is plenty."
                  error={errors.coverNote?.message}
                  {...register("coverNote")}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Submitting
                    </>
                  ) : (
                    "Submit application"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="tint" width="wide">
          <SectionHeading eyebrow="Similar roles" title="You might also look at these" />
          <div className="mt-10 flex flex-col gap-4">
            {related.map((entry) => (
              <JobCard key={entry.slug} job={entry} />
            ))}
          </div>
        </Section>
      ) : null}
    </PageLayout>
  );
}
