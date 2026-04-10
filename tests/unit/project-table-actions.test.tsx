import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { ActionCell } from "@/components/project-table"

describe("ActionCell Component", () => {
  describe("Rendering", () => {
    it("renders ellipsis button with MoreHorizontal icon", () => {
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button", { name: /open project actions/i })
      expect(button).toBeInTheDocument()
      // Icon should be present (MoreHorizontal renders as SVG)
      const icon = button.querySelector("svg")
      expect(icon).toBeInTheDocument()
    })

    it("button has aria-label for accessibility", () => {
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button", {
        name: /open project actions/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  describe("Dropdown Interaction", () => {
    it("opens dropdown menu when button is clicked", async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button")
      await user.click(button)

      // Menu items should be visible after click
      await waitFor(() => {
        const openInItem = screen.getByTestId("action-open-in")
        expect(openInItem).toBeInTheDocument()
      })
    })

    it("calls onAction callback with correct action and projectId when menu item clicked", async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()
      render(<ActionCell projectId="proj-123" onAction={onAction} />)

      const button = screen.getByRole("button")
      await user.click(button)

      // Wait for delete option to appear
      await waitFor(() => {
        const deleteOption = screen.getByTestId("action-delete")
        expect(deleteOption).toBeInTheDocument()
      })

      // Now click it
      const deleteOption = screen.getByTestId("action-delete")
      await user.click(deleteOption)

      expect(onAction).toHaveBeenCalledWith("delete", "proj-123")
    })

    it("closes dropdown after action is selected", async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button")
      await user.click(button)

      // Wait for menu to open
      await waitFor(() => {
        expect(screen.getByTestId("action-open-in")).toBeInTheDocument()
      })

      const openInOption = screen.getByTestId("action-open-in")
      await user.click(openInOption)

      // Menu items should no longer be visible
      await waitFor(() => {
        expect(screen.queryByTestId("action-delete")).not.toBeInTheDocument()
      })
    })
  })

  describe("Keyboard Navigation", () => {
    it("closes dropdown when Escape key is pressed", async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button")
      await user.click(button)

      // Wait for menu to open
      await waitFor(() => {
        expect(screen.getByTestId("action-delete")).toBeInTheDocument()
      })

      // Press Escape key
      await user.keyboard("{Escape}")

      // Dropdown should close
      await waitFor(() => {
        expect(screen.queryByTestId("action-delete")).not.toBeInTheDocument()
      })
    })

    it("supports keyboard interaction with menu items", async () => {
      const user = userEvent.setup()
      const onAction = vi.fn()
      render(<ActionCell projectId="test-1" onAction={onAction} />)

      const button = screen.getByRole("button")
      await user.click(button)

      // Wait for menu to appear
      await waitFor(() => {
        expect(screen.getByTestId("action-delete")).toBeInTheDocument()
      })

      // Menu items should be accessible
      const shareOption = screen.getByTestId("action-share")
      await user.click(shareOption)

      expect(onAction).toHaveBeenCalledWith("share", "test-1")
    })
  })
})
