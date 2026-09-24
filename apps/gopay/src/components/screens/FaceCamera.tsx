import { useEffect, useRef, useState } from "react";
import { attachStream, releaseStream, requestUserCamera } from "@/lib/faceCamera";

type CameraStatus = "starting" | "live" | "unavailable";

export function FaceCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus>("starting");

  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;

    requestUserCamera()
      .then(async (next) => {
        if (cancelled) {
          releaseStream(next);
          return;
        }
        stream = next;
        const video = videoRef.current;
        if (video) await attachStream(video, next);
        if (!cancelled) setStatus("live");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
      releaseStream(stream);
    };
  }, []);

  return (
    <div className="relative size-64 overflow-hidden rounded-full border-4 border-white/80 bg-camera">
      <video
        ref={videoRef}
        data-testid="face-camera"
        className={`size-full object-cover [transform:scaleX(-1)] ${status === "live" ? "" : "invisible"}`}
        autoPlay
        playsInline
        muted
        aria-label="Face verification camera"
      />
      {status === "live" ? (
        <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[11px] font-bold text-white">
          <span className="size-2 rounded-full bg-gopay" aria-hidden="true" />
          Live
        </span>
      ) : (
        <p
          role="status"
          className="absolute inset-0 flex items-center justify-center px-6 text-center text-[13px] font-bold leading-4 text-white"
        >
          {status === "starting"
            ? "Starting camera…"
            : "Camera unavailable. You can still continue."}
        </p>
      )}
      {status === "live" ? (
        <p className="sr-only" role="status">
          Camera is on
        </p>
      ) : null}
    </div>
  );
}
