import { Link } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { getProductApp } from "@/data/apps";
import { formatDate } from "@/lib/format";
import { readVideos } from "@/lib/loom";

const APP = getProductApp("loom");
const NAV = [{ label: "Library", to: "/loom", end: true }];

export default function LoomLibraryPage() {
  const videos = readVideos();

  return (
    <ProductLayout app={APP} title="Library · Loom" nav={NAV}>
      <h1 className="text-2xl font-extrabold text-ink-strong">Library</h1>
      <p className="mt-1 text-sm text-ink-soft">Northline async video</p>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {videos.map((video) => (
          <li key={video.id}>
            <Link
              to={`/loom/${video.id}`}
              className="focus-atl flex h-full flex-col gap-2 rounded-atl-sm border border-line bg-white p-4 hover:shadow-atl"
            >
              <span className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
                {video.duration} · {video.watched ? "Watched" : "Unwatched"}
              </span>
              <span className="text-lg font-bold text-ink-strong">{video.title}</span>
              <span className="text-sm text-ink-soft">
                {video.author} · {formatDate(video.recordedOn)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ProductLayout>
  );
}
