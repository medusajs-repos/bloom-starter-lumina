import { RefinementSection } from "@/components/search/refinements/refinement-section"
import { Checkbox } from "@/components/ui/checkbox"
import { SEARCH_FACETS } from "@/lib/search-facets"
import { useToggleRefinement } from "react-instantsearch"

export const SaleToggle = () => {
  const { value, refine, canRefine } = useToggleRefinement({
    attribute: SEARCH_FACETS.onSale,
    on: true,
  })

  return (
    <RefinementSection title="Offers" isVisible={canRefine || value.isRefined}>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900">
        <Checkbox
          checked={value.isRefined}
          onChange={() => refine(value)}
          aria-label="On sale only"
        />
        <span className={value.isRefined ? "font-medium" : undefined}>
          On sale only
        </span>
        {typeof value.count === "number" && (
          <span className="ml-auto text-xs text-neutral-500">{value.count}</span>
        )}
      </label>
    </RefinementSection>
  )
}
