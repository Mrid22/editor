"use client"

import { ProjectEntryActions } from "@/components/project-entry-actions"
import {
  createProjectEntryActions,
  type ProjectEntryAction,
} from "@/lib/project-entry-actions"

/**
 * EmptyStateProps interface for customizing the empty state display.
 * All props are optional and have sensible defaults for homepage usage.
 */
export interface EmptyStateProps {
  /** Title message displayed when list is empty (default: "No projects yet") */
  title?: string
  /** Description/subtitle message (default: "You have no existing projects...") */
  description?: string
  /** Primary button label (default: "Create Project") */
  primaryButtonLabel?: string
  /** Secondary button label (default: "Import Project") */
  secondaryButtonLabel?: string
  /** Optional callback when primary button is clicked */
  onPrimaryClick?: () => void
  /** Optional callback when secondary button is clicked */
  onSecondaryClick?: () => void
  /** Optional pre-built shared actions from parent state */
  entryActions?: ProjectEntryAction[]
}

/**
 * EmptyState Component
 *
 * Renders a centered, responsive empty state UI for when a list/table has no items.
 * Uses shadcn Button component with built-in variants (default and secondary).
 * Includes customizable text and optional click handlers for placeholder buttons.
 *
 * @example
 * ```tsx
 * // Default usage (homepage)
 * <EmptyState />
 *
 * // Custom title and callbacks
 * <EmptyState
 *   title="No documents found"
 *   onPrimaryClick={() => openCreateDialog()}
 *   onSecondaryClick={() => openImportDialog()}
 * />
 * ```
 */
export function EmptyState({
  title = "No projects yet",
  description = "You have no existing projects. Create a new one to get started.",
  primaryButtonLabel = "Create Project",
  secondaryButtonLabel = "Import Project",
  onPrimaryClick,
  onSecondaryClick,
  entryActions,
}: EmptyStateProps) {
  const actions =
    entryActions ??
    createProjectEntryActions({
      onCreateProject: onPrimaryClick ?? (() => {}),
      onImportProject: onSecondaryClick ?? (() => {}),
    }).map((action) => {
      if (action.id === "create-project") {
        return { ...action, label: primaryButtonLabel }
      }

      if (action.id === "import-project") {
        return { ...action, label: secondaryButtonLabel }
      }

      return action
    })

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 px-4">
        {/* Title and description section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-base">{description}</p>
        </div>

        <ProjectEntryActions
          actions={actions}
          className="flex-col sm:flex-row"
        />
      </div>
    </div>
  )
}
