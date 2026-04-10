import { useState } from "react"
import { EmptyState } from "@/components/empty-state"
import { ProjectTable } from "@/components/project-table"
import { projectDummyData } from "@/app/dashboard/project-dummy-data"
import type { ProjectRow } from "@/lib/project-table-types"

// Dummy project data for non-empty state validation in this phase.
// Real add/import and persistence flows are intentionally out of scope.
const mockProjects: ProjectRow[] = projectDummyData

export default function App() {
  // State determines which homepage branch to render.
  // Non-empty shows the read-only project table; empty keeps the fallback state.
  const [projects] = useState(mockProjects)

  return (
    <div className="w-full">
      {/* Conditional rendering keeps empty fallback intact while enabling non-empty table state. */}
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectTable projects={projects} />
      )}
    </div>
  )
}
