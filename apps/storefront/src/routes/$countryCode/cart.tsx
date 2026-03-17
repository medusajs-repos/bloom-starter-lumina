import { createFileRoute, notFound } from "@tanstack/react-router"
import Cart from "@/pages/cart"
import { getRegion } from "@/lib/data/regions"
import { sanitize } from "@/lib/utils/sanitize"

export const Route = createFileRoute("/$countryCode/cart")({
  loader: async ({ params, context }) => {
    const { countryCode } = params
    const { queryClient } = context

    const region = await queryClient.ensureQueryData({
      queryKey: ["region", countryCode],
      queryFn: () => getRegion({ country_code: countryCode }),
    })

    if (!region) {
      throw notFound()
    }

    return sanitize({
      region,
      countryCode,
    })
  },
  component: Cart,
})