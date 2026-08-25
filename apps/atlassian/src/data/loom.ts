export interface LoomVideo {
  id: string;
  title: string;
  author: string;
  duration: string;
  watched: boolean;
  recordedOn: string;
  transcript: string;
}

export const LOOM_VIDEOS: LoomVideo[] = [
  {
    id: "sprint-24-demo",
    title: "Sprint 24 demo walkthrough",
    author: "Maya Chen",
    duration: "4:12",
    watched: false,
    recordedOn: "2026-08-19",
    transcript:
      "PORTAL-142 is the partner onboarding path. PORTAL-161 is still in review — Safari paints two login banners. Goal is still account microsite v2.",
  },
  {
    id: "safari-repro",
    title: "Safari banner repro",
    author: "Nadia Fischer",
    duration: "1:48",
    watched: false,
    recordedOn: "2026-08-20",
    transcript:
      "On Safari 18 the banner from BannerEnabled and bannerEnabled both render. Chrome only shows one. Attached to PORTAL-161.",
  },
  {
    id: "partner-tour",
    title: "Partner onboarding tour",
    author: "Priya Raman",
    duration: "6:05",
    watched: true,
    recordedOn: "2026-08-12",
    transcript:
      "Partners should never see the consumer wizard. The 300k-account path writes the same account record.",
  },
];

export function getLoomVideo(id: string, videos = LOOM_VIDEOS): LoomVideo | undefined {
  return videos.find((video) => video.id === id);
}
