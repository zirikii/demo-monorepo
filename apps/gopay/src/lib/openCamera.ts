const USER_FACING: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: "user" },
};

const ANY_CAMERA: MediaStreamConstraints = {
  audio: false,
  video: true,
};

function defaultRequest(constraints: MediaStreamConstraints): Promise<MediaStream> {
  const media = navigator.mediaDevices;
  if (!media || typeof media.getUserMedia !== "function") {
    return Promise.reject(new Error("This browser has no camera API."));
  }
  return media.getUserMedia(constraints);
}

function constraintRejected(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "OverconstrainedError" || error.name === "NotFoundError")
  );
}

export async function openUserCamera(
  request: (constraints: MediaStreamConstraints) => Promise<MediaStream> = defaultRequest,
): Promise<MediaStream> {
  try {
    return await request(USER_FACING);
  } catch (error) {
    // Desktop webcams often reject a user-facing constraint even when a camera
    // exists. Permission and device-busy errors must not open a second prompt.
    if (!constraintRejected(error)) throw error;
    return request(ANY_CAMERA);
  }
}

export async function showCameraPreview(
  video: HTMLVideoElement,
  stream: MediaStream,
): Promise<void> {
  video.srcObject = stream;
  // React's muted attribute does not reliably set the DOM property, so desktop
  // autoplay stays blocked and the preview remains a black frame.
  video.muted = true;
  video.playsInline = true;
  await video.play();
}

export function stopCamera(stream: MediaStream | null): void {
  if (!stream) return;
  for (const track of stream.getTracks()) track.stop();
}

export function cameraErrorMessage(error: unknown): string {
  const name = error instanceof DOMException ? error.name : "";
  switch (name) {
    case "NotAllowedError":
      return "Camera permission is blocked. Allow it for this site, then retry.";
    case "SecurityError":
      return "The camera only starts on a secure page (https or localhost).";
    case "NotFoundError":
      return "No camera was found on this computer.";
    case "NotReadableError":
      return "The camera is in use by another app.";
    case "OverconstrainedError":
      return "This computer's camera could not be opened.";
    default:
      return "The camera didn't start. Retry, or check the browser's camera permission.";
  }
}
