const USER_CAMERA: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: { ideal: "user" },
    width: { ideal: 720 },
    height: { ideal: 720 },
  },
};

const ANY_CAMERA: MediaStreamConstraints = {
  audio: false,
  video: true,
};

function isPermissionError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" || error.name === "PermissionDeniedError")
  );
}

export async function requestUserCamera(): Promise<MediaStream> {
  const devices = navigator.mediaDevices;
  if (!devices?.getUserMedia) {
    throw new Error("Camera is not supported in this browser");
  }
  try {
    return await devices.getUserMedia(USER_CAMERA);
  } catch (error) {
    if (isPermissionError(error)) throw error;
    return devices.getUserMedia(ANY_CAMERA);
  }
}

export function releaseStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => track.stop());
}

export async function attachStream(video: HTMLVideoElement, stream: MediaStream): Promise<void> {
  video.srcObject = stream;
  try {
    await video.play();
  } catch {
    // Autoplay can reject before the element is visible. The muted playsInline
    // attributes still let the preview paint once the browser allows it.
  }
}
