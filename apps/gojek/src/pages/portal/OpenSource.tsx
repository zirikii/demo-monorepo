import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { OSS_PROJECTS } from "@/data/oss";
import { readWatchedOss, toggleWatchedOss } from "@/lib/applications";

export default function PortalOpenSourcePage() {
  const [watched, setWatched] = useState(readWatchedOss);

  return (
    <PortalLayout title="Open source watchlist">
      <h1 className="text-3xl font-semibold">Open source watchlist</h1>
      <p className="mt-2 text-sm text-go-muted">Toggle the repos you would mention in a take-home README.</p>
      <ul className="mt-8 divide-y divide-white/8">
        {OSS_PROJECTS.map((project) => {
          const on = watched.includes(project.slug);
          return (
            <li key={project.slug} className="flex items-center justify-between gap-4 py-4">
              <div>
                <Link to={`/open-source/${project.slug}`} className="font-semibold hover:text-go-green">
                  {project.name}
                </Link>
                <p className="text-sm text-go-faint">{project.language}</p>
              </div>
              <Button
                variant={on ? "primary" : "secondary"}
                size="sm"
                onClick={() => setWatched(toggleWatchedOss(project.slug))}
              >
                {on ? "Watching" : "Watch"}
              </Button>
            </li>
          );
        })}
      </ul>
    </PortalLayout>
  );
}
