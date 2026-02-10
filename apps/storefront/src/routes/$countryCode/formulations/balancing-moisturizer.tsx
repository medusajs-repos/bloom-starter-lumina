import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$countryCode/formulations/balancing-moisturizer"
)({
  component: BalancingMoisturizer,
});

function BalancingMoisturizer() {
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
                Balancing Moisturizer
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expertly formulated to regulate sebum production while
                maintaining optimal hydration, perfect for combination and
                oily-prone skin types.
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
                Why Balancing Moisturizer
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Finding the right moisturizer for combination skin can be
                  challenging. Too rich, and your T-zone becomes oily. Too light,
                  and your dry areas feel tight. Our Balancing Moisturizer solves
                  this dilemma with a sophisticated formula that adapts to your
                  skin's needs.
                </p>
                <p>
                  This intelligent formulation uses a combination of sebum-
                  regulating ingredients and lightweight hydrators to normalize
                  oil production without stripping or over-drying. It provides
                  just the right amount of moisture where needed, while helping to
                  minimize the appearance of pores and refine skin texture.
                </p>
                <p>
                  Designed for those who struggle with an oily T-zone, occasional
                  breakouts, or skin that feels both oily and dehydrated, this
                  moisturizer brings harmony to unbalanced skin, leaving it matte,
                  smooth, and comfortable all day long.
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24 self-start max-w-xs mx-auto">
              <img
                src="https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_2-01KH1G6N5TR35XGCJZZ8B6JQ6F.jpeg"
                alt="Balancing Moisturizer"
                className="w-full h-auto"
              />
              <Link
                to={`/${countryCode}/products/balancing-moisturizer`}
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
                <div className="w-12 h-12 bg-yellow-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Oil Control
                </h3>
                <p className="text-gray-600">
                  Niacinamide helps regulate sebum production, reducing excess
                  shine without stripping skin of necessary moisture.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-teal-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Pore Refinement
                </h3>
                <p className="text-gray-600">
                  Zinc PCA and gentle acids help minimize the appearance of
                  pores while preventing congestion.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-indigo-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Lightweight Hydration
                </h3>
                <p className="text-gray-600">
                  Delivers essential moisture without heavy oils or occlusives
                  that can trigger breakouts.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-light text-gray-900">
                  Mattifying Effect
                </h3>
                <p className="text-gray-600">
                  Creates a smooth, matte finish that controls shine throughout
                  the day without looking flat or dull.
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
                  Niacinamide (Vitamin B3)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A multitasking powerhouse ingredient that regulates sebum
                  production, strengthens the skin barrier, and reduces the
                  appearance of pores. Studies show that 5% niacinamide can
                  significantly reduce oiliness and improve skin texture over
                  time. It also provides antioxidant protection and helps fade
                  post-acne marks.
                </p>
                <p className="text-sm text-gray-500">Concentration: 5%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">Zinc PCA</h3>
                <p className="text-gray-600 leading-relaxed">
                  A skin-identical ingredient that helps control excess oil
                  production while providing antimicrobial benefits. Zinc PCA is
                  particularly effective for combination and acne-prone skin, as
                  it helps regulate sebaceous gland activity without causing
                  dryness or irritation.
                </p>
                <p className="text-sm text-gray-500">Concentration: 1%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Salicylic Acid
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A beta hydroxy acid (BHA) that penetrates into pores to
                  dissolve excess sebum and prevent congestion. At a low
                  concentration, it provides gentle exfoliation without
                  irritation, helping to keep pores clear and skin texture
                  smooth. It also has anti-inflammatory properties that soothe
                  irritated skin.
                </p>
                <p className="text-sm text-gray-500">Concentration: 0.5%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Lightweight Hyaluronic Acid
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We use a low molecular weight hyaluronic acid that provides
                  hydration without heaviness. This form penetrates quickly and
                  doesn't leave a tacky or sticky feeling, making it ideal for
                  oily and combination skin types that need moisture but can't
                  tolerate thick textures.
                </p>
                <p className="text-sm text-gray-500">Concentration: 1%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Green Tea Extract
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Rich in polyphenols and catechins, green tea extract provides
                  powerful antioxidant protection while helping to reduce
                  inflammation and control sebum production. It also has
                  antimicrobial properties that help keep skin clear and
                  balanced.
                </p>
                <p className="text-sm text-gray-500">Concentration: 2%</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6 space-y-3">
                <h3 className="text-2xl font-light text-gray-900">
                  Silica Microspheres
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  These tiny spherical particles absorb excess oil throughout
                  the day, providing an immediate mattifying effect while
                  creating a soft-focus finish that minimizes the appearance of
                  pores and fine lines. They give the skin a smooth, velvety
                  texture without clogging pores.
                </p>
                <p className="text-sm text-gray-500">Concentration: 3%</p>
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
                    After cleansing
                  </p>
                  <p>
                    Apply to freshly cleansed skin. For best results, use after
                    toner or serum and before sunscreen.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Apply evenly
                  </p>
                  <p>
                    Use a small amount and spread evenly across face and neck.
                    Pay extra attention to oily areas like the T-zone.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Use morning and night
                  </p>
                  <p>
                    Apply twice daily for optimal results. In the morning,
                    follow with SPF. At night, this can be your final step.
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
                <p className="font-medium text-gray-900">Combination Skin</p>
                <p className="text-sm text-gray-600">
                  Balances oily and dry areas without over-drying or adding
                  excess oil
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Oily Skin</p>
                <p className="text-sm text-gray-600">
                  Controls shine and regulates sebum production throughout the
                  day
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Acne-Prone Skin</p>
                <p className="text-sm text-gray-600">
                  Helps prevent breakouts with gentle exfoliation and pore-
                  clearing ingredients
                </p>
              </div>
              <div className="border border-gray-200 p-6 space-y-2">
                <p className="font-medium text-gray-900">Enlarged Pores</p>
                <p className="text-sm text-gray-600">
                  Minimizes pore appearance and prevents congestion
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gray-200 pt-12 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Achieve Balanced, Clear Skin
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the perfect equilibrium of hydration and oil control
              with our expertly balanced formula.
            </p>
            <Link
              to={`/${countryCode}/products/balancing-moisturizer`}
              className="inline-block bg-gray-900 text-white px-12 py-4 hover:bg-gray-800 transition-colors text-lg"
            >
              Shop Balancing Moisturizer
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
