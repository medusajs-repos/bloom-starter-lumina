import { PRODUCT_INDEX_NAME, priceAttribute } from "@/lib/search-client"

export const SEARCH_FACETS = {
  category: "category",
  labels: "labels",
  optionValues: "option_values",
} as const

/**
 * The price facets are per currency, so the region's currency picks which set
 * is refined on.
 */
export const priceFacets = (currencyCode: string) => ({
  onSale: priceAttribute("on_sale", currencyCode),
  minPrice: priceAttribute("min_price", currencyCode),
})

export const MAX_VALUES_PER_FACET = 100

export const HITS_PER_PAGE = 12

export const getSortOptions = (currencyCode: string) => {
  const minPrice = priceAttribute("min_price", currencyCode)

  return [
    { label: "Relevance", value: PRODUCT_INDEX_NAME },
    { label: "Newest", value: `${PRODUCT_INDEX_NAME}/sort/created_at:desc` },
    {
      label: "Price: Low to High",
      value: `${PRODUCT_INDEX_NAME}/sort/${minPrice}:asc`,
    },
    {
      label: "Price: High to Low",
      value: `${PRODUCT_INDEX_NAME}/sort/${minPrice}:desc`,
    },
    { label: "A-Z", value: `${PRODUCT_INDEX_NAME}/sort/title:asc` },
  ]
}
