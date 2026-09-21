import { useEffect, useState } from "react";
import { Screen } from "@/components/system/PhoneFrame";
import { CaptureNavbar } from "@/components/system/Navbar";
import { StatusBar } from "@/components/system/StatusBar";
import { useRekyc } from "@/hooks/useRekyc";
import { SCENARIOS } from "@/lib/scenarios";

const A = "/figma";

/** How long the automatic shutter counts down before OCR runs. */
const COUNTDOWN_FROM = 3;

/**
 * e-KTP capture. The card is detected and photographed automatically; when detection
 * runs past the countdown the screen switches to its "taking longer" state.
 */
export function KtpCapture() {
  const { go, scenarioId, submitCapture, eddAnswers } = useRekyc();
  const scenario = SCENARIOS[scenarioId];
  const [remaining, setRemaining] = useState(COUNTDOWN_FROM);

  useEffect(() => {
    const tick = window.setInterval(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    const done = window.setTimeout(() => {
      const answers =
        eddAnswers.sourceOfIncome && eddAnswers.upgradePurpose
          ? {
              sourceOfIncome: eddAnswers.sourceOfIncome,
              upgradePurpose: eddAnswers.upgradePurpose,
            }
          : undefined;
      const outcome = submitCapture(answers);
      go(outcome === "edd_required" ? "edd-income" : "result-uploading");
    }, scenario.captureSeconds * 1000);
    return () => window.clearTimeout(done);
  }, [eddAnswers, go, scenario.captureSeconds, submitCapture]);

  const slow = remaining <= 0;

  return (
    <Screen background="bg-fill-primary">
      {/* Camera view — both bitmaps keep the crop offsets from the Figma frame. */}
      <div className="pointer-events-none absolute top-[calc(50%+14px)] left-[calc(50%+0.5px)] h-[222px] w-[344px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px]">
        <img
          alt=""
          className="absolute top-[-14.45%] left-[-101.33%] h-[119.18%] w-[302.4%] max-w-none"
          src={`${A}/ktp-capture-backdrop.png`}
        />
      </div>
      <div className="pointer-events-none absolute top-[calc(50%+14.5px)] left-[calc(50%+0.5px)] h-[223px] w-[344px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[15.68px]">
        <img
          alt=""
          className="absolute top-[-94.61%] left-[-32.6%] h-[295.76%] w-[309.03%] max-w-none"
          src={`${A}/ktp-card.png`}
        />
      </div>

      <div className="absolute top-[124px] left-0 flex h-[533px] w-[375px] flex-col justify-between px-[16px] py-[32px]">
        <p className="type-title-large text-type-title w-full text-center">
          {slow
            ? "Something got in the way, this will take longer"
            : "Verifying your e-KTP, please don’t leave the screen yet"}
        </p>
        <div className="flex min-h-px w-full flex-1 flex-col items-center justify-center">
          <div className="bg-fill-primary flex flex-col items-center justify-center rounded-[120px] p-[12px]">
            {slow ? (
              <span className="flex size-[44px] items-center justify-center">
                <span className="border-border-mute border-t-fill-active size-[28px] animate-spin rounded-full border-[3px]" />
              </span>
            ) : (
              <p className="type-hero text-type-title w-[44px] text-center">{remaining}</p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 flex w-full flex-col gap-[8px]">
        <StatusBar variant="dark" />
        <CaptureNavbar onBack={() => go("fr-ready")} showGuides={false} />
      </div>
    </Screen>
  );
}
