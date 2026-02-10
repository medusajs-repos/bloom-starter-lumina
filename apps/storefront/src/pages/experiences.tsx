import { Star } from "@medusajs/icons"
import { useState } from "react"

const experiences = [
  {
    id: 1,
    name: "Sophie M.",
    age: 32,
    location: "Berlin",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQ4S2PGS29YQRSE42Q4B5-01KH3CQ4S2RX2RKHG5BYB6N2R8.jpeg",
    concern: "Dehydration & Fine Lines",
    product: "Hydrating Serum",
    duration: "8 weeks",
    rating: 5,
    quote: "After years of struggling with dehydrated skin, I finally found a serum that actually works. My skin feels plump, hydrated, and the fine lines around my eyes have visibly reduced. This has become my holy grail product.",
    results: ["Improved hydration", "Reduced fine lines", "Plumper skin texture"]
  },
  {
    id: 2,
    name: "Emma L.",
    age: 28,
    location: "Amsterdam",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQ63WQW09FJXEJ2NT7HVV-01KH3CQ63WBGAVEXGVNVB4DKTE.jpeg",
    concern: "Sensitivity & Redness",
    product: "Calming Moisturizer",
    duration: "6 weeks",
    rating: 5,
    quote: "My sensitive skin has never felt this calm. The redness that used to flare up daily has dramatically reduced. I can finally go makeup-free with confidence. This moisturizer changed everything for me.",
    results: ["Reduced redness", "Less sensitivity", "Stronger skin barrier"]
  },
  {
    id: 3,
    name: "Clara R.",
    age: 35,
    location: "Copenhagen",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQ787WJ821HAQD8Q2ZJZW-01KH3CQ788C58891DC5QTG7XDP.jpeg",
    concern: "Dullness & Uneven Tone",
    product: "Brightening Serum",
    duration: "10 weeks",
    rating: 5,
    quote: "I was skeptical at first, but the results speak for themselves. My skin has a natural glow now that people actually comment on. The dark spots have faded and my complexion looks so much more even. Worth every cent.",
    results: ["Brighter complexion", "Faded dark spots", "Natural radiance"]
  },
  {
    id: 4,
    name: "Lena K.",
    age: 26,
    location: "Vienna",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQ8MBVYFCP2TPVZW4H8F5-01KH3CQ8MB69DAE58P16XMAMRS.jpeg",
    concern: "Acne-Prone & Oily",
    product: "Balancing Serum",
    duration: "12 weeks",
    rating: 5,
    quote: "Finally, a product that balances my oily skin without stripping it. My breakouts have significantly decreased and my skin texture is smoother than it's been in years. I wish I had found this sooner.",
    results: ["Fewer breakouts", "Balanced oil production", "Smoother texture"]
  },
  {
    id: 5,
    name: "Anna S.",
    age: 40,
    location: "Munich",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQDX9QEMZEE117V6K7D66-01KH3CQDX967QQ7J492R3AS7PB.jpeg",
    concern: "Aging & Loss of Firmness",
    product: "Protective Serum",
    duration: "16 weeks",
    rating: 5,
    quote: "At 40, I wasn't expecting miracles, but this serum has genuinely transformed my skin. My face looks more lifted, the deep lines have softened, and my skin feels firmer. I get compliments constantly now.",
    results: ["Firmer skin", "Reduced deep lines", "More youthful appearance"]
  },
  {
    id: 6,
    name: "Julia N.",
    age: 29,
    location: "Stockholm",
    image: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/generated-01KH3CQFA3EAB4303NNSYY34VQ-01KH3CQFA35T6SPSDXF26W3YM7.jpeg",
    concern: "Dryness & Tightness",
    product: "Nourishing Moisturizer",
    duration: "7 weeks",
    rating: 5,
    quote: "Living in a harsh Nordic climate, my skin was constantly tight and uncomfortable. This moisturizer has been a game changer. My skin stays hydrated all day, and that tight feeling is completely gone.",
    results: ["All-day hydration", "No more tightness", "Comfortable skin"]
  }
]

const stats = [
  { value: "96%", label: "Customer satisfaction rate" },
  { value: "10,000+", label: "Happy customers" },
  { value: "4.9/5", label: "Average rating" }
]

const Experiences = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const filters = [
    { id: "all", label: "All Experiences" },
    { id: "serum", label: "Serums" },
    { id: "moisturizer", label: "Moisturizers" }
  ]

  const filteredExperiences = experiences.filter(exp => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "serum") return exp.product.includes("Serum")
    if (selectedFilter === "moisturizer") return exp.product.includes("Moisturizer")
    return true
  })

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-sage-50 to-white">
        <div className="content-container text-center">
          <h1 className="text-5xl md:text-7xl font-display font-light text-neutral-900 mb-6 tracking-tight">
            Real Results,
            <br />
            <span className="font-semibold">Real People</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our products have transformed the skin of thousands of customers across Europe
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-neutral-200 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-semibold text-sage-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="content-container">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                  selectedFilter === filter.id
                    ? "bg-sage-700 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-sage-50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: exp.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sage-600 text-sage-600" />
                    ))}
                  </div>

                  {/* Header Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-display font-semibold text-neutral-900">
                      {exp.name}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {exp.age} years • {exp.location}
                    </p>
                    <p className="text-xs text-sage-700 mt-1 font-medium uppercase tracking-wide">
                      {exp.concern}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <svg 
                      className="absolute -left-1 -top-1 w-6 h-6 text-sage-300" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p className="text-sm text-neutral-700 leading-relaxed pl-6 italic">
                      {exp.quote}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-4">
                    <ul className="space-y-1">
                      {exp.results.map((result, i) => (
                        <li key={i} className="text-xs text-neutral-600 flex items-start">
                          <span className="text-sage-600 mr-2">✓</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">
                      <span className="font-medium text-neutral-700">{exp.product}</span> • {exp.duration}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-sage-700 text-white">
        <div className="content-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-light mb-6 tracking-tight">
            Why Our Customers
            <br />
            <span className="font-semibold">Trust Us</span>
          </h2>
          <p className="text-lg text-sage-100 max-w-2xl mx-auto mb-12 leading-relaxed">
            We believe in transparency, quality, and results. Every product is formulated with clinically-proven ingredients and backed by real science.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-sage-600 p-8">
              <h3 className="text-xl font-display font-semibold mb-3 uppercase tracking-wide">
                Clean Formulas
              </h3>
              <p className="text-sage-100 text-sm leading-relaxed">
                No parabens, sulfates, or harmful chemicals. Just pure, effective ingredients that work.
              </p>
            </div>
            <div className="bg-sage-600 p-8">
              <h3 className="text-xl font-display font-semibold mb-3 uppercase tracking-wide">
                Dermatologist Tested
              </h3>
              <p className="text-sage-100 text-sm leading-relaxed">
                Every formula is rigorously tested and approved by leading dermatologists.
              </p>
            </div>
            <div className="bg-sage-600 p-8">
              <h3 className="text-xl font-display font-semibold mb-3 uppercase tracking-wide">
                60-Day Guarantee
              </h3>
              <p className="text-sage-100 text-sm leading-relaxed">
                Not satisfied? Get a full refund within 60 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="content-container text-center">
          <h2 className="text-3xl md:text-5xl font-display font-light mb-6 tracking-tight text-white">
            Ready to Transform
            <br />
            <span className="font-semibold text-white">Your Skin?</span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of satisfied customers who have discovered their best skin yet
          </p>
          <a
            href="/us/store"
            className="inline-block bg-white text-neutral-900 px-12 py-4 text-sm font-medium uppercase tracking-wider hover:bg-sage-50 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Experiences
