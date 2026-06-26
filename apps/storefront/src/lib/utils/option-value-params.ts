export const OPTION_VALUE_QUERY_KEY = "optionValueIds"

type SearchParamsLike =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | undefined
  | null

/**
 * Parses a list of option-value IDs from either a URLSearchParams instance
 * (client side) or a route-level searchParams record (server side).
 *
 * Supports both repeated keys (?optionValueIds=a&optionValueIds=b) and a
 * comma-separated single value (?optionValueIds=a,b).
 */
export const parseOptionValueIds = (input: SearchParamsLike): string[] => {
  if (!input) return []

  let raw: string[] = []

  if (input instanceof URLSearchParams) {
    raw = input.getAll(OPTION_VALUE_QUERY_KEY)
  } else {
    const value = (input as Record<string, string | string[] | undefined>)[
      OPTION_VALUE_QUERY_KEY
    ]
    if (Array.isArray(value)) {
      raw = value
    } else if (typeof value === "string") {
      raw = [value]
    }
  }

  const expanded: string[] = []
  raw.forEach((entry) => {
    if (!entry) return
    entry
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((id) => expanded.push(id))
  })

  return Array.from(new Set(expanded))
}
