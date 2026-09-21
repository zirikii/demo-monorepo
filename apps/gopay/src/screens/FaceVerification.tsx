import { Fragment, useEffect, useState, type ReactNode } from "react";
import { Screen } from "@/components/system/PhoneFrame";
import { StatusBar } from "@/components/system/StatusBar";
import { FaceViewfinder } from "@/components/flow/FaceViewfinder";
import { Button } from "@/components/ui/Button";
import { FACE_ATTEMPT_LIMIT, useRekyc } from "@/hooks/useRekyc";

const A = "/figma";

const TIPS = [
  { icon: `${A}/spot-tips.svg`, label: "Enough lighting" },
  { icon: `${A}/spot-no-glasses.svg`, label: "No glasses" },
  { icon: `${A}/spot-no-hat.svg`, label: "Don’t wear hat" },
];

/** On-demand FR gate shown before any capture screen. */
export function FaceReady() {
  const { go } = useRekyc();

  return (
    <Screen background="bg-fill-tertiary" className="flex flex-col gap-[8px]">
      <StatusBar variant="dark" />
      <FaceViewfinder prompt="Hold still. Your e-KTP is ready" onBack={() => go("capture-onboarding")} />

      <div className="absolute inset-0 bg-black/40" />

      <div className="bg-fill-secondary light-sheen-strong border-border-mute shadow-sheet absolute bottom-0 left-0 flex w-full flex-col items-center justify-end gap-[16px] rounded-t-[20px] border px-[16px] py-[24px]">
        <p className="type-title-large w-full text-center text-[#1d1d1d]">
          Get ready for face verification
        </p>

        <div className="flex w-full flex-col items-start px-[16px]">
          <div className="border-border-mute bg-fill-quaternary light-sheen-strong flex w-full flex-col items-start gap-[12px] overflow-hidden rounded-[20px] border py-[16px]">
            <div className="flex w-full items-start justify-between px-[6px]">
              {TIPS.map((tip) => (
                <div key={tip.label} className="flex flex-col items-center justify-center gap-[8px]">
                  <span className="size-[64px] shrink-0 overflow-hidden">
                    <img alt="" className="block size-full" src={tip.icon} />
                  </span>
                  <p className="w-[80px] text-center text-[12px] leading-[16px] text-[#3d3d3d]">
                    {tip.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button className="rounded-[120px]" onClick={() => go("fr-liveness")}>
          Got it, I’m ready
        </Button>
      </div>
    </Screen>
  );
}

/** Liveness capture — the shutter fires on its own once the face is aligned. */
export function FaceLiveness() {
  const { go, completeFaceCheck } = useRekyc();
  const [prompt, setPrompt] = useState("The photo will be taken automatically");

  useEffect(() => {
    const hold = window.setTimeout(() => setPrompt("Hold still, we’re taking the photo"), 1600);
    const done = window.setTimeout(completeFaceCheck, 3200);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [completeFaceCheck]);

  return (
    <Screen background="bg-fill-tertiary" className="flex flex-col gap-[8px]">
      <StatusBar variant="dark" />
      <FaceViewfinder prompt={prompt} onBack={() => go("fr-ready")} />
    </Screen>
  );
}

/**
 * `kyc_finished_alt 157/158` — a 247px `fill/error/primary` banner under the light
 * sheen, with the outcome card pulled up over it and the badge straddling the seam.
 */
function FaceErrorShell({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <Screen>
      <div className="bg-fill-error absolute top-0 left-0 h-[247px] w-full" />
      <div className="light-sheen absolute top-0 left-0 h-[247px] w-full" />

      <div className="relative flex w-full flex-col items-center gap-[8px] pb-[8px]">
        <StatusBar variant="dark" />
        <div className="flex h-[36px] w-full items-center px-[16px]">
          <button type="button" onClick={onClose} className="size-[24px] cursor-pointer">
            <img alt="Close" className="block size-full" src={`${A}/ic-cancel-white.svg`} />
          </button>
          <p className="type-title-moderate text-type-static-white ml-[8px]">Verify with GoPay</p>
        </div>
      </div>

      {children}

      <div className="absolute top-[108px] left-[142px] size-[90.84px] rounded-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.15),inset_0_0_0_5px_#ea001f]">
        <img
          alt=""
          className="absolute top-[24px] left-[27px] block h-[42.344px] w-[30.384px]"
          src={`${A}/minispot-only-you-can-login.svg`}
        />
        <img
          alt=""
          className="absolute top-[24px] left-[46.5px] block size-[16.5px]"
          src={`${A}/minispot-only-you-can-login-badge.svg`}
        />
      </div>
    </Screen>
  );
}

function FaceErrorCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-fill-primary shadow-bevel-top-low absolute top-[151px] left-[16px] flex w-[343px] flex-col gap-[24px] rounded-[20px] px-[20px] pt-[59px] pb-[20px]">
      {children}
    </div>
  );
}

function FaceErrorHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-[4px]">
      <p className="type-title-xl text-type-title w-[303px] text-center">{title}</p>
      <div className="flex w-[303px] flex-col items-center gap-[8px]">{children}</div>
    </div>
  );
}

const GUIDELINES = [
  {
    spot: "spot-good-lighting.svg",
    title: "Photo has to be well-lit",
    detail: "Find a place with enough lighting (not too dark or too bright).",
  },
  {
    spot: "spot-clear-face.svg",
    title: "Face has to be clearly visible",
    detail: "Don’t wear mask, hat, or any kind of glasses.",
  },
];

/** FR did not match; the on-file record is untouched and capture is not reachable. */
export function FaceFailed() {
  const { go, retryFaceCheck, faceAttemptsUsed } = useRekyc();
  const attemptsLeft = Math.max(FACE_ATTEMPT_LIMIT - faceAttemptsUsed, 0);

  return (
    <FaceErrorShell onClose={() => go("vac")}>
      <FaceErrorCard>
        <FaceErrorHeading title="Couldn&#8217;t verify your face">
          <p className="text-type-body w-full text-center text-[14px] leading-[20px]">
            We couldn&apos;t recognize your face. Please make sure you meet the guidelines.
          </p>
        </FaceErrorHeading>

        <div className="flex w-full flex-col gap-[12px]">
          {GUIDELINES.map((guideline, index) => (
            <Fragment key={guideline.title}>
              {index > 0 ? <div className="bg-border-secondary h-px w-full" /> : null}
              <div className="flex w-full items-center gap-[12px]">
                <img alt="" className="block size-[40px] shrink-0" src={`${A}/${guideline.spot}`} />
                <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                  <p className="text-type-title text-[14px] leading-[20px] font-bold">
                    {guideline.title}
                  </p>
                  <p className="text-type-body text-[13px] leading-[16px]">{guideline.detail}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </FaceErrorCard>

      <div className="bg-fill-primary absolute bottom-0 left-0 flex w-full flex-col gap-[12px] px-[16px] pt-[16px] pb-[24px]">
        <p className="text-type-body w-full text-center text-[12px] leading-[16px]">
          {attemptsLeft} attempts left
        </p>
        <Button onClick={retryFaceCheck}>Retry face verification</Button>
        <Button variant="secondary" onClick={() => go("dira")}>
          Need help?
        </Button>
      </div>
    </FaceErrorShell>
  );
}

/** Too many failed attempts — the account is temporarily blocked from retrying. */
export function FaceBlocked() {
  const { go } = useRekyc();

  return (
    <FaceErrorShell onClose={() => go("vac")}>
      <FaceErrorCard>
        <FaceErrorHeading title="Way too many attempts">
          <p className="text-type-body w-full text-center text-[14px] leading-[20px]">
            For security reasons, we&apos;ve blocked your account due to multiple incorrect
            attempts.
          </p>
          <button
            type="button"
            onClick={() => go("dira")}
            className="flex cursor-pointer items-start gap-[4px]"
          >
            <img alt="" className="block size-[16px]" src={`${A}/ic-info-active.svg`} />
            <span className="text-fill-active text-[13px] leading-[16px] font-semibold">
              How to take a clear photo
            </span>
          </button>
        </FaceErrorHeading>

        <div className="bg-fill-mute flex w-full items-center justify-center rounded-[120px] p-[8px] drop-shadow-[0_2px_0.5px_rgba(255,255,255,0.7)]">
          <p className="text-type-body text-[14px] leading-[24px] font-semibold">
            Please try again in <span className="text-type-title">23:59</span> hours
          </p>
        </div>
      </FaceErrorCard>

      <div className="bg-fill-primary absolute bottom-0 left-0 flex w-full flex-col px-[16px] pt-[16px] pb-[24px]">
        <Button onClick={() => go("dira")}>Get help</Button>
      </div>
    </FaceErrorShell>
  );
}
