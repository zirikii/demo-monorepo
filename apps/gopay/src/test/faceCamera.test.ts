import { afterEach, describe, expect, it, vi } from "vitest";
import { attachStream, releaseStream, requestUserCamera } from "@/lib/faceCamera";

function track() {
  return { stop: vi.fn(), kind: "video" } as unknown as MediaStreamTrack;
}

function streamOf(videoTrack: MediaStreamTrack): MediaStream {
  return { getTracks: () => [videoTrack] } as unknown as MediaStream;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("requestUserCamera", () => {
  it("asks for a muted user-facing camera", async () => {
    const videoTrack = track();
    const getUserMedia = vi.fn().mockResolvedValue(streamOf(videoTrack));
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });

    await expect(requestUserCamera()).resolves.toBeDefined();
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(getUserMedia).toHaveBeenCalledWith({
      audio: false,
      video: {
        facingMode: { ideal: "user" },
        width: { ideal: 720 },
        height: { ideal: 720 },
      },
    });
  });

  it("retries with any camera when the facing-mode request fails", async () => {
    const videoTrack = track();
    const getUserMedia = vi
      .fn()
      .mockRejectedValueOnce(new DOMException("missing", "NotFoundError"))
      .mockResolvedValueOnce(streamOf(videoTrack));
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });

    await requestUserCamera();
    expect(getUserMedia).toHaveBeenNthCalledWith(2, { audio: false, video: true });
  });

  it("does not open a second camera after permission is denied", async () => {
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });

    await expect(requestUserCamera()).rejects.toThrow(/denied/);
    expect(getUserMedia).toHaveBeenCalledTimes(1);
  });

  it("fails when the browser has no media devices", async () => {
    vi.stubGlobal("navigator", {});
    await expect(requestUserCamera()).rejects.toThrow(/not supported/);
  });
});

describe("stream helpers", () => {
  it("stops every track", () => {
    const videoTrack = track();
    releaseStream(streamOf(videoTrack));
    expect(videoTrack.stop).toHaveBeenCalledOnce();
  });

  it("attaches the stream and starts playback", async () => {
    const video = document.createElement("video");
    const play = vi.fn().mockResolvedValue(undefined);
    video.play = play;
    const media = streamOf(track());

    await attachStream(video, media);
    expect(video.srcObject).toBe(media);
    expect(play).toHaveBeenCalledOnce();
  });
});
