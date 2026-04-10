import type { ProjectRow } from "@/lib/project-table-types"

export const testProjectRows: ProjectRow[] = [
  {
    id: "p-1",
    name: "Website Replatform",
    path: "~/Coding/Websites/React/Next/Website",
    createdAt: "2026-04-01T12:00:00Z",
  },
  {
    id: "p-2",
    name: "Docs Generator",
    path: "~/Coding/Tools/Docs/Generator",
    createdAt: "2026-03-18T09:30:00Z",
  },
  {
    id: "p-3",
    name: "Design System",
    path: "~/Coding/Frontend/Design/System",
    createdAt: "invalid-date",
  },
]

// Long-list fixture used to validate sticky footer behavior in tall table containers.
export const longProjectRows: ProjectRow[] = Array.from({ length: 20 }, (_, index) => ({
  id: `lp-${index + 1}`,
  name: `Large Project ${index + 1}`,
  path: `~/Coding/Workspace/Large/Project/${index + 1}`,
  createdAt: "2026-04-01T12:00:00Z",
}))
