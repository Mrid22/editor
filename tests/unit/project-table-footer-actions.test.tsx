import { describe, expect, it } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { ProjectTable } from "@/components/project-table"
import { testProjectRows } from "../fixtures/project-table-dummy-data"
import { createEntryActionSpies } from "../fixtures/project-entry-actions"

describe("ProjectTable footer actions", () => {
  it("renders sticky footer and both action labels", () => {
    const { actions } = createEntryActionSpies()
    render(<ProjectTable projects={testProjectRows} entryActions={actions} />)

    const footer = screen.getByTestId("project-table-footer")
    expect(footer).toBeInTheDocument()
    expect(footer.className).toContain("sticky")
    expect(footer.className).toContain("bottom-0")
    expect(screen.getByRole("button", { name: /create project/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /import project/i })).toBeInTheDocument()
  })

  it("supports keyboard activation via tab + enter/space", async () => {
    const user = userEvent.setup()
    const { actions, onCreateProject, onImportProject } = createEntryActionSpies()
    render(<ProjectTable projects={testProjectRows} entryActions={actions} />)

    const createButton = screen.getByRole("button", { name: /create project/i })
    createButton.focus()
    await user.keyboard("{Enter}")

    const importButton = screen.getByRole("button", { name: /import project/i })
    importButton.focus()
    await user.keyboard(" ")

    expect(onCreateProject).toHaveBeenCalledTimes(1)
    expect(onImportProject).toHaveBeenCalledTimes(1)
  })

  it("invokes callbacks in create then import order", async () => {
    const user = userEvent.setup()
    const { actions, onCreateProject, onImportProject } = createEntryActionSpies()
    render(<ProjectTable projects={testProjectRows} entryActions={actions} />)

    await user.click(screen.getByRole("button", { name: /create project/i }))
    await user.click(screen.getByRole("button", { name: /import project/i }))

    expect(onCreateProject.mock.invocationCallOrder[0]).toBeLessThan(
      onImportProject.mock.invocationCallOrder[0]
    )
  })
})
