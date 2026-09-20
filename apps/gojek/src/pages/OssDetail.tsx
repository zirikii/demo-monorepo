import { Link, Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { getOss } from "@/data/oss";

export default function OssDetailPage() {
  const { slug } = useParams();
  const project = slug ? getOss(slug) : undefined;
  if (!project) return <Navigate to="/open-source" replace />;

  return (
    <PageLayout title={project.name}>
      <article className="mx-auto max-w-3xl px-4 py-20">
        <Link to="/open-source" className="text-sm text-go-green hover:underline">
          Open source
        </Link>
        <p className="mt-6 text-xs tracking-[0.16em] text-go-faint uppercase">
          {project.language} · {project.stars} stars
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">{project.name}</h1>
        <p className="mt-6 text-2xl text-go-muted">{project.tagline}</p>
        <p className="mt-6 text-lg text-go-muted">{project.summary}</p>
      </article>
    </PageLayout>
  );
}
