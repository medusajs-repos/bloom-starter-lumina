import { Price } from "@/components/ui/price"
import type { ProductHit } from "@/lib/types/search"
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

  const currencyCode = hit.currency_code ?? ""
  const canShowPrice =
    typeof hit.min_price === "number" &&
    currencyCode.toLowerCase() === regionCurrencyCode.toLowerCase()
  const isOnSale =
    Boolean(hit.on_sale) &&
    typeof hit.original_price === "number" &&
    typeof hit.min_price === "number" &&
    hit.original_price > hit.min_price

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

        {canShowPrice && (
          <Price
            price={hit.min_price!}
            currencyCode={currencyCode}
            textSize="small"
            type="range"
            originalPrice={
              isOnSale
                ? {
                    price: hit.original_price!,
                    percentage: String(hit.discount_percentage ?? ""),
                  }
                : undefined
            }
          />
        )}
      </div>
    </Link>
  )
}
