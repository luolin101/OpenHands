import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "test-utils";
import { ExpandableMessage } from "#/components/features/chat/expandable-message";

describe("ExpandableMessage", () => {
  it("should render with neutral border for non-action messages", () => {
    renderWithProviders(<ExpandableMessage message="Hello" type="thought" />);
    const element = screen.getByText("Hello");
    const container = element.closest("div.flex.gap-2.items-center.justify-between");
    expect(container).toHaveClass("border-neutral-300");
    expect(screen.queryByTestId("status-icon")).not.toBeInTheDocument();
  });

  it("should render with neutral border for error messages", () => {
    renderWithProviders(<ExpandableMessage message="Error occurred" type="error" />);
    const element = screen.getByText("Error occurred");
    const container = element.closest("div.flex.gap-2.items-center.justify-between");
    expect(container).toHaveClass("border-neutral-300");
    expect(screen.queryByTestId("status-icon")).not.toBeInTheDocument();
  });

  it("should render with success icon for successful action messages", () => {
    renderWithProviders(
      <ExpandableMessage
        message="Command executed successfully"
        type="action"
        success={true}
      />
    );
    const element = screen.getByText("Command executed successfully");
    const container = element.closest("div.flex.gap-2.items-center.justify-between");
    expect(container).toHaveClass("border-neutral-300");
    const icon = screen.getByTestId("status-icon");
    expect(icon).toHaveClass("fill-success");
  });

  it("should render with error icon for failed action messages", () => {
    renderWithProviders(
      <ExpandableMessage
        message="Command failed"
        type="action"
        success={false}
      />
    );
    const element = screen.getByText("Command failed");
    const container = element.closest("div.flex.gap-2.items-center.justify-between");
    expect(container).toHaveClass("border-neutral-300");
    const icon = screen.getByTestId("status-icon");
    expect(icon).toHaveClass("fill-danger");
  });

  it("should render with neutral border and no icon for action messages without success prop", () => {
    renderWithProviders(<ExpandableMessage message="Running command" type="action" />);
    const element = screen.getByText("Running command");
    const container = element.closest("div.flex.gap-2.items-center.justify-between");
    expect(container).toHaveClass("border-neutral-300");
    expect(screen.queryByTestId("status-icon")).not.toBeInTheDocument();
  });
});