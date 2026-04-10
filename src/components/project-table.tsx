import React from "react"
import { MoreHorizontal } from "lucide-react"
import type { ProjectRow, ProjectAction, ActionCellProps } from "@/lib/project-table-types"
import type { ProjectEntryAction } from "@/lib/project-entry-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ProjectEntryActions } from "@/components/project-entry-actions"
import {
  formatDateYYYYMMDD,
  formatPathSuffix,
} from "@/lib/project-table-formatters"

interface ProjectTableProps {
  projects: ProjectRow[]
  entryActions: ProjectEntryAction[]
}

/**
 * ActionCell sub-component: Renders the ellipsis dropdown button for a single project row.
 * Manages dropdown state locally and invokes onAction callback when user selects an action.
 */
export function ActionCell({ projectId, onAction }: ActionCellProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleAction = (action: ProjectAction) => {
    // Invoke the parent callback with selected action and project ID
    onAction(action, projectId)
    // Close dropdown after action is selected
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Open project actions"
          className="h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleAction("open-in")}
          data-testid="action-open-in"
        >
          Open In
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("delete")}
          data-testid="action-delete"
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleAction("share")}
          data-testid="action-share"
        >
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ProjectTable({ projects, entryActions }: ProjectTableProps) {
  // Handler for action selection (currently logs; future implementation will add functionality)
  const handleActionClick = (action: ProjectAction, projectId: string) => {
    console.log(`Action '${action}' selected for project '${projectId}'`)
    // Future: Connect to actual handlers for open-in, delete, share
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full p-4 sm:p-6">
        <div className="max-h-[70vh] overflow-y-auto rounded-lg border" data-testid="project-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} data-testid={`project-row-${project.id}`}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell title={project.path}>{formatPathSuffix(project.path)}</TableCell>
                  <TableCell>{formatDateYYYYMMDD(project.createdAt)}</TableCell>
                  <TableCell>
                    <ActionCell
                      projectId={project.id}
                      onAction={handleActionClick}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Sticky footer keeps shared entry actions available during long list scroll. */}
          <div
            className="sticky bottom-0 border-t bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80"
            data-testid="project-table-footer"
          >
            <ProjectEntryActions actions={entryActions} />
          </div>
        </div>
      </div>
    </div>
  )
}
