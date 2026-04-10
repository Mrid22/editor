import { useState } from "react"
import { EmptyState } from "@/components/empty-state"
import { DataTable, schema } from "@/components/data-table"
import { z } from "zod"

// Type definition for project data matching DataTable schema
type Project = z.infer<typeof schema>

// Mock project data - start with empty array to display EmptyState on launch
// This will be replaced with actual data loading from backend/storage
const mockProjects: Project[] = []

export default function App() {
  // State for managing projects - start with empty for empty state display
  // TODO: Replace with actual data loading from backend or local storage
  const [projects] = useState(mockProjects)

  return (
    <div className="w-full">
      {/* 
        Conditional rendering: Show EmptyState when no projects, 
        otherwise show DataTable with projects.
        This allows users to see the empty state on first launch
        and the project management interface once projects are added.
      */}
      {projects.length === 0 ? (
        <EmptyState
          onPrimaryClick={() => {
            // TODO: Wire to actual create project flow
            console.log("Create project clicked (placeholder)")
          }}
          onSecondaryClick={() => {
            // TODO: Wire to actual import project flow
            console.log("Import project clicked (placeholder)")
          }}
        />
      ) : (
        <DataTable data={projects} />
      )}
    </div>
  )
}
