export function formatDateYYYYMMDD(input: string): string {
  const parsed = new Date(input)

  if (Number.isNaN(parsed.getTime())) {
    return "Invalid date"
  }

  return parsed.toISOString().slice(0, 10)
}

export function formatPathSuffix(path: string, maxLength = 28): string {
  if (!path) {
    return ""
  }

  const normalized = path.replace(/\\/g, "/")
  const segments = normalized.split("/").filter(Boolean)

  if (segments.length === 0) {
    return path
  }

  const lastThree = segments.slice(-3).join("/")
  if (lastThree.length <= maxLength) {
    return lastThree
  }

  const lastTwo = segments.slice(-2).join("/")
  if (lastTwo.length <= maxLength) {
    return lastTwo
  }

  // Preserve the path ending even when aggressively truncated.
  return `...${lastTwo.slice(-(maxLength - 3))}`
}
