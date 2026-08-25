import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductLayout } from "@/components/product/ProductLayout";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getProductApp } from "@/data/apps";
import type { LoomVideo } from "@/data/loom";
import { formatDate } from "@/lib/format";
import { getStoredVideo, markVideoWatched } from "@/lib/loom";

const APP = getProductApp("loom");
const NAV = [{ label: "Library", to: "/loom", end: true }];

export default function LoomWatchPage() {
  const { id = "" } = useParams();
  const stored = getStoredVideo(id);

  if (!stored) {
    return (
      <ProductLayout app={APP} title="Video not found" nav={NAV}>
        <div className="mx-auto max-w-lg rounded-atl-sm border border-line bg-white p-8 text-center">
          <h1 className="text-xl font-extrabold text-ink-strong">Video not found</h1>
          <ButtonLink to="/loom" shape="box" className="mt-6">
            Back to library
          </ButtonLink>
        </div>
      </ProductLayout>
    );
  }

  return <WatchDetail video={stored} />;
}

function WatchDetail({ video: initial }: { video: LoomVideo }) {
  const [video, setVideo] = useState(initial);
  const [copied, setCopied] = useState(false);

  return (
    <ProductLayout app={APP} title={`${video.title} · Loom`} nav={NAV}>
      <article className="mx-auto max-w-3xl rounded-atl-sm border border-line bg-white p-6">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">
          {video.duration} · {video.author} · {formatDate(video.recordedOn)}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink-strong">{video.title}</h1>
        <p
          className="mt-4 rounded-atl bg-surface-deep px-4 py-8 text-center text-sm text-ink-faint"
          aria-label="Video player"
        >
          Demo player — transcript below.
        </p>
        <h2 className="mt-6 text-sm font-extrabold text-ink-strong">Transcript</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{video.transcript}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            shape="box"
            onClick={() => {
              const next = markVideoWatched(video.id, true).find((item) => item.id === video.id);
              if (next) setVideo(next);
            }}
          >
            {video.watched ? "Watched" : "Mark as watched"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            shape="box"
            onClick={async () => {
              const share = `${window.location.origin}${window.location.pathname}`;
              try {
                await navigator.clipboard.writeText(share);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Link copied" : "Copy share link"}
          </Button>
        </div>
      </article>
    </ProductLayout>
  );
}
