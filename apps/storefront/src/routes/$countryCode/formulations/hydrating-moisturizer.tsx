import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$countryCode/formulations/hydrating-moisturizer"
)({
  component: HydratingMoisturizer,
});

function HydratingMoisturizer() {
  const { countryCode } = Route.useParams();

  return (
    <div className="min-h-screen bg-white select-text">
      <div className="container mx-auto px-4 py-48 max-w-5xl select-text">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-[1fr,120px] gap-12 mb-20 select-text">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                Our Formulations
              </p>
              <h1 className="text-5xl font-light text-gray-900 mb-6">
                Hydrating Moisturizer
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                A revolutionary blend of nature and science, designed to deliver
                deep, lasting hydration while strengthening your skin's natural
                protective barrier.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Overview with Product Image */}
          <section className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-gray-900">
                Why Hydrating Moisturizer
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Our Hydrating Moisturizer represents years of research into the
                  science of skin hydration. We understand that dry skin isn't
                  just about adding moisture—it's about helping your skin retain
                  it and repair its natural barrier function.
                </p>
                <p>
                  This lightweight yet powerful formula works on multiple levels.
                  It draws moisture from the environment into your skin,
                  strengthens the connections between skin cells, and forms a
                  protective layer that prevents water loss throughout the day.
                </p>
                <p>
                  Perfect for dry and combination skin types, this moisturizer
                  absorbs quickly without leaving any greasy residue. Whether
                you're dealing with seasonal dryness, sensitivity, or just need
                a reliable daily moisturizer, this formulation delivers
                consistent, visible results.
              </p>
            </div>
            </div>
            <div className="lg:sticky lg:top-24 self-start max-w-xs mx-auto">
              <img
                src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_1-01KH1E4PN6PDQP1F9T4HER2YJ3.jpeg"
                alt="Hydrating Moisturizer"
                className="w-full h-auto"
              />
              <Link
                to={`/${countryCode}/products/hydrating-moisturizer`}
                className="block w-full bg-gray-900 text-white text-center px-6 py-3 text-sm hover:bg-gray-800 transition-colors mt-4"
              >
                Shop Now
              </Link>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Deep Hydration
                </h3>
                <p className="text-gray-600">
                  Hyaluronic acid can hold up to 1000x its weight in water,
                  delivering intense, long-lasting moisture to even the driest
                  skin.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Barrier Repair
                </h3>
                <p className="text-gray-600">
                  Ceramides work to strengthen and restore your skin's natural
                  protective barrier, preventing moisture loss and environmental
                  damage.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Gentle Formula
                </h3>
                <p className="text-gray-600">
                  Designed for sensitive skin, our formula is free from harsh
                  chemicals, fragrances, and irritants that can compromise skin
                  health.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-pink-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Fast Absorption
                </h3>
                <p className="text-gray-600">
                  Lightweight texture absorbs instantly without leaving any
                  greasy residue, making it perfect for layering under makeup or
                  sunscreen.
                </p>
              </div>
            </div>
          </section>

          {/* Ingredients Deep Dive */}
          <section className="space-y-8">
            <h2 className="text-3xl font-light text-gray-900">
              Active Ingredients
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Hyaluronic Acid
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A naturally occurring molecule in skin that acts as a powerful
                  humectant, drawing moisture from the environment into the skin
                  and holding it there. Our formulation uses multiple molecular
                  weights of hyaluronic acid to ensure both surface hydration
                  and deep penetration into the skin layers.
                </p>
                <p className="text-sm text-gray-500">
                  Concentration: 2% multi-weight blend
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Ceramide Complex
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ceramides are lipid molecules that make up over 50% of your
                  skin's composition. Our blend of ceramides 1, 3, and 6-II
                  mimics the skin's natural barrier structure, helping to repair
                  damage and prevent moisture loss. This is particularly
                  important for dry and compromised skin.
                </p>
                <p className="text-sm text-gray-500">
                  Concentration: 3% ceramide blend
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Vegetable Glycerin
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A plant-derived humectant that works synergistically with
                  hyaluronic acid to maintain skin hydration. Glycerin not only
                  attracts water to the skin but also helps improve the skin's
                  barrier function and provides protection against irritation.
                </p>
                <p className="text-sm text-gray-500">Concentration: 5%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Squalane
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A plant-derived emollient that mimics your skin's natural
                  oils. Squalane provides lightweight moisture, helps soften and
                  smooth skin texture, and enhances the absorption of other
                  active ingredients without clogging pores.
                </p>
                <p className="text-sm text-gray-500">Concentration: 2%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Niacinamide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Also known as Vitamin B3, niacinamide supports the skin
                  barrier, helps regulate oil production, and provides
                  antioxidant protection. It works alongside our other
                  ingredients to improve skin texture and maintain hydration.
                </p>
                <p className="text-sm text-gray-500">Concentration: 4%</p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-gray-50 -mx-4 px-4 md:mx-0 md:px-12 py-12 space-y-6">
            <h2 className="text-3xl font-light text-gray-900">How to Use</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Cleanse your face
                  </p>
                  <p>
                    Start with clean, freshly cleansed skin. Pat dry, leaving
                    skin slightly damp for better absorption.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Apply to damp skin
                  </p>
                  <p>
                    Dispense a pea-sized amount and warm between your palms.
                    Apply to face and neck using gentle upward motions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Use twice daily
                  </p>
                  <p>
                    For best results, apply morning and evening. Can be layered
                    under sunscreen in the morning or used as the final step in
                    your evening routine.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Suitable For */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-gray-900">
              Suitable For
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Dry Skin</p>
                <p className="text-sm text-gray-600">
                  Provides intense hydration and helps repair compromised skin
                  barriers
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Sensitive Skin</p>
                <p className="text-sm text-gray-600">
                  Gentle, fragrance-free formula suitable for reactive skin
                  types
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Combination Skin</p>
                <p className="text-sm text-gray-600">
                  Lightweight texture hydrates without adding excess oil
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Mature Skin</p>
                <p className="text-sm text-gray-600">
                  Helps maintain elasticity and plumpness with deep hydration
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-200 pt-12 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Experience Deep Hydration
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your skin with our science-backed hydrating formula.
              Suitable for all skin types, especially dry and sensitive skin.
            </p>
            <Link
              to={`/${countryCode}/products/hydrating-moisturizer`}
              className="inline-block bg-gray-900 text-white px-12 py-4 hover:bg-gray-800 transition-colors text-lg"
            >
              Shop Hydrating Moisturizer
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
