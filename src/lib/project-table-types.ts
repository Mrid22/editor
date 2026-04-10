export interface ProjectRow {
  id: string
  name: string
  path: string
  createdAt: string
}

export interface ProjectCollection {
  projects: ProjectRow[]
}

// Action types for the project table actions column
export type ProjectAction = "open-in" | "delete" | "share"

export interface ActionCellProps {
  projectId: string
  onAction: (action: ProjectAction, projectId: string) => void
}
