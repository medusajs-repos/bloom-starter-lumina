import type { ReactNode } from "react"

type RefinementSectionProps = {
  title: string
  children: ReactNode
  isVisible?: boolean
}

export const RefinementSection = ({
  title,
  children,
  isVisible = true,
}: RefinementSectionProps) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className="border-b border-neutral-200 py-5 first:pt-0 last:border-b-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-900">
        {title}
      </h3>
      {children}
    </div>
  )
}
