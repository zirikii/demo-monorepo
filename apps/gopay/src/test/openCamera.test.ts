import { describe, expect, it, vi } from "vitest";
import { openUserCamera, showCameraPreview } from "@/lib/openCamera";

function stream(): MediaStream {
  const track = { stop: vi.fn() } as unknown as MediaStreamTrack;
  return { getTracks: () => [track] } as unknown as MediaStream;
}

describe("openUserCamera", () => {
  it("asks for the user-facing camera first", async () => {
    const request = vi.fn().mockResolvedValue(stream());
    await openUserCamera(request);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      audio: false,
      video: { facingMode: "user" },
    });
  });

  it("falls back to any camera when a desktop webcam rejects the user-facing constraint", async () => {
    const desktop = stream();
    const request = vi
      .fn()
      .mockRejectedValueOnce(new DOMException("facingMode", "OverconstrainedError"))
      .mockResolvedValueOnce(desktop);

    await expect(openUserCamera(request)).resolves.toBe(desktop);
    expect(request).toHaveBeenNthCalledWith(2, { audio: false, video: true });
  });

  it("does not open a second prompt when permission is denied", async () => {
    const request = vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    await expect(openUserCamera(request)).rejects.toMatchObject({ name: "NotAllowedError" });
    expect(request).toHaveBeenCalledTimes(1);
  });
});

describe("showCameraPreview", () => {
  it("mutes the element before play so desktop autoplay can show the picture", async () => {
    const video = document.createElement("video");
    const play = vi.fn().mockImplementation(function (this: HTMLVideoElement) {
      expect(this.muted).toBe(true);
      expect(this.playsInline).toBe(true);
      return Promise.resolve();
    });
    video.play = play;
    const live = stream();

    await showCameraPreview(video, live);

    expect(video.srcObject).toBe(live);
    expect(play).toHaveBeenCalledOnce();
  });
});
