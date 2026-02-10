import { LifestyleEditorial } from "@/components/sections/lifestyle-editorial"

const OurStory = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="relative z-10 content-container text-center pt-24">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-white mb-6 tracking-tight">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Where science meets nature for luminous, healthy skin
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-white">
        <div className="content-container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6 tracking-tight">
              Where It All Began
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto mb-6">
              LuminaSkin was born from a simple belief: your skin deserves ingredients that work in harmony with its natural processes. After years in pharmaceutical research, our founder witnessed the disconnect between harsh chemical treatments and what skin truly needs to thrive.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl mx-auto">
              We set out to create a different kind of skincare line, one that harnesses cutting-edge science while respecting the wisdom of botanical ingredients. Every formula is developed with clinical precision, tested for efficacy, and crafted to deliver visible results without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <LifestyleEditorial
        title="Our Formulation Philosophy"
        description="We formulate for real skin in real life. Every product is designed to work synergistically, addressing multiple skin concerns while supporting your skin's natural barrier. Inspired by both dermatological science and botanical traditions, we use only ingredients with proven efficacy. We partner with certified organic farms and sustainable suppliers to source the finest active ingredients. Each formula undergoes rigorous stability testing and clinical trials, ensuring it delivers measurable results you can see and feel."
        imageUrl="https://cdn.mignite.app/ws/works_01KGFKTHDC6ZD3WS7GQTX8992N/generated-01KGHSDRC8S3W0SDN3NM9DBDEY-01KGHSDRC8N7MA0ANZ24ASXJHT.jpeg"
      />

      {/* Core Values */}
      <section className="py-24 bg-neutral-50">
        <div className="content-container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6 tracking-tight">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Science-Backed
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Every formula is developed with clinical research, tested for safety and efficacy, delivering results you can measure.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Clean Beauty
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Formulated without harsh chemicals, parabens, or synthetic fragrances. Only ingredients that serve your skin's health.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Sustainable
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Responsibly sourced botanicals, recyclable packaging, and cruelty-free practices from ingredient to finished product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-24 bg-neutral-900 text-neutral-50">
        <div className="content-container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight text-white">
              Our Commitment to the Planet
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              We formulate for people who value efficacy over marketing hype, who seek results that endure, and who understand that true beauty starts with healthy skin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-800 p-8">
              <h3 className="text-lg font-display font-semibold mb-4 uppercase tracking-wide text-white">
                Full Ingredient Disclosure
              </h3>
              <p className="text-neutral-200 leading-relaxed">
                Complete transparency in every formula. We list every ingredient, its purpose, and source so you know exactly what you're putting on your skin.
              </p>
            </div>
            <div className="bg-neutral-800 p-8">
              <h3 className="text-lg font-display font-semibold mb-4 uppercase tracking-wide text-white">
                Cruelty-Free Always
              </h3>
              <p className="text-neutral-200 leading-relaxed">
                Never tested on animals, certified cruelty-free. Beautiful skin should never come at the cost of animal welfare.
              </p>
            </div>
            <div className="bg-neutral-800 p-8">
              <h3 className="text-lg font-display font-semibold mb-4 uppercase tracking-wide text-white">
                Sustainable Sourcing
              </h3>
              <p className="text-neutral-200 leading-relaxed">
                Organic botanicals from regenerative farms, fair-trade partnerships, and ethical ingredient sourcing that supports communities.
              </p>
            </div>
            <div className="bg-neutral-800 p-8">
              <h3 className="text-lg font-display font-semibold mb-4 uppercase tracking-wide text-white">
                Eco-Conscious Packaging
              </h3>
              <p className="text-neutral-200 leading-relaxed">
                Recyclable glass containers, biodegradable shipping materials, and refill programs to minimize waste at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-16 bg-sand-50 border-y border-neutral-200">
        <div className="content-container">
          <p className="text-xs uppercase tracking-widest text-neutral-500 text-center mb-12">
            As Featured In
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
            <div className="text-center">
              <p className="text-lg font-display font-semibold text-neutral-700 tracking-tight">Vogue Beauty</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-display font-semibold text-neutral-700 tracking-tight">Elle</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-display font-semibold text-neutral-700 tracking-tight">Allure</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-display font-semibold text-neutral-700 tracking-tight">Into The Gloss</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurStory
