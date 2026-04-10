import { Button } from "@/components/ui/button"
import type { ProjectEntryAction } from "@/lib/project-entry-actions"

export interface ProjectEntryActionsProps {
  actions: ProjectEntryAction[]
  className?: string
}

export function ProjectEntryActions({
  actions,
  className,
}: ProjectEntryActionsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className ?? ""}`.trim()}
      data-testid="project-entry-actions"
    >
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant}
          onClick={action.onTrigger}
          data-variant={action.variant}
          data-action-id={action.id}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
