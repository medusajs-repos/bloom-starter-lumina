import type { Hit as HitType } from "instantsearch.js"

export type ProductHit = HitType<{
  title: string | null
  handle: string | null
  thumbnail: string | null
  category: string[] | null
  labels: string[] | null
  option_values: string[] | null
  currency_code: string | null
  min_price: number | null
  original_price: number | null
  on_sale: boolean | null
  discount_percentage: number | null
}>
