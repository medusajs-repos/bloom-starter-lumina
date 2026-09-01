import { ProductSearchResults } from "@/components/search/product-search-results"
import { AppliedRefinements } from "@/components/search/refinements/applied-refinements"
import { OptionValuesRefinement } from "@/components/search/refinements/option-values-refinement"
import { PriceRangeRefinement } from "@/components/search/refinements/price-range-refinement"
import { RefinementCheckboxList } from "@/components/search/refinements/refinement-checkbox-list"
import { SaleToggle } from "@/components/search/refinements/sale-toggle"
import { SortBySelect } from "@/components/search/sort-by-select"
import { useSearchRouting } from "@/lib/hooks/use-search-routing"
import { PRODUCT_INDEX_NAME, searchClient } from "@/lib/search-client"
import {
  HITS_PER_PAGE,
  MAX_VALUES_PER_FACET,
  SEARCH_FACETS,
  SEARCH_PRICE_CURRENCY_CODE,
} from "@/lib/search-facets"
import { useLoaderData } from "@tanstack/react-router"
import type { SearchClient } from "instantsearch.js"
import { Configure, InstantSearch, useStats } from "react-instantsearch"

const ResultCount = () => {
  const { nbHits } = useStats()

  return (
    <span className="text-sm text-neutral-600" data-testid="result-count">
      {nbHits} {nbHits === 1 ? "product" : "products"}
    </span>
  )
}

type StoreSearchProps = {
  countryCode: string
  regionCurrencyCode: string
}

const StoreSearch = ({ countryCode, regionCurrencyCode }: StoreSearchProps) => {
  return (
    <>
      <div className="flex items-center justify-end gap-6 border-b border-neutral-200 py-6">
        <SortBySelect />
        <ResultCount />
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="w-full flex-shrink-0 lg:w-64" data-testid="filters">
          <RefinementCheckboxList
            attribute={SEARCH_FACETS.category}
            title="Category"
          />
          <RefinementCheckboxList
            attribute={SEARCH_FACETS.labels}
            title="Labels"
          />
          <OptionValuesRefinement />
          <SaleToggle />
          <PriceRangeRefinement
            currencyCode={SEARCH_PRICE_CURRENCY_CODE}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <AppliedRefinements />
          <ProductSearchResults
            countryCode={countryCode}
            regionCurrencyCode={regionCurrencyCode}
          />
        </div>
      </div>
    </>
  )
}

const Store = () => {
  const loaderData = useLoaderData({ from: "/$countryCode/store" })
  const { region, countryCode } = loaderData || {}
  const routing = useSearchRouting()

  return (
    <div className="content-container pb-12 pt-40">
      <div className="mb-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900">
          All Products
        </h1>
      </div>

      <InstantSearch
        indexName={PRODUCT_INDEX_NAME}
        searchClient={searchClient as unknown as SearchClient}
        routing={routing}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Configure
          hitsPerPage={HITS_PER_PAGE}
          maxValuesPerFacet={MAX_VALUES_PER_FACET}
        />
        <StoreSearch
          countryCode={countryCode}
          regionCurrencyCode={region?.currency_code ?? ""}
        />
      </InstantSearch>
    </div>
  )
}

export default Store
