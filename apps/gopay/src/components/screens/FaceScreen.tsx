import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { CONFIRM_TOAST } from "@/data/identity";
import { Phone, PrimaryButton, StatusBar } from "@/components/chrome/Chrome";
import { useSession } from "@/hooks/useSession";
import { confirmUnchanged } from "@/lib/kyc";

export function FaceScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = params.get("intent") === "confirm" ? "confirm" : "update";
  const { scenario, account, setAccount, showToast, setGenie, frRemaining, setFrRemaining } =
    useSession();
  const [sheet, setSheet] = useState(true);
  const [scanning, setScanning] = useState(false);

  function finish(passed: boolean) {
    setScanning(false);
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

  function start() {
    setSheet(false);
    setScanning(true);
    window.setTimeout(() => {
      finish(scenario !== "fr-fail");
    }, 1200);
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
        <p className="absolute inset-x-6 top-4 text-center text-[18px] font-bold text-white">
          Fit your face in the photo area
        </p>
        <div className="size-64 rounded-full border-4 border-white/80 bg-gradient-to-b from-[#3a4148] to-[#121416]" />
        {scanning ? (
          <p className="absolute bottom-6 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[14px] font-bold text-white">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Hold still. Your e-KTP is ready
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
          <PrimaryButton className="mt-4" onClick={start}>
            Got it, I’m ready
          </PrimaryButton>
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
