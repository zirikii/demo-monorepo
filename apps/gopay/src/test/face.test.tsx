import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FaceScreen } from "@/components/screens/FaceScreen";
import { SessionProvider } from "@/hooks/useSession";

const originalMediaDevices = Object.getOwnPropertyDescriptor(navigator, "mediaDevices");

function renderFace() {
  return render(
    <MemoryRouter initialEntries={["/fr"]}>
      <SessionProvider>
        <Routes>
          <Route path="/fr" element={<FaceScreen />} />
          <Route path="/onboarding" element={<p>Onboarding reached</p>} />
        </Routes>
      </SessionProvider>
    </MemoryRouter>,
  );
}

function setMediaDevices(getUserMedia: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: { getUserMedia },
  });
}

function mockCamera() {
  const stop = vi.fn();
  const stream = { getTracks: () => [{ stop }] } as unknown as MediaStream;
  const getUserMedia = vi.fn().mockResolvedValue(stream);
  setMediaDevices(getUserMedia);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  return { getUserMedia, stop, stream };
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  if (originalMediaDevices) {
    Object.defineProperty(navigator, "mediaDevices", originalMediaDevices);
  } else {
    Reflect.deleteProperty(navigator, "mediaDevices");
  }
});

describe("face verification camera", () => {
  it("turns on the camera immediately and waits for the capture CTA", async () => {
    const user = userEvent.setup();
    const { getUserMedia, stop } = mockCamera();

    renderFace();

    expect(getUserMedia).toHaveBeenCalledWith({
      video: { facingMode: "user" },
      audio: false,
    });

    const capture = await screen.findByRole("button", { name: "Capture photo" });
    expect(capture).toBeEnabled();

    await new Promise((resolve) => window.setTimeout(resolve, 1_000));
    expect(screen.getByRole("button", { name: "Capture photo" })).toBeInTheDocument();

    await user.click(capture);
    expect(screen.getByText("Checking your photo")).toBeInTheDocument();

    expect(
      await screen.findByText("Onboarding reached", undefined, { timeout: 2_000 }),
    ).toBeInTheDocument();
    await waitFor(() => expect(stop).toHaveBeenCalled());
  });

  it("shows a retry action when camera permissions fail", async () => {
    const stop = vi.fn();
    const stream = { getTracks: () => [{ stop }] } as unknown as MediaStream;
    const getUserMedia = vi
      .fn()
      .mockRejectedValueOnce(new Error("denied"))
      .mockResolvedValueOnce(stream);
    setMediaDevices(getUserMedia);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const user = userEvent.setup();

    renderFace();

    expect(await screen.findByText(/could not turn on your camera/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try camera again" }));

    expect(await screen.findByRole("button", { name: "Capture photo" })).toBeEnabled();
    expect(getUserMedia).toHaveBeenCalledTimes(2);
  });
});
