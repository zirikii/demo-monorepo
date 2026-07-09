import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/shared/ContactForm";

function renderForm() {
  return render(
    <ContactForm
      heading="Book your call"
      submitLabel="Request a time"
      successTitle="Request received"
      successCopy="Thanks!"
    />,
  );
}

describe("ContactForm", () => {
  it("shows validation errors for empty submission", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /request a time/i }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid work email.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your organization.")).toBeInTheDocument();
  });

  it("shows the success state after a valid submission", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("Full name"), "Alex Taylor");
    await user.type(screen.getByLabelText("Work email"), "alex@example.org");
    await user.type(screen.getByLabelText("Organization"), "Harbour City Council");
    await user.click(screen.getByRole("button", { name: /request a time/i }));

    expect(screen.getByRole("status")).toHaveTextContent("Request received");
  });
});
