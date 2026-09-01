import { SEARCH_FACETS } from "@/lib/search-facets"
import { XMark } from "@medusajs/icons"
import { useClearRefinements, useCurrentRefinements } from "react-instantsearch"

const ATTRIBUTE_LABELS: Record<string, string> = {
  [SEARCH_FACETS.category]: "Category",
  [SEARCH_FACETS.labels]: "Label",
  [SEARCH_FACETS.optionValues]: "Option",
  [SEARCH_FACETS.onSale]: "On sale",
  [SEARCH_FACETS.minPrice]: "Price",
}

export const AppliedRefinements = () => {
  const { items } = useCurrentRefinements()
  const { refine: clearAll, canRefine: canClearAll } = useClearRefinements()

  if (!items.length) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pb-6">
      {items.map((item) =>
        item.refinements.map((refinement) => {
          const attributeLabel =
            ATTRIBUTE_LABELS[item.attribute] ?? item.attribute
          const separator =
            item.attribute === SEARCH_FACETS.optionValues
              ? String(refinement.label).indexOf(":")
              : -1
          const prefix =
            separator > 0
              ? String(refinement.label).slice(0, separator)
              : attributeLabel
          const value =
            separator > 0
              ? String(refinement.label).slice(separator + 1)
              : refinement.label

          return (
            <button
              key={`${item.attribute}-${refinement.label}`}
              type="button"
              onClick={() => item.refine(refinement)}
              className="flex items-center gap-1.5 border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 transition-colors hover:border-neutral-900"
              data-testid="applied-refinement"
            >
              <span className="text-neutral-500">{prefix}:</span>
              <span className="font-medium">{value}</span>
              <XMark className="h-3 w-3 text-neutral-500" />
            </button>
          )
        })
      )}

      {canClearAll && (
        <button
          type="button"
          onClick={clearAll}
          className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 underline transition-colors hover:text-neutral-900"
          data-testid="clear-refinements"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
