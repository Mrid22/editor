import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { ProjectTable } from "@/components/project-table"
import { testProjectRows } from "../fixtures/project-table-dummy-data"
import { createEntryActionSpies } from "../fixtures/project-entry-actions"

describe("ProjectTable", () => {
  it("renders required table headers", () => {
    const { actions } = createEntryActionSpies()
    render(<ProjectTable projects={testProjectRows} entryActions={actions} />)

    expect(screen.getByRole("columnheader", { name: /project name/i })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: /path/i })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: /date created/i })).toBeInTheDocument()
  })

  it("renders one row per project", () => {
    const { actions } = createEntryActionSpies()
    render(<ProjectTable projects={testProjectRows} entryActions={actions} />)

    const dataRows = screen.getAllByTestId(/project-row-/)
    expect(dataRows).toHaveLength(testProjectRows.length)
  })

  it("shows end-biased path suffix and formatted date", () => {
    const { actions } = createEntryActionSpies()
    render(<ProjectTable projects={[testProjectRows[0]]} entryActions={actions} />)

    expect(screen.getByText(/React\/Next\/Website|Next\/Website/)).toBeInTheDocument()
    expect(screen.getByText("2026-04-01")).toBeInTheDocument()
  })

  it("rows are read-only (no click/open action)", () => {
    const clickSpy = vi.fn()
    render(
      <div onClick={clickSpy}>
        <ProjectTable projects={[testProjectRows[0]]} entryActions={createEntryActionSpies().actions} />
      </div>
    )

    fireEvent.click(screen.getByTestId("project-row-p-1"))
    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(screen.getByText("Website Replatform")).toBeInTheDocument()
  })
})
