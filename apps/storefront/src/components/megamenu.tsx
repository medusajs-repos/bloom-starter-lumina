import { Link } from "@tanstack/react-router"
import { useState } from "react"

interface MegaMenuProps {
  baseHref: string
}

export const MegaMenu = ({ baseHref }: MegaMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const formulationsLinks = [
    { name: "Custom Formulations", href: `${baseHref}/formulations/custom` },
    { name: "Anti-Aging Solutions", href: `${baseHref}/formulations/anti-aging` },
    { name: "Acne Treatment", href: `${baseHref}/formulations/acne` },
    { name: "Hyperpigmentation", href: `${baseHref}/formulations/hyperpigmentation` },
    { name: "Rosacea Care", href: `${baseHref}/formulations/rosacea` },
  ]

  return (
    <div className="relative">
      {/* Navigation Items */}
      <div className="flex items-center gap-x-8 h-full">
        {/* Our Formulations - with dropdown */}
        <div
          className="h-full flex items-center relative"
          onMouseEnter={() => setActiveMenu("formulations")}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="text-black hover:text-primary-700 transition-colors text-sm py-2 font-medium flex items-center gap-1 h-full">
            Our Formulations
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${
                activeMenu === "formulations" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Invisible bridge to prevent gap */}
          {activeMenu === "formulations" && (
            <div className="fixed left-0 right-0 top-[80px] h-[40px] z-40" />
          )}

          {/* Mega Menu Dropdown */}
          <div
            className={`fixed left-0 right-0 top-[120px] bg-white border-t border-gray-200 shadow-xl z-40 transition-all duration-300 ease-out ${
              activeMenu === "formulations"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="max-w-[1400px] mx-auto px-8 py-12">
              <h3 className="text-2xl font-bold mb-8 text-black">Our Formulations</h3>
              <div className="grid grid-cols-3 gap-8">
                {/* Hydrating Moisturizer */}
                <div className="group">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden w-40 h-40">
                    <img
                      src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_1-01KH1E4PN6PDQP1F9T4HER2YJ3.jpeg"
                      alt="Hydrating Moisturizer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Hydrating Moisturizer
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    Formulated with hyaluronic acid and ceramides. Perfect for dry and dehydrated skin.
                  </p>
                  <Link
                    to="/$countryCode/formulations/hydrating-moisturizer"
                    params={{ countryCode: baseHref.replace("/", "") || "us" }}
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>

                {/* Balancing Moisturizer */}
                <div className="group">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden w-40 h-40">
                    <img
                      src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_2-01KH1E4P68ZJRG02PCQ7PPH8GV.jpeg"
                      alt="Balancing Moisturizer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Balancing Moisturizer
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    Enriched with niacinamide and zinc. Ideal for combination and oily skin.
                  </p>
                  <Link
                    to="/$countryCode/formulations/balancing-moisturizer"
                    params={{ countryCode: baseHref.replace("/", "") || "us" }}
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>

                {/* Protective Moisturizer */}
                <div className="group">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden w-40 h-40">
                    <img
                      src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_3-01KH1E4NR0WTY04ZSNDWJZQHJS.jpeg"
                      alt="Protective Moisturizer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Protective Moisturizer
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    Powered by antioxidants and SPF 30. Best for all skin types seeking daily protection.
                  </p>
                  <Link
                    to="/$countryCode/formulations/protective-moisturizer"
                    params={{ countryCode: baseHref.replace("/", "") || "us" }}
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experiences - direct link */}
        <Link
          to="/$countryCode/experiences"
          params={{ countryCode: baseHref.replace("/", "") || "us" }}
          className="text-black hover:text-primary-700 transition-colors text-sm py-2 font-medium"
        >
          Experiences
        </Link>

        {/* Products & Prices - direct link */}
        <Link
          to="/$countryCode/store"
          params={{ countryCode: baseHref.replace("/", "") || "us" }}
          className="text-black hover:text-primary-700 transition-colors text-sm py-2 font-medium"
        >
          Products & Prices
        </Link>

        {/* Skincare Guide - direct link */}
        <Link
          to="/$countryCode/skincare-guide"
          params={{ countryCode: baseHref.replace("/", "") || "us" }}
          className="text-black hover:text-primary-700 transition-colors text-sm py-2 font-medium"
        >
          Skincare Guide
        </Link>
      </div>
    </div>
  )
}
