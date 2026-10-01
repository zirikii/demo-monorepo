import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { FaceScreen } from "@/components/screens/FaceScreen";
import { SessionProvider } from "@/hooks/useSession";

function fakeStream(): MediaStream {
  const track = { stop: vi.fn() } as unknown as MediaStreamTrack;
  return { getTracks: () => [track] } as unknown as MediaStream;
}

function renderFace() {
  return render(
    <MemoryRouter initialEntries={["/fr?intent=update"]}>
      <SessionProvider>
        <Routes>
          <Route path="/fr" element={<FaceScreen />} />
          <Route path="/onboarding" element={<h1>Update onboarding</h1>} />
        </Routes>
      </SessionProvider>
    </MemoryRouter>,
  );
}

describe("face verification camera", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLVideoElement.prototype, "play", {
      configurable: true,
      value: vi.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(HTMLVideoElement.prototype, "videoWidth", {
      configurable: true,
      get: () => 640,
    });
    Object.defineProperty(HTMLVideoElement.prototype, "videoHeight", {
      configurable: true,
      get: () => 480,
    });
  });

  it("shows the desktop camera in the photo area and captures on the CTA", async () => {
    const user = userEvent.setup();
    const live = fakeStream();
    const getUserMedia = vi.fn().mockResolvedValue(live);
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: { getUserMedia },
    });

    renderFace();

    const preview = await screen.findByTestId("face-camera");
    await waitFor(() => expect(preview).toHaveProperty("srcObject", live));
    expect(getUserMedia).toHaveBeenCalledWith({
      audio: false,
      video: { facingMode: "user" },
    });

    const capture = await screen.findByRole("button", { name: "Capture photo" });
    expect(capture).toBeEnabled();
    await user.click(capture);
    expect(await screen.findByRole("heading", { name: "Update onboarding" })).toBeInTheDocument();
  });

  it("explains a blocked camera instead of pretending a face was captured", async () => {
    const user = userEvent.setup();
    const getUserMedia = vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError"));
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: { getUserMedia },
    });

    renderFace();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Camera permission is blocked. Allow it for this site, then retry.",
    );
    expect(screen.queryByRole("heading", { name: "Update onboarding" })).not.toBeInTheDocument();

    getUserMedia.mockResolvedValue(fakeStream());
    await user.click(screen.getByRole("button", { name: "Retry camera" }));
    const capture = await screen.findByRole("button", { name: "Capture photo" });
    expect(capture).toBeEnabled();
    expect(getUserMedia).toHaveBeenCalledTimes(2);
  });
});
