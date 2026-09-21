import { useEffect, useState, type ReactNode } from "react";
import { Screen } from "@/components/system/PhoneFrame";
import { StatusBar } from "@/components/system/StatusBar";
import { CircularButton } from "@/components/system/Navbar";
import { CountdownDial, DialSpot, type DialTone } from "@/components/flow/CountdownDial";
import { NotchedCard, ResultPanel } from "@/components/flow/ResultSheet";
import { BenefitsTable, SupervisedFooter } from "@/components/ui/BenefitsTable";
import { Button } from "@/components/ui/Button";
import { useRekyc } from "@/hooks/useRekyc";

const A = "/figma";

/** How long the upload step is shown before the review countdown starts. */
const UPLOAD_MS = 1800;
/** The dial counts 29 down to 0; the demo runs a tick every 90ms. */
const REVIEW_FROM = 29;
const REVIEW_TICK_MS = 90;

const BANK_ICON = `${A}/minispot-bank.svg`;
const TABUNGAN_ICON = `${A}/minispot-tabungan.svg`;

function PerkCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="bg-fill-primary shadow-bevel-top light-sheen-strong flex w-[343px] items-center gap-[16px] rounded-[20px] p-[20px]">
      <img alt="" className="block size-[40px] shrink-0" src={icon} />
      <p className="text-type-green-body min-w-px flex-1 text-[14px] leading-[20px] font-semibold">
        {label}
      </p>
    </div>
  );
}

/**
 * Shared chrome for every result screen: the Android status bar, the close button, the
 * soft backdrop shapes and the dial that overlaps the panel below it.
 */
function ResultShell({
  tone,
  progress,
  dial,
  children,
}: {
  tone: DialTone;
  progress?: number;
  dial: ReactNode;
  children: ReactNode;
}) {
  const { go } = useRekyc();

  return (
    <Screen>
      <div className="pointer-events-none absolute top-[194px] left-1/2 h-[125px] w-[375px] -translate-x-1/2">
        <img alt="" className="block size-full" src={`${A}/result-backdrop-shape-lg.svg`} />
      </div>
      <div className="pointer-events-none absolute top-[250px] left-1/2 h-[125px] w-[321px] -translate-x-1/2">
        <img alt="" className="block size-full" src={`${A}/result-backdrop-shape-sm.svg`} />
      </div>

      {children}

      <div className="pointer-events-none absolute top-[97px] left-0 w-full">
        <CountdownDial tone={tone} progress={progress}>
          {dial}
        </CountdownDial>
      </div>

      <div className="absolute top-0 left-0 flex w-full flex-col gap-[8px] pb-[8px]">
        <StatusBar variant="android" />
        <div className="flex items-center px-[16px]">
          <CircularButton icon="close" label="Close" onClick={() => go("vac")} />
        </div>
      </div>
    </Screen>
  );
}

/** Step 1 of the submission — the captured documents are still being uploaded. */
export function ResultUploading() {
  const { go } = useRekyc();

  useEffect(() => {
    const next = window.setTimeout(() => go("result-reviewing"), UPLOAD_MS);
    return () => window.clearTimeout(next);
  }, [go]);

  return (
    <ResultShell
      tone="green"
      progress={0.35}
      dial={<DialSpot src={`${A}/result-spot-paper-plane.svg`} />}
    >
      <ResultPanel>
        <NotchedCard height={132}>
          <p className="type-title-moderate text-type-green-title mt-[56px] w-[320px] text-center">
            Uploading your documents...
          </p>
        </NotchedCard>

        <div className="mt-[24px] flex w-full flex-col items-center gap-[24px]">
          <p className="text-type-body text-[12px] leading-[16px] font-semibold">
            What you&#8217;ll get:
          </p>
          <PerkCard icon={BANK_ICON} label="100x/month free transfer to all banks" />
          <PerkCard icon={BANK_ICON} label="Unlock transfer to e-wallets" />
          <PerkCard
            icon={TABUNGAN_ICON}
            label="Free cash withdrawal start from 10.000"
          />
        </div>
      </ResultPanel>
    </ResultShell>
  );
}

/**
 * Step 2 — the verification pipeline has already produced its outcome, and the dial
 * counts the review window down before routing to the matching end state.
 */
