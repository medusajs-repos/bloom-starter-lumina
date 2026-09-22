import { Price } from "@/components/ui/price"
import { hitPricing, type ProductHit } from "@/lib/types/search"
import { Link } from "@tanstack/react-router"

type ProductHitCardProps = {
  hit: ProductHit
  countryCode: string
  regionCurrencyCode: string
}

export const ProductHitCard = ({
  hit,
  countryCode,
  regionCurrencyCode,
}: ProductHitCardProps) => {
  if (!hit.handle) {
    return null
  }

  const pricing = hitPricing(hit, regionCurrencyCode)
  const max = pricing.max_price ?? pricing.min_price
  const isRange = pricing.min_price !== null && (max ?? 0) > pricing.min_price

  return (
    <Link
      to="/$countryCode/products/$handle"
      params={{ countryCode, handle: hit.handle }}
      className="group flex flex-col"
      data-testid="product-hit"
    >
      {hit.thumbnail ? (
        <img
          src={hit.thumbnail}
          alt={hit.title ?? ""}
          className="aspect-[3/4] w-full bg-neutral-50 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[3/4] w-full items-center justify-center bg-neutral-50">
          <span className="text-xs text-neutral-500">No image</span>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600">
          {hit.title}
        </p>

        {pricing.min_price !== null && (
          <Price
            price={pricing.min_price}
            currencyCode={pricing.currency_code}
            textSize="small"
            type={isRange ? "range" : "default"}
            // A range already spans the discount, so the struck-through
            // original would describe only the cheapest variant.
            originalPrice={
              !isRange && pricing.on_sale
                ? {
                    price: pricing.original_price!,
                    percentage: String(pricing.discount_percentage),
                  }
                : undefined
            }
          />
        )}
      </div>
    </Link>
  )
}
