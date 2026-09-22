import type { ProductHit } from "@/lib/types/search"
import { Thumbnail } from "@/components/ui/thumbnail"
import { Link } from "@tanstack/react-router"

export type { ProductHit }

type SearchHitProps = {
  hit: ProductHit
  countryCode: string
  onNavigate: () => void
}

export const SearchHit = ({ hit, countryCode, onNavigate }: SearchHitProps) => {
  if (!hit.handle) {
    return null
  }

  const category = hit.category?.[0]

  return (
    <li>
      <Link
        to="/$countryCode/products/$handle"
        params={{ countryCode, handle: hit.handle }}
        onClick={onNavigate}
        className="flex items-center gap-x-4 px-6 py-3 hover:bg-gray-50 transition-colors"
        data-testid="search-hit-link"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          alt={hit.title ?? ""}
          className="w-14 h-16 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900 line-clamp-2">
            {hit.title}
          </p>
          {category && (
            <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">
              {category}
            </p>
          )}
        </div>
      </Link>
    </li>
  )
}
