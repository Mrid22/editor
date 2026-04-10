import type { ProjectRow } from "@/lib/project-table-types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatDateYYYYMMDD,
  formatPathSuffix,
} from "@/lib/project-table-formatters"

interface ProjectTableProps {
  projects: ProjectRow[]
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="min-h-screen flex items-center">
      <div className="w-full p-4 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} data-testid={`project-row-${project.id}`}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell title={project.path}>{formatPathSuffix(project.path)}</TableCell>
                <TableCell>{formatDateYYYYMMDD(project.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
