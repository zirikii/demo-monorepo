import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";
import { isValidMobile } from "../../lib/validators";
import { formatMobile } from "../../lib/format";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

/** Two-step mock sign-in: mobile number -> OTP (any 6 digits work in the demo). */
export function SignInModal({ open, onClose }: SignInModalProps) {
  const [step, setStep] = useState<"mobile" | "otp" | "done">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();

  const reset = () => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    setError(undefined);
    onClose();
  };

  const submitMobile = () => {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number starting with 6-9");
      return;
    }
    setError(undefined);
    setStep("otp");
  };

  const submitOtp = () => {
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit OTP (any digits work in this demo)");
      return;
    }
    setError(undefined);
    setStep("done");
  };

  return (
    <Modal open={open} onClose={reset} title="Sign in to Paytm">
      {step === "mobile" ? (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            submitMobile();
          }}
        >
          <TextField
            label="Mobile Number"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            error={error}
            hint="Demo mode — no SMS is sent, any valid-looking number works"
          />
          <Button type="submit" className="w-full">
            Proceed Securely
          </Button>
        </form>
      ) : step === "otp" ? (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            submitOtp();
          }}
        >
          <p className="text-sm text-ink-soft">
            OTP sent to <span className="font-semibold text-ink">{formatMobile(mobile)}</span>{" "}
            (simulated).
          </p>
          <TextField
            label="One-Time Password"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            error={error}
            hint="Hint: any 6 digits, e.g. 123456"
          />
          <Button type="submit" className="w-full">
            Verify & Sign In
          </Button>
        </form>
      ) : (
        <div className="space-y-5 text-center">
          <div
            aria-hidden="true"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-2xl"
          >
            ✓
          </div>
          <p className="text-sm text-ink-soft">
            You&apos;re signed in as{" "}
            <span className="font-semibold text-ink">{formatMobile(mobile)}</span>. This demo keeps
            no real session — explore freely.
          </p>
          <Button className="w-full" onClick={reset}>
            Continue Browsing
          </Button>
        </div>
      )}
    </Modal>
  );
}
