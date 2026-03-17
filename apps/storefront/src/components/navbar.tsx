import { AccountDropdown } from "@/components/account-dropdown"
import { CartDropdown } from "@/components/cart"
import { MegaMenu } from "@/components/megamenu"
import { PredictiveSearch } from "@/components/search/predictive-search"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCategories } from "@/lib/hooks/use-categories"
import { useCollections } from "@/lib/hooks/use-collections"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "@tanstack/react-router"
import { EllipsisHorizontal, User } from "@medusajs/icons"
import { useState, useEffect } from "react"

export const Navbar = () => {
  const location = useLocation()
  const countryCode = getCountryCodeFromPath(location.pathname)
  const baseHref = countryCode ? `/${countryCode}` : ""
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { data: topLevelCategories } = useCategories({
    fields: "id,name,handle,parent_category_id,category_children.*",
    queryParams: { parent_category_id: "null" },
  })

  const { data: collections } = useCollections({
    fields: "id,title,handle",
  })

  const topsCategory = topLevelCategories?.find((cat) => cat.handle === "tops")
  const bottomsCategory = topLevelCategories?.find((cat) => cat.handle === "bottoms")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div 
        className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm isolate transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Announcement Bar */}
        <div className="bg-black py-2.5 text-center text-sm text-white font-normal tracking-wide">
          <p>Free shipping on all orders</p>
        </div>
        <header className="relative h-20 mx-auto border-b border-gray-200">
          <nav className="content-container flex items-center justify-between w-full h-full">
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-x-12 h-full">
              {/* Logo */}
              <Link
                to={baseHref || "/"}
                className="text-2xl font-display font-semibold hover:text-primary-700 tracking-tight transition-colors text-black"
              >
                Lumina
              </Link>

              {/* Desktop Navigation Links - MegaMenu */}
              <div className="hidden lg:flex items-center h-full">
                <MegaMenu baseHref={baseHref} />
              </div>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center gap-x-6 h-full">
              {/* Search */}
              <PredictiveSearch />

              {/* Account */}
              <AccountDropdown />

              {/* Cart */}
              <CartDropdown />

              {/* Mobile Menu */}
              <Drawer>
                <DrawerTrigger className="lg:hidden text-slate-700 hover:text-slate-900">
                  <EllipsisHorizontal className="w-6 h-6" />
                </DrawerTrigger>
                <DrawerContent side="left" className="bg-white">
                  <DrawerHeader>
                    <DrawerTitle className="font-display text-xl tracking-tight">Menu</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col py-4">
                    {/* Our Formulations */}
                    <DrawerClose asChild>
                      <Link
                        to={"/$countryCode/formulations" as string}
                        params={{ countryCode: countryCode || "us" }}
                        className="px-6 py-4 text-slate-900 text-base font-medium hover:bg-gray-50"
                      >
                        Our Formulations
                      </Link>
                    </DrawerClose>

                    {/* Experiences */}
                    <DrawerClose asChild>
                      <Link
                        to="/$countryCode/experiences"
                        params={{ countryCode: countryCode || "us" }}
                        className="px-6 py-4 text-slate-900 text-base font-medium hover:bg-gray-50"
                      >
                        Experiences
                      </Link>
                    </DrawerClose>

                    {/* Products & Prices */}
                    <DrawerClose asChild>
                      <Link
                        to="/$countryCode/store"
                        params={{ countryCode: countryCode || "us" }}
                        className="px-6 py-4 text-slate-900 text-base font-medium hover:bg-gray-50"
                      >
                        Products & Prices
                      </Link>
                    </DrawerClose>

                    {/* Skincare Guide */}
                    <DrawerClose asChild>
                      <Link
                        to="/$countryCode/skincare-guide"
                        params={{ countryCode: countryCode || "us" }}
                        className="px-6 py-4 text-slate-900 text-base font-medium hover:bg-gray-50"
                      >
                        Skincare Guide
                      </Link>
                    </DrawerClose>

                    {/* Account */}
                    <DrawerClose asChild>
                      <a
                        href={`${baseHref}/account`}
                        className="px-6 py-4 text-slate-900 text-base font-medium hover:bg-gray-50"
                      >
                        Account
                      </a>
                    </DrawerClose>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}
