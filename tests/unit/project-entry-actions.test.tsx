import { describe, expect, it } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { ProjectEntryActions } from "@/components/project-entry-actions"
import { createEntryActionSpies } from "../fixtures/project-entry-actions"

describe("ProjectEntryActions", () => {
  it("renders labels in canonical order with expected variants", () => {
    const { actions } = createEntryActionSpies()
    render(<ProjectEntryActions actions={actions} />)

    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent("Create Project")
    expect(buttons[1]).toHaveTextContent("Import Project")
    expect(buttons[0]).toHaveAttribute("data-variant", "default")
    expect(buttons[1]).toHaveAttribute("data-variant", "secondary")
  })

  it("supports pointer activation for both actions", async () => {
    const user = userEvent.setup()
    const { actions, onCreateProject, onImportProject } = createEntryActionSpies()
    render(<ProjectEntryActions actions={actions} />)

    const buttons = screen.getAllByRole("button")
    await user.click(buttons[0])
    await user.click(buttons[1])

    expect(onCreateProject).toHaveBeenCalledTimes(1)
    expect(onImportProject).toHaveBeenCalledTimes(1)
  })

  it("supports keyboard activation for both actions", async () => {
    const user = userEvent.setup()
    const { actions, onCreateProject, onImportProject } = createEntryActionSpies()
    render(<ProjectEntryActions actions={actions} />)

    const buttons = screen.getAllByRole("button")
    buttons[0].focus()
    await user.keyboard("{Enter}")
    buttons[1].focus()
    await user.keyboard(" ")

    expect(onCreateProject).toHaveBeenCalledTimes(1)
    expect(onImportProject).toHaveBeenCalledTimes(1)
  })
})
