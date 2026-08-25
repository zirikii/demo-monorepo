import { LOOM_VIDEOS, type LoomVideo } from "@/data/loom";
import { readCollection, writeCollection } from "./store";

const KEY = "atlassian-demo-looms";

function normalize(video: LoomVideo): LoomVideo {
  return { ...video };
}

export function readVideos(): LoomVideo[] {
  return readCollection(KEY, LOOM_VIDEOS).map(normalize);
}

export function writeVideos(videos: LoomVideo[]): void {
  writeCollection(KEY, videos.map(normalize));
}

export function getStoredVideo(id: string): LoomVideo | undefined {
  return readVideos().find((video) => video.id === id);
}

export function markVideoWatched(id: string, watched = true): LoomVideo[] {
  const next = readVideos().map((video) => (video.id === id ? { ...video, watched } : video));
  writeVideos(next);
  return next;
}
