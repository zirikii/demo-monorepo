import { useEffect, useState } from "react";
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
            <div className="flex w-full items-start justify-between px-[12px]">
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
      <FaceViewfinder prompt={prompt} onBack={() => go("fr-ready")} animateArcs />
    </Screen>
  );
}

function FaceErrorShell({ children }: { children: React.ReactNode }) {
  return (
    <Screen>
      <div className="absolute top-0 left-0 h-[260px] w-full bg-gradient-to-b from-[#f43f5e] to-[#e52535]" />
      <div className="relative">
        <StatusBar variant="dark" />
        <div className="flex items-center gap-[12px] px-[16px] pb-[24px]">
          <span className="text-[20px] leading-none font-light text-white">✕</span>
          <p className="text-[18px] leading-[24px] font-bold text-white">Verify with GoPay</p>
        </div>
      </div>
      {children}
    </Screen>
  );
}

function FaceErrorBadge() {
  return (
    <div className="relative z-10 mx-auto -mb-[52px] flex size-[88px] items-center justify-center rounded-full border-[6px] border-[#e52535] bg-white">
      <span className="size-[56px] overflow-hidden">
        <img alt="" className="block size-full" src={`${A}/spot-no-hat.svg`} />
      </span>
    </div>
  );
}

/** FR did not match; the on-file record is untouched and capture is not reachable. */
export function FaceFailed() {
  const { retryFaceCheck, faceAttemptsUsed } = useRekyc();
  const attemptsLeft = Math.max(FACE_ATTEMPT_LIMIT - faceAttemptsUsed, 0);

  return (
    <FaceErrorShell>
      <FaceErrorBadge />
      <div className="bg-fill-primary relative mx-[16px] flex flex-col gap-[16px] rounded-[20px] px-[24px] pt-[60px] pb-[24px]">
        <div className="flex flex-col gap-[8px]">
          <p className="type-title-large text-type-title text-center">Couldn&apos;t verify your face</p>
          <p className="text-type-body text-center text-[14px] leading-[20px]">
            We couldn&apos;t recognize your face. Please make sure you meet the guidelines.
          </p>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-start gap-[12px]">
            <span className="size-[40px] shrink-0 overflow-hidden">
              <img alt="" className="block size-full" src={`${A}/spot-tips.svg`} />
            </span>
            <div className="flex flex-1 flex-col gap-[2px]">
              <p className="text-type-title text-[14px] leading-[20px] font-bold">
                Photo has to be well-lit
              </p>
              <p className="text-type-body text-[13px] leading-[18px]">
                Find a place with enough lighting (not too dark or too bright).
              </p>
            </div>
          </div>
          <div className="bg-border-mute h-px w-full" />
          <div className="flex items-start gap-[12px]">
            <span className="size-[40px] shrink-0 overflow-hidden">
              <img alt="" className="block size-full" src={`${A}/spot-no-glasses.svg`} />
            </span>
            <div className="flex flex-1 flex-col gap-[2px]">
              <p className="text-type-title text-[14px] leading-[20px] font-bold">
                Face has to be clearly visible
              </p>
              <p className="text-type-body text-[13px] leading-[18px]">
                Don&apos;t wear mask, hat, or any kind of glasses.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-fill-primary shadow-bevel-top absolute bottom-0 left-0 flex w-full flex-col items-center gap-[12px] rounded-t-[16px] p-[16px]">
        <p className="text-type-body text-[12px] leading-[16px]">{attemptsLeft} attempts left</p>
        <Button onClick={retryFaceCheck}>Retry face verification</Button>
        <Button variant="secondary">Need help?</Button>
      </div>
    </FaceErrorShell>
  );
}

/** Too many failed attempts — the account is temporarily blocked from retrying. */
export function FaceBlocked() {
  const { go } = useRekyc();

  return (
    <FaceErrorShell>
      <FaceErrorBadge />
      <div className="bg-fill-primary relative mx-[16px] flex flex-col gap-[16px] rounded-[20px] px-[24px] pt-[60px] pb-[24px]">
        <div className="flex flex-col gap-[8px]">
          <p className="type-title-large text-type-title text-center">Way too many attempts</p>
          <p className="text-type-body text-center text-[14px] leading-[20px]">
            For security reasons, we&apos;ve blocked your account due to multiple incorrect attempts.
          </p>
          <div className="flex items-center justify-center gap-[6px]">
            <span className="size-[16px]">
              <img alt="" className="block size-full" src={`${A}/ic-info.svg`} />
            </span>
            <p className="text-fill-active text-[14px] leading-[20px] font-semibold">
              How to take a clear photo
            </p>
          </div>
        </div>
        <div className="bg-fill-mute flex items-center justify-center rounded-[12px] px-[16px] py-[12px]">
          <p className="text-type-body text-[14px] leading-[20px]">
            Please try again in <span className="text-type-title font-bold">23:59 hours</span>
          </p>
        </div>
      </div>

      <div className="bg-fill-primary shadow-bevel-top absolute bottom-0 left-0 flex w-full flex-col items-start gap-[12px] rounded-t-[16px] p-[16px]">
        <Button onClick={() => go("vac")}>Get help</Button>
      </div>
    </FaceErrorShell>
  );
}
