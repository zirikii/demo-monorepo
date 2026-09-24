import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FaceScreen } from "@/components/screens/FaceScreen";
import { SessionProvider } from "@/hooks/useSession";

function renderFace() {
  return render(
    <MemoryRouter initialEntries={["/fr?intent=update"]}>
      <SessionProvider>
        <FaceScreen />
      </SessionProvider>
    </MemoryRouter>,
  );
}

function installCamera(getUserMedia: ReturnType<typeof vi.fn>) {
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });
  HTMLVideoElement.prototype.play = vi.fn().mockResolvedValue(undefined);
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("face verification camera", () => {
  it("shows the live camera inside the face preview", async () => {
    const stop = vi.fn();
    const media = {
      getTracks: () => [{ stop, kind: "video" }],
    } as unknown as MediaStream;
    installCamera(vi.fn().mockResolvedValue(media));

    renderFace();

    const video = await screen.findByLabelText("Face verification camera");
    await waitFor(() => expect(video).toHaveProperty("srcObject", media));
    expect(await screen.findByRole("status")).toHaveTextContent("Camera is on");
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("Fit your face in the photo area")).toBeInTheDocument();
  });

  it("keeps the check available when the camera cannot start", async () => {
    const user = userEvent.setup();
    installCamera(vi.fn().mockRejectedValue(new DOMException("denied", "NotAllowedError")));

    renderFace();

    expect(
      await screen.findByText("Camera unavailable. You can still continue."),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Got it, I’m ready" }));
    expect(screen.getByText("Hold still. Your e-KTP is ready")).toBeInTheDocument();
  });
});
