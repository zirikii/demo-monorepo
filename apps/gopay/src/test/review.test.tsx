import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { EktpReviewScreen } from "@/components/screens/EktpReviewScreen";
import { SessionProvider } from "@/hooks/useSession";

function renderReview() {
  return render(
    <MemoryRouter initialEntries={["/review"]}>
      <SessionProvider>
        <EktpReviewScreen />
      </SessionProvider>
    </MemoryRouter>,
  );
}

describe("e-KTP review", () => {
  it("opens collapsed and reveals the extra fields", async () => {
    const user = userEvent.setup();
    renderReview();
    expect(screen.getByRole("heading", { name: "Your e-KTP data" })).toBeInTheDocument();
    expect(screen.getByText("3276********0002")).toBeInTheDocument();
    expect(screen.queryByText("Kelurahan")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "See more data" }));
    expect(screen.getByText("Kelurahan")).toBeInTheDocument();
    expect(screen.getByText("Jenis Kelamin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "See less data" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("offers the Figma confirm and update actions", () => {
    renderReview();
    expect(screen.getByRole("button", { name: "My data is still the same" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "I need to update my e-KTP data" }),
    ).toBeInTheDocument();
  });
});
