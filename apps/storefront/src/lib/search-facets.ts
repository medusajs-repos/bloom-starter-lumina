import { PRODUCT_INDEX_NAME } from "@/lib/search-client"

export const SEARCH_FACETS = {
  category: "category",
  labels: "labels",
  optionValues: "option_values",
  onSale: "on_sale",
  minPrice: "min_price",
} as const

export const MAX_VALUES_PER_FACET = 100

export const HITS_PER_PAGE = 12

export const SORT_OPTIONS = [
  { label: "Relevance", value: PRODUCT_INDEX_NAME },
  { label: "Newest", value: `${PRODUCT_INDEX_NAME}/sort/created_at:desc` },
  { label: "Price: Low to High", value: `${PRODUCT_INDEX_NAME}/sort/min_price:asc` },
  { label: "Price: High to Low", value: `${PRODUCT_INDEX_NAME}/sort/min_price:desc` },
  { label: "A-Z", value: `${PRODUCT_INDEX_NAME}/sort/title:asc` },
] as const

export const SEARCH_PRICE_CURRENCY_CODE = "usd"
