import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Welcome from "./Welcome";

describe("Welcome Component", () => {
  it("renders welcome message", () => {
    render(<Welcome />);

    expect(
      screen.getByText("Welcome to My App")
    ).toBeInTheDocument();
  });

  it("renders login button", () => {
    render(<Welcome />);

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });
});