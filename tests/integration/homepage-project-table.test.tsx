import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "@/components/empty-state"
import { ProjectTable } from "@/components/project-table"
import type { ProjectRow } from "@/lib/project-table-types"
import { testProjectRows } from "../fixtures/project-table-dummy-data"

function TestHomepage({ projects }: { projects: ProjectRow[] }) {
  return projects.length === 0 ? (
    <EmptyState />
  ) : (
    <ProjectTable projects={projects} />
  )
}

describe("Homepage project table conditional rendering", () => {
  it("shows non-empty table when project list has rows", () => {
    render(<TestHomepage projects={testProjectRows} />)

    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByText("Website Replatform")).toBeInTheDocument()
    expect(screen.queryByText("No projects yet")).not.toBeInTheDocument()
  })

  it("shows empty fallback when project list is empty", () => {
    render(<TestHomepage projects={[]} />)

    expect(screen.getByText("No projects yet")).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })
})