export function ResultReviewing() {
  const { go, showToast, lastOutcome } = useRekyc();
  const [remaining, setRemaining] = useState(REVIEW_FROM);

  useEffect(() => {
    const tick = window.setInterval(
      () => setRemaining((value) => Math.max(value - 1, 0)),
      REVIEW_TICK_MS,
    );
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (remaining > 0) return;
    switch (lastOutcome) {
      case "approved":
        go("vac");
        showToast("e-KTP data updated");
        break;
      case "pending_review":
        go("result-slow");
        break;
      case "rejected":
        go("result-failed");
        break;
      case "edd_required":
        go("edd-income");
        break;
      case null:
      case undefined:
        go("vac");
        break;
      default: {
        const exhaustive: never = lastOutcome;
        throw new Error(`Unhandled outcome ${String(exhaustive)}`);
      }
    }
  }, [go, lastOutcome, remaining, showToast]);

  return (
    <ResultShell
      tone="green"
      progress={remaining / REVIEW_FROM}
      dial={
        <p className="type-hero text-type-green-body w-[44px] text-center text-[40px]">
          {remaining}
        </p>
      }
    >
      <ResultPanel>
        <NotchedCard height={138}>
          <p className="type-title-moderate text-type-green-title mt-[60px] w-[320px] text-center">
            We&#8217;re now reviewing your documents
          </p>
        </NotchedCard>

        <div className="mt-[32px] flex w-full flex-col items-center gap-[24px]">
          <p className="text-type-body text-[12px] leading-[16px] font-semibold">
            Check out other GoPay Pelajar/anak perks!
          </p>
          <PerkCard icon={BANK_ICON} label="Free transfer 100x to any banks" />
          <PerkCard
            icon={TABUNGAN_ICON}
            label="Grow money by 2.5% with GoPay Tabungan"
          />
        </div>
      </ResultPanel>
    </ResultShell>
  );
}

/** Review ran past the countdown; the customer is told to expect a decision later. */
export function ResultSlow() {
  const { go } = useRekyc();

  return (
    <ResultShell tone="amber" dial={<DialSpot src={`${A}/spot-hourglass.svg`} />}>
      <ResultPanel>
        <NotchedCard height={159}>
          <p className="type-title-moderate text-type-green-title mt-[52px] w-[288px] text-center">
            Sorry, it takes longer than usual
          </p>
          <p className="text-type-green-body mt-[8px] w-[288px] text-center text-[12px] leading-[16px] font-semibold">
            But don&apos;t worry&#8212;we&apos;re working on it and will get back to you within 24
            hours.
          </p>
        </NotchedCard>

        <div className="mt-[32px] flex w-full flex-col items-center gap-[24px] pb-[92px]">
          <p className="text-type-body text-[12px] leading-[16px] font-semibold">
            Check out other GoPay Pelajar/anak perks!
          </p>
          <PerkCard icon={BANK_ICON} label="100x/month free transfer to all banks" />
          <PerkCard
            icon={TABUNGAN_ICON}
            label="Earn 2.5% interest with GoPay Tabungan"
          />
        </div>
      </ResultPanel>

      <div className="bg-fill-primary shadow-bevel-top sticky bottom-0 left-0 w-full px-[16px] pt-[16px] pb-[16px]">
        <Button onClick={() => go("vac")}>Got it</Button>
      </div>
    </ResultShell>
  );
}

/** Re-entering the flow while a submission is still in the manual review queue. */
export function ResultPending() {
  return (
    <ResultShell tone="amber" dial={<DialSpot src={`${A}/spot-hourglass.svg`} />}>
      <ResultPanel>
        <NotchedCard height={218}>
          <p className="type-title-moderate text-type-green-title mt-[52px] w-[288px] text-center">
            Your documents are still under review 🙏
          </p>
          <p className="text-type-green-body mt-[8px] w-[303px] text-center text-[12px] leading-[16px] font-semibold">
            Due to a high volume of requests, it&apos;s taking us a bit longer to review them.
            We&apos;ll notify you once it&apos;s done.
          </p>
          <div className="mt-[16px] w-[327px]">
            <Button>Help page</Button>
          </div>
        </NotchedCard>

        <div className="mt-[24px] flex w-full flex-col items-center pb-[56px]">
          <BenefitsTable />
        </div>
      </ResultPanel>

      <SupervisedFooter />
    </ResultShell>
  );
}

/**
 * The submission was rejected. Nothing on the account changed, so the only action is
 * to retake the photo and run the flow again (PRD 4.3 Rules).
 */
export function ResultFailed() {
  const { startRekyc } = useRekyc();

  return (
    <ResultShell tone="red" dial={<DialSpot src={`${A}/spot-upgrade-failed.svg`} />}>
      <ResultPanel>
        <NotchedCard height={218}>
          <p className="type-title-moderate text-type-green-title mt-[52px] w-[288px] text-center">
            Failed to upgrade
          </p>
          <p className="text-type-green-body mt-[8px] w-[303px] text-center text-[12px] leading-[16px] font-semibold">
            Retake the photo and make sure it&apos;s clear before you submit
          </p>
          <div className="mt-[8px] flex items-center justify-center gap-[6px]">
            <img alt="" className="block size-[16px]" src={`${A}/ic-info.svg`} />
            <p className="text-fill-active text-[13px] leading-[16px] font-bold">
              How to Take a Clear Photo
            </p>
          </div>
          <div className="mt-[16px] w-[327px]">
            <Button onClick={startRekyc}>Retry Upgrade</Button>
          </div>
        </NotchedCard>

        <div className="mt-[24px] flex w-full flex-col items-center pb-[56px]">
          <BenefitsTable />
        </div>
      </ResultPanel>

      <SupervisedFooter />
    </ResultShell>
  );
}
