import { RefinementSection } from "@/components/search/refinements/refinement-section"
import { Checkbox } from "@/components/ui/checkbox"
import { MAX_VALUES_PER_FACET, SEARCH_FACETS } from "@/lib/search-facets"
import { useMemo } from "react"
import { useRefinementList } from "react-instantsearch"

export const OptionValuesRefinement = () => {
  const { items, refine } = useRefinementList({
    attribute: SEARCH_FACETS.optionValues,
    operator: "or",
    limit: MAX_VALUES_PER_FACET,
    sortBy: ["name:asc"],
  })

  const groups = useMemo(() => {
    const byOption = new Map<string, typeof items>()

    for (const item of items) {
      const separator = item.label.indexOf(":")

      // A value with no `:` has no option title to group it under.
      if (separator <= 0) {
        continue
      }

      const optionTitle = item.label.slice(0, separator)
      const existing = byOption.get(optionTitle)

      if (existing) {
        existing.push(item)
      } else {
        byOption.set(optionTitle, [item])
      }
    }

    return Array.from(byOption.entries()).sort(([left], [right]) =>
      left.localeCompare(right)
    )
  }, [items])

  return (
    <>
      {groups.map(([optionTitle, optionItems]) => (
        <RefinementSection key={optionTitle} title={optionTitle}>
          <ul className="space-y-2">
            {optionItems.map((item) => {
              const value = item.label.slice(item.label.indexOf(":") + 1)

              return (
                <li key={item.value}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900">
                    <Checkbox
                      checked={item.isRefined}
                      onChange={() => refine(item.value)}
                      aria-label={`${optionTitle}: ${value}`}
                    />
                    <span className={item.isRefined ? "font-medium" : undefined}>
                      {value}
                    </span>
                    <span className="ml-auto text-xs text-neutral-500">
                      {item.count}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </RefinementSection>
      ))}
    </>
  )
}
