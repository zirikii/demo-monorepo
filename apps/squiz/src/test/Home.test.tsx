import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("HomePage", () => {
  it("renders the hero headline and key sections", () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /digital experiences that deliver/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the squiz dxp difference/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /turn marketing ideas into live experiences/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /empowering teams across your organization/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /latest stories, news and insights/i }),
    ).toBeInTheDocument();
  });
});
