const SkincareGuide = () => {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-sage-50 via-white to-sand-50">
        <div className="content-container text-center">
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-neutral-900 mb-6 tracking-tight">
            Skincare Guide
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto">
            Simple, effective routines for radiant, healthy skin
          </p>
        </div>
      </section>

      {/* Morning Routine */}
      <section className="py-16 bg-white">
        <div className="content-container max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-semibold text-neutral-900 mb-4 tracking-tight">
              Morning Routine
            </h2>
            <p className="text-neutral-600 mb-8">
              Start your day with these essential steps to protect and prepare your skin.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Cleanse</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Begin with a gentle cleanser to remove impurities and prepare your skin for the day ahead. Use lukewarm water and pat dry with a soft towel.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Apply Serum</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Our lightweight serum delivers concentrated active ingredients deep into your skin. Apply 2-3 drops and gently press into face and neck.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Moisturize</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Lock in hydration with our nourishing moisturizer. This creates a protective barrier while keeping your skin balanced throughout the day.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sun Protection</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Always finish with SPF 30 or higher to protect against UV damage. This is the most important step for preventing premature aging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evening Routine */}
      <section className="py-16 bg-sand-50">
        <div className="content-container max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-semibold text-neutral-900 mb-4 tracking-tight">
              Evening Routine
            </h2>
            <p className="text-neutral-600 mb-8">
              Wind down with a restorative routine that repairs and rejuvenates while you sleep.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Double Cleanse</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Remove makeup and sunscreen with an oil-based cleanser, then follow with your regular cleanser for a thorough clean.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Treatment Serum</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Evening is the time for more potent treatments. Apply your serum to target specific concerns like fine lines or uneven texture.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-sage-800 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Night Moisturizer</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Use a richer moisturizer at night to support your skin's natural repair process. This helps wake up with plump, refreshed skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-white">
        <div className="content-container max-w-4xl">
          <h2 className="text-3xl font-display font-semibold text-neutral-900 mb-8 text-center tracking-tight">
            Quick Tips
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-sage-50 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Stay Consistent</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Results take time. Stick to your routine for at least 6-8 weeks to see visible improvements in your skin.
              </p>
            </div>

            <div className="p-6 bg-sage-50 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Less is More</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Don't overload your skin. A few quality products used correctly work better than many products used inconsistently.
              </p>
            </div>

            <div className="p-6 bg-sage-50 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Patch Test First</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Always test new products on a small area before applying to your entire face to check for any sensitivities.
              </p>
            </div>

            <div className="p-6 bg-sage-50 rounded-lg">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Hydrate & Sleep</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Drink plenty of water and get 7-8 hours of sleep. Great skin starts from within.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sage-800">
        <div className="content-container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6 tracking-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sage-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover our curated collection of serums and moisturizers designed for real results.
          </p>
          <a
            href="/store"
            className="inline-block bg-white text-sage-800 px-8 py-4 rounded-full font-semibold hover:bg-sage-50 transition-colors"
          >
            Shop Products
          </a>
        </div>
      </section>
    </div>
  )
}

export default SkincareGuide
