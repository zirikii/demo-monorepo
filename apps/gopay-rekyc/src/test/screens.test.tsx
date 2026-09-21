import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaceFailure, FaceLockout } from "../components/rekyc/FaceFailure";
import { EktpReview } from "../components/rekyc/EktpReview";
import { ResultPanel } from "../components/rekyc/ResultPanel";
import { DEMO_IDENTITY } from "../domain/seed";
import { MISMATCH_COPY } from "../data/copy";
import { maskIdentity } from "../lib/mask";

const masked = maskIdentity(DEMO_IDENTITY);

describe("reKYC screens", () => {
  it("toggles collapsed and expanded e-KTP data and keeps both actions", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const { rerender } = render(
      <EktpReview masked={masked} expanded={false} onToggle={onToggle} onConfirm={vi.fn()} onUpdate={vi.fn()} />,
    );
    expect(screen.getByText("B*** P***")).toBeInTheDocument();
    expect(screen.getByText("3276********0002")).toBeInTheDocument();
    expect(screen.queryByText("RT/RW")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /see more data/i }));
    expect(onToggle).toHaveBeenCalledOnce();

    rerender(<EktpReview masked={masked} expanded onToggle={onToggle} onConfirm={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText("RT/RW")).toBeInTheDocument();
    expect(screen.getByText("007/***")).toBeInTheDocument();
    expect(screen.getByText("Lak***-laki")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "My data is still the same" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "I need to update my e-KTP data" })).toBeEnabled();
  });

  it("renders face failure and lockout", () => {
    const { rerender } = render(
      <FaceFailure attemptsLeft={3} onRetry={vi.fn()} onHelp={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getByRole("heading", { name: "Couldn't verify your face" })).toBeInTheDocument();
    expect(screen.getByText("3 attempts left")).toBeInTheDocument();
    rerender(<FaceLockout onHelp={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "Way too many attempts" })).toBeInTheDocument();
  });

  it("renders the NIK mismatch rejection and the pending review state", () => {
    const { rerender } = render(
      <ResultPanel decision={{ outcome: "reject", reason: "rekyc_id_mismatch" }} onDone={vi.fn()} onRetry={vi.fn()} />,
    );
    expect(screen.getByText(MISMATCH_COPY.en)).toBeInTheDocument();
    expect(screen.getByText(MISMATCH_COPY.id)).toBeInTheDocument();
    rerender(
      <ResultPanel
        decision={{ outcome: "pending_manual_review", reason: "ocr_low_confidence" }}
        onDone={vi.fn()}
        onRetry={vi.fn()}
      />,
    );
    expect(screen.getByRole("heading", { name: "Review in progress" })).toBeInTheDocument();
  });
});
