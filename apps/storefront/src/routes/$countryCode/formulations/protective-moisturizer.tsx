import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$countryCode/formulations/protective-moisturizer"
)({
  component: ProtectiveMoisturizer,
});

function ProtectiveMoisturizer() {
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
                Protective Moisturizer
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Advanced environmental defense meets deep nourishment in this
                antioxidant-rich formula designed to shield skin from daily
                stressors.
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
                Why Protective Moisturizer
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Every day, your skin faces an invisible assault from
                  environmental stressors—pollution, blue light, UV radiation, and
                  free radicals. Over time, this daily exposure accelerates aging,
                  causes inflammation, and compromises your skin's natural
                  defenses. Our Protective Moisturizer acts as your skin's first
                  line of defense.
                </p>
                <p>
                  This sophisticated formula combines powerful antioxidants with
                  barrier-strengthening ingredients to neutralize environmental
                  damage before it affects your skin. Think of it as a protective
                  shield that works around the clock, defending against oxidative
                  stress while providing essential hydration and nourishment.
                </p>
                <p>
                  Ideal for urban dwellers, frequent travelers, or anyone exposed
                  to pollution and environmental stressors, this moisturizer helps
                  prevent premature aging while keeping skin resilient, radiant,
                  and protected. It's your daily armor against the modern world.
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24 self-start max-w-xs mx-auto">
              <img
                src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_3-01KH1G7NHVG6NVMWBMCK73MNCX.jpeg"
                alt="Protective Moisturizer"
                className="w-full h-auto"
              />
              <Link
                to="/$countryCode/products/$handle"
                params={{ countryCode, handle: "protective-moisturizer" }}
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
                <div className="w-12 h-12 bg-orange-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Antioxidant Defense
                </h3>
                <p className="text-gray-600">
                  Powerful blend of Vitamin C, E, and ferulic acid neutralizes
                  free radicals and prevents oxidative damage.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-cyan-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Pollution Protection
                </h3>
                <p className="text-gray-600">
                  Creates an invisible barrier that prevents pollutants and
                  particulate matter from adhering to skin.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-rose-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-rose-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Blue Light Shield
                </h3>
                <p className="text-gray-600">
                  Protects against high-energy visible light from screens and
                  devices that can accelerate aging.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-lime-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-lime-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Anti-Aging Support
                </h3>
                <p className="text-gray-600">
                  Peptides and botanicals work together to minimize fine lines
                  and maintain skin firmness.
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
                  Vitamin C (Ascorbic Acid)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A gold-standard antioxidant that neutralizes free radicals,
                  brightens skin tone, and stimulates collagen production. We
                  use a stabilized form of Vitamin C at 10% concentration to
                  ensure maximum efficacy without irritation. It also helps fade
                  dark spots and protect against UV-induced damage.
                </p>
                <p className="text-sm text-gray-500">Concentration: 10%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Vitamin E (Tocopherol)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Works synergistically with Vitamin C to provide enhanced
                  antioxidant protection. Vitamin E is lipid-soluble, meaning it
                  protects cell membranes from oxidative damage while providing
                  moisturizing benefits. It also helps stabilize Vitamin C,
                  making both ingredients more effective together.
                </p>
                <p className="text-sm text-gray-500">Concentration: 1%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Ferulic Acid
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A plant-based antioxidant that doubles the photoprotective
                  effects of Vitamins C and E. Research shows that this
                  combination provides up to 8 times the skin's natural
                  protection against sun damage. Ferulic acid also helps
                  stabilize the formula and provides additional anti-aging
                  benefits.
                </p>
                <p className="text-sm text-gray-500">Concentration: 0.5%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Pollution Defense Complex
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A proprietary blend of botanical extracts including moringa
                  seed extract and spirulina that creates a protective film on
                  skin's surface. This barrier prevents pollutants, heavy
                  metals, and particulate matter from penetrating the skin while
                  helping to detoxify existing damage.
                </p>
                <p className="text-sm text-gray-500">
                  Concentration: 3% complex
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Blue Light Protection Peptide
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A specialized peptide that shields skin from high-energy
                  visible (HEV) light emitted by screens and LED lights. Studies
                  show that blue light can penetrate deeper than UV rays and
                  trigger oxidative stress and hyperpigmentation. This peptide
                  helps neutralize this damage while supporting skin's natural
                  repair processes.
                </p>
                <p className="text-sm text-gray-500">Concentration: 2%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Matrixyl 3000
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A powerful anti-aging peptide complex that stimulates collagen
                  and elastin production, helping to reduce the appearance of
                  fine lines and wrinkles. Clinical studies show visible
                  improvement in skin firmness and smoothness with consistent
                  use over 8 weeks.
                </p>
                <p className="text-sm text-gray-500">Concentration: 3%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Resveratrol
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A potent antioxidant found in grapes that provides anti-aging
                  and anti-inflammatory benefits. Resveratrol helps neutralize
                  free radicals, supports skin's natural repair mechanisms, and
                  has been shown to help prevent UV-induced damage when used
                  alongside sunscreen.
                </p>
                <p className="text-sm text-gray-500">Concentration: 1%</p>
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
                    Apply in the morning
                  </p>
                  <p>
                    For maximum protection, apply after cleansing and before
                    sunscreen. This allows the antioxidants to form a protective
                    layer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Use a generous amount
                  </p>
                  <p>
                    Apply evenly to face, neck, and any exposed areas. Don't
                    forget areas like ears and chest that are also exposed to
                    environmental stressors.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Layer with SPF
                  </p>
                  <p>
                    Always follow with broad-spectrum SPF 30 or higher. While
                    this moisturizer provides antioxidant protection, it does
                    not replace sunscreen.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  4
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Can be used at night
                  </p>
                  <p>
                    While designed for daytime use, the peptides and
                    antioxidants also support nighttime repair and regeneration.
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
                <p className="font-medium text-gray-900">Urban Living</p>
                <p className="text-sm text-gray-600">
                  Essential protection for those exposed to high levels of
                  pollution and environmental stress
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Screen Time</p>
                <p className="text-sm text-gray-600">
                  Guards against blue light damage from computers, phones, and
                  devices
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Aging Concerns</p>
                <p className="text-sm text-gray-600">
                  Peptides and antioxidants work together to minimize signs of
                  aging
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">All Skin Types</p>
                <p className="text-sm text-gray-600">
                  Suitable for all skin types including sensitive skin—free from
                  harsh irritants
                </p>
              </div>
            </div>
          </section>

          {/* Environmental Protection Callout */}
          <section className="bg-gradient-to-r from-orange-50 to-amber-50 -mx-4 px-4 md:mx-0 md:px-12 py-12 space-y-6">
            <h2 className="text-3xl font-light text-gray-900">
              The Science of Environmental Protection
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Research shows that environmental stressors are responsible for
                up to 80% of visible signs of aging. Pollution particles
                generate free radicals that damage collagen, trigger
                inflammation, and accelerate photoaging.
              </p>
              <p>
                Our Protective Moisturizer is formulated based on clinical
                research into antioxidant synergy. The combination of Vitamins
                C, E, and ferulic acid has been shown to provide up to 8 times
                greater protection than any single ingredient alone. Add in our
                pollution defense complex and blue light protection, and you
                have comprehensive environmental armor for modern life.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-200 pt-12 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Shield Your Skin From Modern Life
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Advanced antioxidant protection meets luxurious hydration in this
              daily defense moisturizer designed for the modern world.
            </p>
            <Link
              to="/$countryCode/products/$handle"
                params={{ countryCode, handle: "protective-moisturizer" }}
              className="inline-block bg-gray-900 text-white px-12 py-4 hover:bg-gray-800 transition-colors text-lg"
            >
              Shop Protective Moisturizer
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
