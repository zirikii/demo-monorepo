import { Info, Lightbulb, UserRound, X } from "lucide-react";
import { StatusBar } from "../shell/StatusBar";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function FaceFailure({
  attemptsLeft,
  onRetry,
  onHelp,
  onClose,
}: {
  attemptsLeft: number;
  onRetry: () => void;
  onHelp: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-bg-primary">
      <div className="bg-danger px-2 pb-16 text-static-white">
        <StatusBar tone="light" />
        <div className="flex h-11 items-center gap-2">
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-title-moderate font-semibold">Verify with GoPay</h1>
        </div>
      </div>
      <Card className="relative z-10 mx-4 -mt-10 px-4 pb-4 pt-12 text-center">
        <span className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-danger bg-[#f6e7c1]">
          <UserRound className="h-8 w-8 text-[#2f6b4f]" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-static-white">
            <X className="h-3 w-3" aria-hidden="true" />
          </span>
        </span>
        <h2 className="text-[22px] font-extrabold leading-7">Couldn&apos;t verify your face</h2>
        <p className="mt-2 text-body-small text-text-body">
          We couldn&apos;t recognize your face. Please make sure you meet the guidelines.
        </p>
        <ul className="mt-4 space-y-3 text-left">
          <li className="flex gap-3 border-b border-border-mute pb-3">
            <Lightbulb className="mt-0.5 h-5 w-5 text-[#f5b400]" aria-hidden="true" />
            <span>
              <span className="block text-title-tiny font-bold">Photo has to be well-lit</span>
              <span className="block text-body-small text-text-body">
                Find a place with enough lighting (not too dark or too bright).
              </span>
            </span>
          </li>
          <li className="flex gap-3">
            <UserRound className="mt-0.5 h-5 w-5 text-gopay-active" aria-hidden="true" />
            <span>
              <span className="block text-title-tiny font-bold">Face has to be clearly visible</span>
              <span className="block text-body-small text-text-body">Don&apos;t wear mask, hat, or any kind of glasses.</span>
            </span>
          </li>
        </ul>
      </Card>
      <div className="mt-auto space-y-3 px-4 pb-8">
        <p className="text-center text-xs text-text-body">{attemptsLeft} attempts left</p>
        <Button onClick={onRetry}>Retry face verification</Button>
        <Button variant="outline" onClick={onHelp}>
          Need help?
        </Button>
      </div>
    </div>
  );
}

export function FaceLockout({ onHelp, onClose }: { onHelp: () => void; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col bg-bg-primary">
      <div className="bg-danger px-2 pb-16 text-static-white">
        <StatusBar tone="light" />
        <div className="flex h-11 items-center gap-2">
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-title-moderate font-semibold">Verify with GoPay</h1>
        </div>
      </div>
      <Card className="relative z-10 mx-4 -mt-10 px-4 pb-5 pt-12 text-center">
        <span className="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-danger bg-[#f6e7c1]">
          <UserRound className="h-8 w-8 text-[#2f6b4f]" aria-hidden="true" />
        </span>
        <h2 className="text-[22px] font-extrabold leading-7">Way too many attempts</h2>
        <p className="mt-2 text-body-small text-text-body">
          For security reasons, we&apos;ve blocked your account due to multiple incorrect attempts.
        </p>
        <p className="mt-3 inline-flex items-center gap-1 text-body-small font-semibold text-gopay-active">
          <Info className="h-4 w-4" aria-hidden="true" />
          How to take a clear photo
        </p>
        <p className="mt-4 rounded-full bg-bg-quaternary py-3 text-body-small text-text-body">Please try again in 23:59 hours</p>
      </Card>
      <div className="mt-auto px-4 pb-8">
        <Button onClick={onHelp}>Get help</Button>
      </div>
    </div>
  );
}
