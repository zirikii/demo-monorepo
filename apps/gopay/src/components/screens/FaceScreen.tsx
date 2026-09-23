import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { CONFIRM_TOAST } from "@/data/identity";
import { Phone, PrimaryButton, StatusBar } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { cn } from "@/lib/cn";
import { confirmUnchanged } from "@/lib/kyc";

type CameraState = "starting" | "ready" | "error" | "unsupported";

const CAPTURE_DELAY_MS = 1200;

function stopCamera(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

export function FaceScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = params.get("intent") === "confirm" ? "confirm" : "update";
  const { scenario, account, setAccount, showToast, setGenie, frRemaining, setFrRemaining } =
    useSession();
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureTimerRef = useRef<number | null>(null);
  const [sheet, setSheet] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [cameraRequest, setCameraRequest] = useState(0);
  const [cameraState, setCameraState] = useState<CameraState>("starting");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;
    const video = videoRef.current;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("unsupported");
        setCameraError("Camera access is not available in this browser.");
        return;
      }

      setCameraState("starting");
      setCameraError(null);
      setCapturedFrame(null);

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (cancelled) {
          stopCamera(stream);
          return;
        }

        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => undefined);
        }

        setCameraState("ready");
      } catch {
        if (!cancelled) {
          setCameraState("error");
          setCameraError("We could not turn on your camera. Check permissions and try again.");
        }
      }
    }

    void startCamera();

    return () => {
      cancelled = true;
      stopCamera(stream);
      if (video) {
        video.srcObject = null;
      }
    };
  }, [cameraRequest]);

  useEffect(() => {
    return () => {
      if (captureTimerRef.current !== null) {
        window.clearTimeout(captureTimerRef.current);
      }
    };
  }, []);

  function finish(passed: boolean) {
    captureTimerRef.current = null;
    setCapturing(false);
    if (!passed) {
      const left = frRemaining - 1;
      setFrRemaining(left);
      navigate(left <= 0 ? "/fr/locked" : `/fr/fail?intent=${intent}`);
      return;
    }
    setFrRemaining(3);
    if (intent === "confirm") {
      const result = confirmUnchanged(account, new Date());
      if (result.ok) {
        setAccount(result.value);
        showToast(CONFIRM_TOAST);
        setGenie(null);
        navigate("/account");
      }
      return;
    }
    navigate("/onboarding");
  }

  function capturePhoto() {
    if (cameraState !== "ready" || capturing) return;

    const video = videoRef.current;
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedFrame(canvas.toDataURL("image/jpeg", 0.86));
      }
    }

    setSheet(false);
    setCapturing(true);
    captureTimerRef.current = window.setTimeout(() => {
      finish(scenario !== "fr-fail");
    }, CAPTURE_DELAY_MS);
  }

  function retryCamera() {
    setCameraRequest((value) => value + 1);
  }

  return (
    <Phone className="bg-camera text-white">
      <StatusBar dark />
      <div className="flex items-center justify-between px-4">
        <button type="button" aria-label="Back" className="text-[14px] font-bold text-white" onClick={() => navigate("/review")}>
          Back
        </button>
        <button type="button" className="text-[14px] font-bold text-white" onClick={() => setSheet(true)}>
          View Guides
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center"
        data-testid="face-preview"
      >
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover",
            capturedFrame ? "opacity-0" : "opacity-100",
          )}
          aria-label="Live face camera preview"
          autoPlay
          muted
          playsInline
        />
        {capturedFrame ? (
          <img
            src={capturedFrame}
            alt="Captured face preview"
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/20" />
        <p className="absolute inset-x-6 top-4 text-center text-[18px] font-bold text-white">
          Fit your face in the photo area
        </p>
        <div className="relative size-64 rounded-full border-4 border-white/80 shadow-[0_0_0_999px_rgba(0,0,0,0.18)]" />
        {cameraState === "starting" ? (
          <p className="absolute bottom-6 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[14px] font-bold text-white">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Turning on camera
          </p>
        ) : null}
        {cameraError ? (
          <p className="absolute bottom-6 mx-6 rounded-2xl bg-white/90 px-4 py-3 text-center text-[13px] font-bold leading-5 text-ink">
            {cameraError}
          </p>
        ) : null}
        {capturing ? (
          <p className="absolute bottom-6 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[14px] font-bold text-white">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Checking your photo
          </p>
        ) : null}
      </div>
      {sheet ? (
        <div className="shrink-0 rounded-t-[20px] border border-line bg-card-2 px-4 py-6 text-ink shadow-[inset_0_2px_1px_rgba(255,255,255,0.7)]">
          <h2 className="text-center font-serif text-[21px] font-semibold leading-7">
            Get ready for face verification
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-[20px] border border-line bg-page px-3 py-4 text-center text-[12px] leading-4 text-body">
            <p>Enough lighting</p>
            <p>No glasses</p>
            <p>
              Don’t wear
              <br />
              hat
            </p>
          </div>
          <PrimaryButton
            className="mt-4"
            disabled={cameraState !== "ready" || capturing}
            onClick={capturePhoto}
          >
            {cameraState === "ready" ? "Capture photo" : "Turning on camera"}
          </PrimaryButton>
          {cameraState === "error" || cameraState === "unsupported" ? (
            <button
              type="button"
              className="mt-3 w-full text-center text-[14px] font-bold text-gopay-ink"
              onClick={retryCamera}
            >
              Try camera again
            </button>
          ) : null}
        </div>
      ) : null}
    </Phone>
  );
}

