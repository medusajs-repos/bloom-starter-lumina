import { ProductHitCard } from "@/components/search/product-hit-card"
import { Button } from "@/components/ui/button"
import { useSearchSettled } from "@/lib/hooks/use-search-settled"
import type { ProductHit } from "@/lib/types/search"
import { useInfiniteHits, useInstantSearch } from "react-instantsearch"

type ProductSearchResultsProps = {
  countryCode: string
  regionCurrencyCode: string
}

const SkeletonGrid = () => (
  <div
    className="grid grid-cols-2 gap-6 pb-8 md:grid-cols-3 md:gap-8"
    data-testid="search-loading"
  >
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="flex flex-col gap-3">
        <div className="aspect-[3/4] w-full animate-pulse bg-neutral-200" />
        <div className="h-4 w-3/4 animate-pulse bg-neutral-200" />
        <div className="h-4 w-1/3 animate-pulse bg-neutral-200" />
      </div>
    ))}
  </div>
)

export const ProductSearchResults = ({
  countryCode,
  regionCurrencyCode,
}: ProductSearchResultsProps) => {
  const { items, showMore, showPrevious, isFirstPage, isLastPage } =
    useInfiniteHits<ProductHit>({ showPrevious: true })
  const { status, error } = useInstantSearch()
  const { hasNoResultsYet, resultsQuery, isSearching } = useSearchSettled()

  const hasResults = items.length > 0

  if (status === "error") {
    return (
      <p className="py-12 text-sm text-red-600" data-testid="search-error">
        Couldn&apos;t load products{error?.message ? `: ${error.message}` : "."}
      </p>
    )
  }

  if (hasResults) {
    return (
      <>
        {!isFirstPage && (
          <div className="mb-8 flex justify-center">
            <Button
              onClick={showPrevious}
              disabled={isSearching}
              variant="secondary"
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider"
              data-testid="load-previous"
            >
              {isSearching ? "Loading..." : "Load Previous"}
            </Button>
          </div>
        )}

        <div
          className="grid grid-cols-2 gap-6 pb-8 md:grid-cols-3 md:gap-8"
          data-testid="search-results"
        >
          {items.map((hit) => (
            <ProductHitCard
              key={hit.objectID}
              hit={hit}
              countryCode={countryCode}
              regionCurrencyCode={regionCurrencyCode}
            />
          ))}
        </div>
        {!isLastPage && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={showMore}
              disabled={isSearching}
              variant="secondary"
              className="px-8 py-3 text-xs font-semibold uppercase tracking-wider"
              data-testid="load-more"
            >
              {isSearching ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </>
    )
  }

  if (hasNoResultsYet) {
    return <SkeletonGrid />
  }

  return (
    <p className="py-12 text-neutral-600" data-testid="search-no-results">
      {resultsQuery
        ? `No products found for "${resultsQuery}".`
        : "No products match these filters."}
    </p>
  )
}
