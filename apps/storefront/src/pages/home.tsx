import { useLocation, useLoaderData, Link } from "@tanstack/react-router"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { useProducts } from "@/lib/hooks/use-products"
import { ArrowRight } from "@medusajs/icons"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const Home = () => {
  const location = useLocation()
  const { region } = useLoaderData({ from: "/$countryCode/" })
  const countryCode = getCountryCodeFromPath(location.pathname)
  const baseHref = countryCode ? `/${countryCode}` : ""

  const { data: productsData } = useProducts({
    region_id: region?.id,
    query_params: { 
      limit: 3,
      fields: "id,title,handle,thumbnail,*images,*variants,*variants.calculated_price",
    },
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )

    const sections = document.querySelectorAll(".fade-in-section")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [productsData])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] pt-24 flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
        <div className="relative z-10 content-container">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-[0.95] tracking-tight">
              Precision
              <br />
              <span className="text-blue-300">Skincare</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-14 max-w-xl leading-relaxed">
              Scientifically formulated treatments tailored to your unique biology
            </p>
            <div className="flex gap-4">
              <Link to="/$countryCode/quiz" params={{ countryCode: countryCode || "us" }}>
                <Button
                  size="fit"
                  className="bg-black hover:bg-gray-900 text-white px-12 py-6 text-base font-bold rounded-lg"
                >
                  <ArrowRight className="mr-2" />
                  Find Your Match
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white fade-in-section">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-sm font-medium text-primary-700 mb-4 tracking-wide uppercase">Our Approach</p>
              <h2 className="text-5xl md:text-6xl font-display text-black mb-8 leading-tight">
                Engineered for Your Skin
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every formulation is built on dermatological research and precision testing. We create targeted solutions that work with your skin's natural biology.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Clean ingredients. Clinical results. Zero compromise.
              </p>
            </div>
            <div className="relative h-[520px] overflow-hidden">
              <img 
                src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/lumina_hero-01KH1H2FQP8T2EHQ08FX6BP5EW.png" 
                alt="Minimalist skincare ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white fade-in-section">
        <div className="content-container">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-primary-700 mb-4 tracking-wide uppercase">Core Principles</p>
            <h2 className="text-5xl md:text-6xl font-display text-black mb-6">
              Science-First Skincare
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-black mb-4">
                Clinical Testing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every product undergoes rigorous dermatological testing for safety and efficacy.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-black mb-4">
                Clean Formulas
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Transparent ingredient lists. No harmful additives or unnecessary fillers.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display text-black mb-4">
                Personalized
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Targeted treatments designed for your specific skin type and concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      {productsData && productsData.pages?.[0]?.products && productsData.pages[0].products.length > 0 && (
        <section className="py-32 bg-gray-50 fade-in-section">
          <div className="content-container">
            <div className="mb-20">
              <p className="text-sm font-medium text-primary-700 mb-4 tracking-wide uppercase">Featured</p>
              <h2 className="text-5xl md:text-6xl font-display text-black mb-6">
                Our Formulations
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {productsData.pages[0].products.slice(0, 3).map((product: any) => (
                <Link 
                  key={product.id} 
                  to="/$countryCode/products/$handle"
                  params={{ countryCode: countryCode || "us", handle: product.handle }}
                  className="group block"
                >
                  <div className="aspect-square bg-white overflow-hidden mb-5 group-hover:shadow-lg transition-all duration-300 rounded-lg">
                    {product.thumbnail && (
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-display text-black mb-2 group-hover:text-primary-700 transition-colors">
                    {product.title}
                  </h3>
                  {product.variants?.[0]?.calculated_price && (
                    <p className="text-gray-700">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: product.variants[0].calculated_price.currency_code,
                      }).format(product.variants[0].calculated_price.calculated_amount || 0)}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-16">
              <Link to="/$countryCode/store" params={{ countryCode: countryCode || "us" }}>
                <Button
                  variant="secondary"
                  size="fit"
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full px-10"
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 fade-in-section">
        <div className="content-container text-center">
          <h2 className="text-5xl md:text-6xl font-display text-white mb-8 leading-tight">
            Start Your Journey
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-light">
            Take our personalized quiz to discover the perfect formulation for your skin's unique needs
          </p>
          <Link to="/$countryCode/quiz" params={{ countryCode: countryCode || "us" }}>
            <Button
              size="fit"
              className="bg-white hover:bg-frost-50 text-slate-900 px-12 py-6 text-base font-medium rounded-sm"
            >
              Take the Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