export function FaceFailScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = params.get("intent") === "confirm" ? "confirm" : "update";
  const { frRemaining } = useSession();
  return (
    <Phone>
      <div className="h-36 bg-gradient-to-b from-[#b7e7bc] to-page" />
      <div className="absolute inset-x-0 top-0">
        <StatusBar />
        <div className="px-4 text-[18px] font-bold text-ink">Verify with GoPay</div>
      </div>
      <div className="relative mx-4 -mt-8 rounded-[20px] bg-card px-5 pb-5 pt-14 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
        <div className="absolute left-1/2 top-0 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-error bg-card text-2xl">
          !
        </div>
        <h2 className="font-serif text-[24px] font-semibold leading-9">Couldn&apos;t verify your face</h2>
        <p className="mt-1 text-[14px] leading-5 text-body">
          We couldn&apos;t recognize your face. Please make sure you meet the guidelines.
        </p>
        <div className="mt-5 space-y-3 text-left">
          <Guide title="Photo has to be well-lit" body="Find a place with enough lighting (not too dark or too bright)." />
          <Guide title="Face has to be clearly visible" body="Don’t wear mask, hat, or any kind of glasses." />
        </div>
      </div>
      <div className="mt-auto bg-card px-4 pb-6 pt-4">
        <p className="mb-3 text-center text-[12px] text-body">{frRemaining} attempts left</p>
        <button
          type="button"
          className="h-11 w-full rounded-full bg-gopay text-[16px] font-bold text-paper"
          onClick={() => navigate(`/fr?intent=${intent}`)}
        >
          Retry face verification
        </button>
        <button
          type="button"
          className="mt-3 h-11 w-full rounded-full border border-gopay text-[16px] font-bold text-gopay-ink"
          onClick={() => navigate("/help")}
        >
          Need help?
        </button>
      </div>
    </Phone>
  );
}

function Guide({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-line-2 pt-3">
      <p className="text-[14px] font-bold">{title}</p>
      <p className="text-[13px] leading-4 text-body">{body}</p>
    </div>
  );
}

export function FaceLockedScreen() {
  const navigate = useNavigate();
  return (
    <Phone>
      <StatusBar />
      <div className="flex flex-1 flex-col justify-end px-6 pb-8">
        <h2 className="font-serif text-[24px] font-semibold leading-9">Way too many attempts</h2>
        <p className="mt-2 text-[14px] leading-5 text-body">
          Face verification is paused. Your e-KTP on file is unchanged, and GoPay Plus stays as it
          is.
        </p>
        <button
          type="button"
          className="mt-6 h-11 rounded-full bg-gopay text-[16px] font-bold text-paper"
          onClick={() => navigate("/help")}
        >
          Need help?
        </button>
        <button
          type="button"
          className="mt-3 h-11 rounded-full border border-gopay text-[16px] font-bold text-gopay-ink"
          onClick={() => navigate("/account")}
        >
          Back to Account Center
        </button>
      </div>
    </Phone>
  );
}
