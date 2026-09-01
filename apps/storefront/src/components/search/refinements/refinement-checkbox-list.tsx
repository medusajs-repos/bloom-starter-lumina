import { RefinementSection } from "@/components/search/refinements/refinement-section"
import { Checkbox } from "@/components/ui/checkbox"
import { MAX_VALUES_PER_FACET } from "@/lib/search-facets"
import { useRefinementList } from "react-instantsearch"

type RefinementCheckboxListProps = {
  attribute: string
  title: string
  limit?: number
}

export const RefinementCheckboxList = ({
  attribute,
  title,
  limit = 10,
}: RefinementCheckboxListProps) => {
  const {
    items,
    refine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList({
    attribute,
    operator: "or",
    limit,
    showMore: true,
    showMoreLimit: MAX_VALUES_PER_FACET,
    sortBy: ["isRefined", "count:desc", "name:asc"],
  })

  return (
    <RefinementSection title={title} isVisible={items.length > 0}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.value}>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700 hover:text-neutral-900">
              <Checkbox
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                aria-label={item.label}
              />
              <span className={item.isRefined ? "font-medium" : undefined}>
                {item.label}
              </span>
              <span className="ml-auto text-xs text-neutral-500">
                {item.count}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {canToggleShowMore && (
        <button
          type="button"
          onClick={toggleShowMore}
          className="mt-3 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
        >
          {isShowingMore ? "Show less" : "Show more"}
        </button>
      )}
    </RefinementSection>
  )
}
