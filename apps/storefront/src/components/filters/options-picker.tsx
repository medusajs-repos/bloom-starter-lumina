import { useEffect, useState } from "react"
import { clsx } from "clsx"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "@medusajs/icons"
import { sdk } from "@/lib/utils/sdk"

type ProductOptionValue = {
  id: string
  value: string
}

type ProductOption = {
  id: string
  title: string
  is_exclusive?: boolean
  values: ProductOptionValue[]
}

interface OptionsPickerProps {
  selectedValueIds: string[]
  onChange: (valueIds: string[]) => void
}

/**
 * Sidebar picker for global (non-exclusive) product options. Selected
 * option-value IDs are surfaced back to the parent which is in charge of
 * threading them through to URL state and data fetching.
 */
export const OptionsPicker = ({
  selectedValueIds,
  onChange,
}: OptionsPickerProps) => {
  const [options, setOptions] = useState<ProductOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchOptions = async () => {
      setIsLoading(true)
      try {
        const response = await sdk.client.fetch<{
          product_options: ProductOption[]
        }>("/store/product-options", {
          query: {
            is_exclusive: false,
            fields: "*values",
            limit: 100,
          },
        })

        if (!cancelled) {
          setOptions(response.product_options || [])
        }
      } catch (e) {
        if (!cancelled) {
          // Surface nothing on the picker if the request fails — the
          // sidebar should not block product browsing.
          console.error("Failed to load global product options", e)
          setOptions([])
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchOptions()

    return () => {
      cancelled = true
    }
  }, [])

  const toggleValue = (valueId: string) => {
    const isSelected = selectedValueIds.includes(valueId)
    const next = isSelected
      ? selectedValueIds.filter((id) => id !== valueId)
      : [...selectedValueIds, valueId]
    onChange(Array.from(new Set(next)))
  }

  if (isLoading) {
    return (
      <div className="text-sm text-neutral-500 py-4">Loading options…</div>
    )
  }

  if (options.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-4">
        Options
      </h3>
      <Accordion.Root
        type="multiple"
        defaultValue={options.map((o) => o.id)}
        className="space-y-2"
      >
        {options.map((option) => {
          const values = option.values || []
          if (values.length === 0) return null

          return (
            <Accordion.Item
              key={option.id}
              value={option.id}
              className="border-b border-neutral-200 pb-4"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={clsx(
                    "flex items-center justify-between w-full py-2",
                    "text-sm font-medium text-neutral-900",
                    "group"
                  )}
                >
                  <span>{option.title}</span>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 text-neutral-600 transition-transform",
                      "group-data-[state=open]:rotate-180"
                    )}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => {
                    const isSelected = selectedValueIds.includes(value.id)
                    return (
                      <button
                        key={value.id}
                        type="button"
                        onClick={() => toggleValue(value.id)}
                        className={clsx(
                          "text-xs px-3 py-1.5 border transition-colors",
                          "rounded-none",
                          isSelected
                            ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                        )}
                      >
                        {value.value}
                      </button>
                    )
                  })}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}
