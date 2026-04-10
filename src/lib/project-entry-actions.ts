export type ProjectEntryActionId = "create-project" | "import-project"

export type ProjectEntryActionVariant = "default" | "secondary"

export interface ProjectEntryAction {
  id: ProjectEntryActionId
  label: string
  variant: ProjectEntryActionVariant
  onTrigger: () => void
}

export interface ProjectEntryActionHandlers {
  onCreateProject: () => void
  onImportProject: () => void
}

export function createProjectEntryActions(
  handlers: ProjectEntryActionHandlers
): ProjectEntryAction[] {
  // Canonical source for entry actions shared by empty-state and table footer.
  return [
    {
      id: "create-project",
      label: "Create Project",
      variant: "default",
      onTrigger: handlers.onCreateProject,
    },
    {
      id: "import-project",
      label: "Import Project",
      variant: "secondary",
      onTrigger: handlers.onImportProject,
    },
  ]
}
