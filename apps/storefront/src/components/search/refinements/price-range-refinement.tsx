import { RefinementSection } from "@/components/search/refinements/refinement-section"
import { Button } from "@/components/ui/button"
import { SEARCH_FACETS } from "@/lib/search-facets"
import { formatPrice } from "@/lib/utils/price"
import { useEffect, useState } from "react"
import { useRange } from "react-instantsearch"

type PriceRangeRefinementProps = {
  currencyCode: string
}

export const PriceRangeRefinement = ({
  currencyCode,
}: PriceRangeRefinementProps) => {
  const { start, range, refine, canRefine } = useRange({
    attribute: SEARCH_FACETS.minPrice,
  })

  const [minInput, setMinInput] = useState("")
  const [maxInput, setMaxInput] = useState("")

  const [startMin, startMax] = start

  useEffect(() => {
    setMinInput(
      typeof startMin === "number" && Number.isFinite(startMin)
        ? String(startMin)
        : ""
    )
    setMaxInput(
      typeof startMax === "number" && Number.isFinite(startMax)
        ? String(startMax)
        : ""
    )
  }, [startMin, startMax])

  const hasBounds =
    typeof range.min === "number" && typeof range.max === "number"

  return (
    <RefinementSection title="Price" isVisible={canRefine && hasBounds}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          refine([
            minInput === "" ? undefined : Number(minInput),
            maxInput === "" ? undefined : Number(maxInput),
          ])
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={range.min}
            max={range.max}
            step="any"
            value={minInput}
            onChange={(event) => setMinInput(event.target.value)}
            placeholder={range.min !== undefined ? String(range.min) : "Min"}
            aria-label="Minimum price"
            className="w-full border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
          />
          <span className="text-sm text-neutral-500">–</span>
          <input
            type="number"
            inputMode="decimal"
            min={range.min}
            max={range.max}
            step="any"
            value={maxInput}
            onChange={(event) => setMaxInput(event.target.value)}
            placeholder={range.max !== undefined ? String(range.max) : "Max"}
            aria-label="Maximum price"
            className="w-full border border-neutral-300 bg-white px-2 py-1.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
          />
        </div>

        {hasBounds && (
          <p className="mt-2 text-xs text-neutral-500">
            {formatPrice({ amount: range.min!, currency_code: currencyCode })} –{" "}
            {formatPrice({ amount: range.max!, currency_code: currencyCode })}
          </p>
        )}

        <Button
          type="submit"
          variant="secondary"
          size="fit"
          className="mt-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
        >
          Apply
        </Button>
      </form>
    </RefinementSection>
  )
}
