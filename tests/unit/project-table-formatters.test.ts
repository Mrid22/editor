import { describe, expect, it } from "vitest"
import {
  formatDateYYYYMMDD,
  formatPathSuffix,
} from "@/lib/project-table-formatters"

describe("project-table-formatters", () => {
  describe("formatDateYYYYMMDD", () => {
    it("formats valid dates to YYYY-MM-DD", () => {
      expect(formatDateYYYYMMDD("2026-04-10T14:22:00Z")).toBe("2026-04-10")
    })

    it("returns fallback for malformed values", () => {
      expect(formatDateYYYYMMDD("bad-date")).toBe("Invalid date")
    })
  })

  describe("formatPathSuffix", () => {
    it("prefers trailing path segments over leading segments", () => {
      const value = "~/Coding/Websites/React/Next/Website"
      const output = formatPathSuffix(value, 32)
      expect(["React/Next/Website", "Next/Website"]).toContain(output)
    })

    it("returns a tail-preserving ellipsis fallback when still too long", () => {
      const value = "~/Very/Long/Nested/Directory/Structure/With/Project"
      const output = formatPathSuffix(value, 14)
      expect(["With/Project", "...ith/Project"]).toContain(output)
      expect(output.endsWith("Project")).toBe(true)
    })
  })
})
