import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { OSS_PROJECTS } from "@/data/oss";
import { SITE } from "@/data/site";
import type { OssLanguage } from "@/data/types";

const LANGUAGES: Array<OssLanguage | "all"> = ["all", "Go", "Clojure", "Ruby", "Java", "Kotlin", "TypeScript"];

export default function OpenSourcePage() {
  const [language, setLanguage] = useState<OssLanguage | "all">("all");
  const projects = useMemo(
    () => OSS_PROJECTS.filter((project) => language === "all" || project.language === language),
    [language],
  );

  return (
    <PageLayout title="Open source">
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{SITE.ossHeading}</h1>
        <p className="mt-5 max-w-3xl text-lg text-go-muted">{SITE.ossBody}</p>
        <label className="mt-8 block max-w-xs text-sm">
          <span className="mb-1 block text-go-faint">Language</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as OssLanguage | "all")}
            className="w-full rounded-go border border-go-line bg-go-card px-3 py-2"
          >
            {LANGUAGES.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All languages" : item}
              </option>
            ))}
          </select>
        </label>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/open-source/${project.slug}`}
                className="focus-go block rounded-go-lg border border-white/8 bg-go-card p-6 hover:border-white/20"
              >
                <p className="text-xs text-go-faint">
                  {project.language} · {project.stars} stars
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{project.name}</h2>
                <p className="mt-2 text-sm text-go-muted">{project.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  );
}
