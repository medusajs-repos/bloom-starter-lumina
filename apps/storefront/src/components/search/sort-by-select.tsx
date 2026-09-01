import { SORT_OPTIONS } from "@/lib/search-facets"
import { ChevronDown } from "@medusajs/icons"
import { useSortBy } from "react-instantsearch"

export const SortBySelect = () => {
  const { currentRefinement, options, refine } = useSortBy({
    items: SORT_OPTIONS.map((option) => ({ ...option })),
  })

  return (
    <label className="relative flex items-center gap-2 text-sm">
      <span className="hidden text-neutral-600 sm:inline">Sort by:</span>
      <span className="relative inline-flex items-center">
        <select
          value={currentRefinement}
          onChange={(event) => refine(event.target.value)}
          className="appearance-none border border-neutral-300 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-neutral-900 outline-none transition-colors hover:border-neutral-900 focus:border-neutral-900"
          data-testid="sort-select"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-neutral-600" />
      </span>
    </label>
  )
}
