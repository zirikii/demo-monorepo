import { Link } from "react-router-dom";
import { featuredOss } from "@/data/oss";
import { SITE } from "@/data/site";

export function OssGrid() {
  return (
    <section className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">{SITE.ossHeading}</h2>
        <p className="mt-5 max-w-3xl text-lg text-go-muted">{SITE.ossBody}</p>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredOss().map((project) => (
            <li key={project.slug}>
              <Link
                to={`/open-source/${project.slug}`}
                className="focus-go flex h-full flex-col rounded-go-lg border border-white/8 bg-go-card p-6 hover:border-white/20"
              >
                <p className="text-xs tracking-[0.16em] text-go-faint uppercase">{project.language}</p>
                <h3 className="mt-3 text-xl font-semibold">{project.name}</h3>
                <p className="mt-2 flex-1 text-sm text-go-muted">{project.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/open-source" className="mt-8 inline-flex text-sm text-go-green hover:underline">
          See every public project
        </Link>
      </div>
    </section>
  );
}
