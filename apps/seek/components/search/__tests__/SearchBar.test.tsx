import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders SEEK-style What and Where controls", () => {
    render(<SearchBar />);

    expect(screen.getByLabelText("What")).toHaveAttribute(
      "placeholder",
      "Job title, keywords, or company",
    );
    expect(screen.getByLabelText("Where")).toHaveAttribute(
      "placeholder",
      "Suburb, city, or region",
    );
    expect(screen.getByRole("button", { name: /seek/i })).toBeInTheDocument();
  });

  it("submits keywords and location to the jobs route", () => {
    render(<SearchBar />);

    fireEvent.change(screen.getByLabelText("What"), { target: { value: "Product Manager" } });
    fireEvent.change(screen.getByLabelText("Where"), { target: { value: "Melbourne VIC" } });
    fireEvent.click(screen.getByRole("button", { name: /seek/i }));

    expect(pushMock).toHaveBeenCalledWith("/jobs?keywords=Product+Manager&location=Melbourne+VIC");
  });
});
