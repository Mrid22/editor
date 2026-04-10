import { vi } from "vitest"
import { createProjectEntryActions } from "@/lib/project-entry-actions"

export const createEntryActionSpies = () => {
  const onCreateProject = vi.fn()
  const onImportProject = vi.fn()

  return {
    onCreateProject,
    onImportProject,
    actions: createProjectEntryActions({
      onCreateProject,
      onImportProject,
    }),
  }
}
