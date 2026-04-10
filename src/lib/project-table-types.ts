export interface ProjectRow {
  id: string
  name: string
  path: string
  createdAt: string
}

export interface ProjectCollection {
  projects: ProjectRow[]
}
