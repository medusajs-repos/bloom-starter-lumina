import { indexedCurrency, priceAttribute } from "@/lib/search-client"
import type { Hit as HitType } from "instantsearch.js"

/**
 * The price fields are per currency, e.g. `min_price_usd`, so they're read
 * through `priceAttribute` rather than declared one by one.
 */
export type ProductHit = HitType<
  {
    title: string | null
    handle: string | null
    thumbnail: string | null
    category: string[] | null
    labels: string[] | null
    option_values: string[] | null
  } & Record<string, unknown>
>

const amount = (value: unknown) => (typeof value === "number" ? value : null)

export const hitPricing = (hit: ProductHit, currencyCode: string) => {
  const min_price = amount(hit[priceAttribute("min_price", currencyCode)])
  const original_price = amount(
    hit[priceAttribute("original_price", currencyCode)]
  )
  const on_sale =
    hit[priceAttribute("on_sale", currencyCode)] === true &&
    original_price !== null &&
    min_price !== null &&
    original_price > min_price

  return {
    currency_code: indexedCurrency(currencyCode),
    min_price,
    max_price: amount(hit[priceAttribute("max_price", currencyCode)]),
    original_price,
    on_sale,
    // The index dropped the precomputed percentage when it went per-currency.
    discount_percentage: on_sale
      ? Math.round(((original_price! - min_price!) / original_price!) * 100)
      : 0,
  }
}
