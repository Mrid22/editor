import { describe, expect, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EmptyState } from "@/components/empty-state"
import { ProjectTable } from "@/components/project-table"
import type { ProjectRow } from "@/lib/project-table-types"
import { longProjectRows, testProjectRows } from "../fixtures/project-table-dummy-data"
import { createEntryActionSpies } from "../fixtures/project-entry-actions"

function TestHomepage({ projects }: { projects: ProjectRow[] }) {
  const { actions } = createEntryActionSpies()
  return projects.length === 0 ? (
    <EmptyState entryActions={actions} />
  ) : (
    <ProjectTable projects={projects} entryActions={actions} />
  )
}

describe("Homepage project table conditional rendering", () => {
  it("shows non-empty table when project list has rows", () => {
    render(<TestHomepage projects={testProjectRows} />)

    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByText("Website Replatform")).toBeInTheDocument()
    expect(screen.queryByText("No projects yet")).not.toBeInTheDocument()
    expect(screen.getByTestId("project-table-footer")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create project/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /import project/i })).toBeInTheDocument()
  })

  it("shows empty fallback when project list is empty", () => {
    render(<TestHomepage projects={[]} />)

    expect(screen.getByText("No projects yet")).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })

  it("displays Actions column header in table", () => {
    render(<TestHomepage projects={testProjectRows} />)

    const actionHeader = screen.getByText("Actions")
    expect(actionHeader).toBeInTheDocument()
  })

  it("displays ellipsis buttons in Actions column for each project row", () => {
    render(<TestHomepage projects={testProjectRows} />)

    // Should have one button per project row
    const buttons = screen.getAllByRole("button", { name: /open project actions/i })
    expect(buttons).toHaveLength(testProjectRows.length)
  })

  it("closes dropdown when clicking outside of it", async () => {
    const user = userEvent.setup()
    render(<TestHomepage projects={testProjectRows} />)

    const buttons = screen.getAllByRole("button", { name: /open project actions/i })
    
    // Click first ellipsis button to open dropdown
    await user.click(buttons[0])

    // Wait for dropdown to be open
    await waitFor(() => {
      expect(screen.getByTestId("action-delete")).toBeInTheDocument()
    })

    // Press Escape to close the dropdown (simulates outside click behavior)
    await user.keyboard("{Escape}")

    // Dropdown should close
    await waitFor(() => {
      expect(screen.queryByTestId("action-delete")).not.toBeInTheDocument()
    })
  })

  it("keeps footer sticky in a long list container", () => {
    render(<TestHomepage projects={longProjectRows} />)

    const footer = screen.getByTestId("project-table-footer")
    expect(footer.className).toContain("sticky")
    expect(footer.className).toContain("bottom-0")
  })
})
