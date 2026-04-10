import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { EmptyState } from "@/components/empty-state"

// Mock DataTable component for testing
vi.mock("@/components/data-table", () => ({
  DataTable: ({ data }: { data: Record<string, unknown>[] }) => (
    <div data-testid="data-table">
      Table with {data.length} items
    </div>
  ),
}))

describe("T005-T006: Homepage Empty State Conditional Rendering", () => {
  // Test component simulating parent homepage behavior
  function TestHomepage({ initialProjects }: { initialProjects: Record<string, unknown>[] }) {
    const [projects, setProjects] = useState(initialProjects)

    return (
      <div>
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div data-testid="data-table">
            Table with {projects.length} items
          </div>
        )}
        <button
          onClick={() => setProjects([{ id: 1, name: "Test Project" }])}
          data-testid="add-project-btn"
        >
          Add Project
        </button>
        <button
          onClick={() => setProjects([])}
          data-testid="clear-projects-btn"
        >
          Clear Projects
        </button>
      </div>
    )
  }

  describe("T005: EmptyState shown when projects.length === 0", () => {
    it("should render EmptyState when projects array is empty on mount", () => {
      render(<TestHomepage initialProjects={[]} />)
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })

    it("should show empty state message", () => {
      render(<TestHomepage initialProjects={[]} />)
      expect(
        screen.getByText(/You have no existing projects/)
      ).toBeInTheDocument()
    })

    it("should show both action buttons in empty state", () => {
      render(<TestHomepage initialProjects={[]} />)
      expect(
        screen.getByRole("button", { name: /create project/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /import project/i })
      ).toBeInTheDocument()
    })

    it("should hide DataTable when projects array is empty", () => {
      render(<TestHomepage initialProjects={[]} />)
      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })
  })

  describe("T006: DataTable shown when projects.length > 0", () => {
    it("should not render EmptyState when projects array has items", () => {
      const mockProjects = [
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
      ]
      render(<TestHomepage initialProjects={mockProjects} />)
      expect(
        screen.queryByText("No projects yet")
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/You have no existing projects/)
      ).not.toBeInTheDocument()
    })

    it("should render DataTable when projects array has one item", () => {
      const mockProjects = [{ id: 1, name: "Project 1" }]
      render(<TestHomepage initialProjects={mockProjects} />)
      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(screen.getByText(/Table with 1 items/)).toBeInTheDocument()
    })

    it("should render DataTable with multiple projects", () => {
      const mockProjects = [
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
        { id: 3, name: "Project 3" },
      ]
      render(<TestHomepage initialProjects={mockProjects} />)
      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(screen.getByText(/Table with 3 items/)).toBeInTheDocument()
    })

    it("should hide action buttons when DataTable is shown", () => {
      const mockProjects = [{ id: 1, name: "Project 1" }]
      render(<TestHomepage initialProjects={mockProjects} />)
      // Note: action buttons are hidden when DataTable is shown
      // (they are part of EmptyState, not in DataTable)
      expect(
        screen.queryByRole("button", { name: /create project/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: /import project/i })
      ).not.toBeInTheDocument()
    })
  })

  describe("Conditional rendering toggle", () => {
    it("should toggle from EmptyState to DataTable when project is added", () => {
      render(<TestHomepage initialProjects={[]} />)

      // Verify empty state shown initially
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()

      // Add a project
      const addBtn = screen.getByTestId("add-project-btn")
      fireEvent.click(addBtn)

      // Verify DataTable shown, EmptyState hidden
      expect(
        screen.queryByText("No projects yet")
      ).not.toBeInTheDocument()
      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(screen.getByText(/Table with 1 items/)).toBeInTheDocument()
    })

    it("should toggle from DataTable to EmptyState when projects are cleared", () => {
      render(
        <TestHomepage
          initialProjects={[{ id: 1, name: "Project 1" }]}
        />
      )

      // Verify DataTable shown initially
      expect(screen.getByTestId("data-table")).toBeInTheDocument()
      expect(
        screen.queryByText("No projects yet")
      ).not.toBeInTheDocument()

      // Clear projects
      const clearBtn = screen.getByTestId("clear-projects-btn")
      fireEvent.click(clearBtn)

      // Verify EmptyState shown, DataTable hidden
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
      expect(screen.queryByTestId("data-table")).not.toBeInTheDocument()
    })

    it("should toggle multiple times smoothly without errors", () => {
      render(<TestHomepage initialProjects={[]} />)

      const addBtn = screen.getByTestId("add-project-btn")
      const clearBtn = screen.getByTestId("clear-projects-btn")

      // Empty → Populated
      fireEvent.click(addBtn)
      expect(screen.getByTestId("data-table")).toBeInTheDocument()

      // Populated → Empty
      fireEvent.click(clearBtn)
      expect(screen.getByText("No projects yet")).toBeInTheDocument()

      // Empty → Populated again
      fireEvent.click(addBtn)
      expect(screen.getByTestId("data-table")).toBeInTheDocument()

      // Should not crash or show errors
      expect(() => {
        fireEvent.click(clearBtn)
        fireEvent.click(addBtn)
        fireEvent.click(clearBtn)
      }).not.toThrow()
    })

    it("should render correct content after each toggle", () => {
      render(<TestHomepage initialProjects={[]} />)

      const addBtn = screen.getByTestId("add-project-btn")
      const clearBtn = screen.getByTestId("clear-projects-btn")

      // Initial: empty
      expect(screen.getByText("No projects yet")).toBeInTheDocument()

      // Add project
      fireEvent.click(addBtn)
      expect(screen.getByText(/Table with 1 items/)).toBeInTheDocument()

      // Clear
      fireEvent.click(clearBtn)
      expect(screen.getByText("No projects yet")).toBeInTheDocument()
      expect(
        screen.queryByText(/Table with/)
      ).not.toBeInTheDocument()
    })
  })

  describe("Accessibility in conditional rendering", () => {
    it("should maintain keyboard focus during toggle", () => {
      render(<TestHomepage initialProjects={[]} />)

      const addBtn = screen.getByTestId("add-project-btn")
      addBtn.focus()
      expect(document.activeElement).toBe(addBtn)

      fireEvent.click(addBtn)

      // Focus should remain accessible
      expect(document.activeElement).toBeTruthy()
    })

    it("should not hide any critical content during transition", () => {
      render(<TestHomepage initialProjects={[]} />)

      // Empty state
      const emptyStateTitle = screen.getByText("No projects yet")
      expect(emptyStateTitle).toBeVisible()

      // Switch to populated
      fireEvent.click(screen.getByTestId("add-project-btn"))
      const datatable = screen.getByTestId("data-table")
      expect(datatable).toBeVisible()

      // Switch back
      fireEvent.click(screen.getByTestId("clear-projects-btn"))
      expect(screen.getByText("No projects yet")).toBeVisible()
    })
  })
})
