import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "@/components/empty-state"
import { createEntryActionSpies } from "../fixtures/project-entry-actions"

describe("EmptyState Component", () => {
  describe("T002: Render with default props", () => {
    it("should render with default title", () => {
      render(<EmptyState />)
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
    })

    it("should render with default description", () => {
      render(<EmptyState />)
      expect(
        screen.getByText(/You have no existing projects/)
      ).toBeInTheDocument()
    })

    it("should render primary button with default label", () => {
      render(<EmptyState />)
      expect(
        screen.getByRole("button", { name: /create project/i })
      ).toBeInTheDocument()
    })

    it("should render secondary button with default label", () => {
      render(<EmptyState />)
      expect(
        screen.getByRole("button", { name: /import project/i })
      ).toBeInTheDocument()
    })

    it("should render exactly two buttons", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(2)
    })
  })

  describe("T003: Accept and apply custom props", () => {
    it("should render custom title", () => {
      render(<EmptyState title="Custom Title" />)
      expect(screen.getByText("Custom Title")).toBeInTheDocument()
      expect(screen.queryByText("No projects yet")).not.toBeInTheDocument()
    })

    it("should render custom description", () => {
      render(
        <EmptyState description="This is a custom description text" />
      )
      expect(
        screen.getByText("This is a custom description text")
      ).toBeInTheDocument()
    })

    it("should render custom primary button label", () => {
      render(<EmptyState primaryButtonLabel="New Project" />)
      expect(
        screen.getByRole("button", { name: /new project/i })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: /create project/i })
      ).not.toBeInTheDocument()
    })

    it("should render custom secondary button label", () => {
      render(<EmptyState secondaryButtonLabel="Load Project" />)
      expect(
        screen.getByRole("button", { name: /load project/i })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: /import project/i })
      ).not.toBeInTheDocument()
    })

    it("should render all custom props together", () => {
      render(
        <EmptyState
          title="Start Here"
          description="Custom desc"
          primaryButtonLabel="Add"
          secondaryButtonLabel="Upload"
        />
      )
      expect(screen.getByText("Start Here")).toBeInTheDocument()
      expect(screen.getByText("Custom desc")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /upload/i })
      ).toBeInTheDocument()
    })
  })

  describe("T004: Verify Button variants are applied", () => {
    it("should apply default variant to primary button", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      const primaryButton = buttons[0]
      expect(primaryButton).toHaveAttribute("data-variant", "default")
    })

    it("should apply secondary variant to secondary button", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      const secondaryButton = buttons[1]
      expect(secondaryButton).toHaveAttribute("data-variant", "secondary")
    })

    it("should have correct classes for primary button", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      const primaryButton = buttons[0]
      // shadcn Button default variant should include these classes
      expect(primaryButton).toHaveClass(/bg-primary|bg-slate/)
    })

    it("should have correct classes for secondary button", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      const secondaryButton = buttons[1]
      // shadcn Button secondary variant should include these classes
      expect(secondaryButton).toHaveClass(/bg-secondary|border|outline/)
    })

    it("primary button should be distinct from secondary in styling", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      const primaryButton = buttons[0]
      const secondaryButton = buttons[1]
      const primaryClass = primaryButton.className
      const secondaryClass = secondaryButton.className
      expect(primaryClass).not.toEqual(secondaryClass)
    })
  })

  describe("Shared action renderer parity", () => {
    it("renders action buttons from shared action source", () => {
      const { actions } = createEntryActionSpies()
      render(<EmptyState entryActions={actions} />)

      expect(screen.getByTestId("project-entry-actions")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /create project/i })).toHaveAttribute(
        "data-action-id",
        "create-project"
      )
      expect(screen.getByRole("button", { name: /import project/i })).toHaveAttribute(
        "data-action-id",
        "import-project"
      )
    })
  })

  describe("Button callbacks", () => {
    it("should call onPrimaryClick when primary button clicked", () => {
      const handlePrimaryClick = vi.fn()
      render(<EmptyState onPrimaryClick={handlePrimaryClick} />)
      const buttons = screen.getAllByRole("button")
      buttons[0].click()
      expect(handlePrimaryClick).toHaveBeenCalledTimes(1)
    })

    it("should call onSecondaryClick when secondary button clicked", () => {
      const handleSecondaryClick = vi.fn()
      render(<EmptyState onSecondaryClick={handleSecondaryClick} />)
      const buttons = screen.getAllByRole("button")
      buttons[1].click()
      expect(handleSecondaryClick).toHaveBeenCalledTimes(1)
    })

    it("should not crash when callbacks are not provided", () => {
      render(<EmptyState />)
      const buttons = screen.getAllByRole("button")
      expect(() => {
        buttons[0].click()
        buttons[1].click()
      }).not.toThrow()
    })
  })
})
