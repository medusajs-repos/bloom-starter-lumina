import { useRouter, useRouterState } from "@tanstack/react-router"
import { history } from "instantsearch.js/es/lib/routers"
import { simple } from "instantsearch.js/es/lib/stateMappings"
import { useMemo, useRef } from "react"
import type { InstantSearchProps } from "react-instantsearch"

export const useSearchRouting = (): InstantSearchProps["routing"] => {
  const router = useRouter()
  const location = useRouterState({ select: (state) => state.location })

  const locationRef = useRef(location)
  locationRef.current = location

  return useMemo(
    () => ({
      stateMapping: simple(),
      router: history({
        cleanUrlOnDispose: false,
        push: (url) => {
          // InstantSearch hands over an absolute URL; TanStack wants an
          // app-relative href.
          const { pathname, search, hash } = new URL(url, window.location.origin)

          void router.navigate({
            href: `${pathname}${search}${hash}`,
            replace: false,
            resetScroll: false,
          })
        },
        getLocation: () => {
          if (typeof window !== "undefined") {
            return window.location
          }

          const { pathname, searchStr, hash } = locationRef.current

          return {
            protocol: "http:",
            hostname: "localhost",
            port: "",
            pathname,
            search: searchStr ?? "",
            hash: hash ?? "",
            href: `${pathname}${searchStr ?? ""}`,
          } as unknown as Location
        },
      }),
    }),
    [router]
  )
}

export default useSearchRouting
