import { createFileRoute, Link } from "@tanstack/react-router";
import { retrieveProduct } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddToCart } from "@/lib/hooks/use-cart";
import { useCartDrawer } from "@/lib/context/cart";
import { Star, Check } from "@medusajs/icons";
import { sanitize } from "@/lib/utils/sanitize";

type RouteSearch = {
  product?: string;
  currentIssues?: string;
  skincareGoals?: string;
  skinSensitivity?: string;
  age?: string;
};

export const Route = createFileRoute("/$countryCode/quiz-results")({
  validateSearch: (search: Record<string, unknown>): RouteSearch => {
    return {
      product: (search.product as string) || "hydrating-face-cream",
      currentIssues: search.currentIssues as string,
      skincareGoals: search.skincareGoals as string,
      skinSensitivity: search.skinSensitivity as string,
      age: search.age as string,
    };
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, params, deps }) => {
    const countryCode = params.countryCode;
    const region = await getRegion({ country_code: countryCode });

    if (!region) {
      throw new Error("Region not found");
    }

    const productHandle = deps.search.product || "hydrating-face-cream";

    const product = await retrieveProduct({
      handle: productHandle,
      region_id: region.id,
      country_code: countryCode,
      fields: "id,title,handle,description,thumbnail,images.*,variants.*,variants.calculated_price.*,variants.options.*,options.*,options.values.*",
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Fetch serum products for "Complete Your Routine" section
    const { listProducts } = await import("@/lib/data/products");
    const { products: recommendedProducts } = await listProducts({
      query_params: {
        fields: "id,title,handle,description,thumbnail,variants.*,variants.calculated_price.*",
        limit: 3,
        handle: ["balancing-serum", "protective-serum", "hydrating-serum"],
      },
      region_id: region.id,
    });

    return sanitize({
      product,
      region,
      productHandle,
      recommendedProducts: recommendedProducts || [],
      quizAnswers: {
        currentIssues: deps.search.currentIssues?.split(',').filter(Boolean) || [],
        skincareGoals: deps.search.skincareGoals,
        skinSensitivity: deps.search.skinSensitivity,
        age: deps.search.age,
      },
    });
  },
  component: QuizResults,
});

// Placeholder reviews data
const PLACEHOLDER_REVIEWS = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing results!",
    content: "This moisturizer has completely transformed my skin. After just two weeks, my skin feels softer and looks more radiant.",
    verified: true,
  },
  {
    id: 2,
    author: "Emma K.",
    rating: 5,
    date: "2024-01-10",
    title: "Perfect for sensitive skin",
    content: "I have very sensitive skin and this is the first moisturizer that doesn't cause any irritation. Highly recommend!",
    verified: true,
  },
  {
    id: 3,
    author: "Lisa T.",
    rating: 4,
    date: "2024-01-05",
    title: "Great daily moisturizer",
    content: "Love the texture and how it absorbs quickly. My skin feels hydrated all day long.",
    verified: true,
  },
  {
    id: 4,
    author: "Anna P.",
    rating: 5,
    date: "2023-12-28",
    title: "Best purchase ever",
    content: "I've tried many moisturizers and this one is by far the best. My skin has never looked better!",
    verified: true,
  },
];

function QuizResults() {
  const { product, region, productHandle, quizAnswers, recommendedProducts } = Route.useLoaderData();
  const { countryCode } = Route.useParams();
  const addToCartMutation = useAddToCart();
  
  // Get initial size from first variant
  const initialSize = product.variants?.[0]?.options?.find((o: any) => 
    product.options?.some((opt: any) => opt.title === "Size" && opt.values?.some((v: any) => v.value === o.value))
  )?.value;
  
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize || "");
  const [quantity, setQuantity] = useState(1);
  const [deliveryCadence, setDeliveryCadence] = useState<"one-time" | "monthly" | "quarterly">("one-time");
  const { openCart } = useCartDrawer();

  const getRecommendationReason = () => {
    if (productHandle === "hydrating-moisturizer") {
      return "Based on your skin profile, Hydrating Moisturizer is perfect for providing gentle, effective hydration.";
    } else if (productHandle === "balancing-moisturizer") {
      return "Based on your needs, Balancing Moisturizer offers balanced nourishment for your skin type.";
    } else if (productHandle === "protective-moisturizer") {
      return "Based on your concerns, Protective Moisturizer delivers targeted care for optimal results.";
    } else {
      return "Based on your skin profile, this moisturizer provides the perfect balance of moisture and nourishment for your skin.";
    }
  };

  const price = selectedVariant?.calculated_price;
  
  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addToCartMutation.mutate({
      variant_id: selectedVariant.id!,
      quantity: quantity,
      country_code: countryCode,
      metadata: {
        delivery_cadence: deliveryCadence,
      },
      product: product,
      variant: selectedVariant,
      region: region,
    }, {
      onSuccess: () => {
        openCart();
      },
    });
  };

  const averageRating = PLACEHOLDER_REVIEWS.reduce((acc, review) => acc + review.rating, 0) / PLACEHOLDER_REVIEWS.length;

  return (
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-slate-900 mb-4">Your Perfect Match</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{getRecommendationReason()}</p>
        </div>

        {/* Your Profile Section */}
        {(quizAnswers.currentIssues?.length > 0 || quizAnswers.skincareGoals || quizAnswers.skinSensitivity || quizAnswers.age) && (
          <div className="bg-frost-50 rounded-lg p-6 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-900">Your Profile</h3>
              <Link
                to="/$countryCode/quiz"
                params={{ countryCode }}
                className="text-slate-600 hover:text-slate-900 text-sm font-medium underline"
              >
                Retake Quiz
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quizAnswers.currentIssues && quizAnswers.currentIssues.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Concerns</p>
                    <p className="text-sm font-medium text-slate-900">{quizAnswers.currentIssues.join(', ')}</p>
                  </div>
                </div>
              )}
              
              {quizAnswers.skincareGoals && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Goal</p>
                    <p className="text-sm font-medium text-slate-900">{quizAnswers.skincareGoals}</p>
                  </div>
                </div>
              )}
              
              {quizAnswers.skinSensitivity && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Sensitivity</p>
                    <p className="text-sm font-medium text-slate-900">{quizAnswers.skinSensitivity}</p>
                  </div>
                </div>
              )}
              
              {quizAnswers.age && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Age</p>
                    <p className="text-sm font-medium text-slate-900">{quizAnswers.age}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-frost-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-12">
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-3xl font-display text-slate-900 mb-3">{product.title}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="text-sm text-slate-600">
                {averageRating.toFixed(1)} ({PLACEHOLDER_REVIEWS.length} reviews)
              </span>
            </div>

            {price && price.currency_code && (
              <div className="mb-6">
                <p className="text-3xl font-display text-slate-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency_code.toLowerCase(),
                  }).format(price.calculated_amount || 0)}
                </p>
              </div>
            )}

            {product.description && (
              <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>
            )}

            {/* Key Benefits */}
            <div className="mb-6 p-4 bg-frost-50 rounded-lg">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Dermatologically tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Suitable for sensitive skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Free from parabens and sulfates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Cruelty-free and vegan</span>
                </li>
              </ul>
            </div>

            {/* Size Selector */}
            {product.options && product.options.some((opt: any) => opt.title === "Size") && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-900 mb-3">Size</label>
                <div className="flex gap-3">
                  {product.options
                    .find((opt: any) => opt.title === "Size")
                    ?.values?.map((value: any) => (
                      <button
                        key={value.id}
                        onClick={() => {
                          setSelectedSize(value.value);
                          // Find matching variant based on size and current delivery cadence
                          const matchingVariant = product.variants?.find((v: any) => 
                            v.options?.some((o: any) => o.value === value.value) &&
                            v.options?.some((o: any) => {
                              const deliveryMap: any = {
                                "one-time": "One-time",
                                "monthly": "Monthly",
                                "quarterly": "Quarterly"
                              };
                              return o.value === deliveryMap[deliveryCadence];
                            })
                          );
                          if (matchingVariant) {
                            setSelectedVariant(matchingVariant);
                          }
                        }}
                        className={`px-6 py-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          selectedSize === value.value
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {value.value}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Delivery Cadence */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-3">Delivery Options</label>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  deliveryCadence === "one-time" 
                    ? 'border-slate-900 bg-slate-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="one-time"
                      checked={deliveryCadence === "one-time"}
                      onChange={(e) => {
                        setDeliveryCadence(e.target.value as "one-time");
                        // Update variant based on size and new delivery option
                        const matchingVariant = product.variants?.find((v: any) => 
                          v.options?.some((o: any) => o.value === selectedSize) &&
                          v.options?.some((o: any) => o.value === "One-time")
                        );
                        if (matchingVariant) {
                          setSelectedVariant(matchingVariant);
                        }
                      }}
                      className="w-4 h-4 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-900">One-time purchase</span>
                  </div>
                </label>
                
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  deliveryCadence === "monthly" 
                    ? 'border-slate-900 bg-slate-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="monthly"
                      checked={deliveryCadence === "monthly"}
                      onChange={(e) => {
                        setDeliveryCadence(e.target.value as "monthly");
                        // Update variant based on size and new delivery option
                        const matchingVariant = product.variants?.find((v: any) => 
                          v.options?.some((o: any) => o.value === selectedSize) &&
                          v.options?.some((o: any) => o.value === "Monthly")
                        );
                        if (matchingVariant) {
                          setSelectedVariant(matchingVariant);
                        }
                      }}
                      className="w-4 h-4 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900 block">Monthly delivery</span>
                      <span className="text-xs text-slate-500">Delivered every 30 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                    Save 10%
                  </span>
                </label>
                
                <label className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  deliveryCadence === "quarterly" 
                    ? 'border-slate-900 bg-slate-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="quarterly"
                      checked={deliveryCadence === "quarterly"}
                      onChange={(e) => {
                        setDeliveryCadence(e.target.value as "quarterly");
                        // Update variant based on size and new delivery option
                        const matchingVariant = product.variants?.find((v: any) => 
                          v.options?.some((o: any) => o.value === selectedSize) &&
                          v.options?.some((o: any) => o.value === "Quarterly")
                        );
                        if (matchingVariant) {
                          setSelectedVariant(matchingVariant);
                        }
                      }}
                      className="w-4 h-4 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900 block">Quarterly delivery</span>
                      <span className="text-xs text-slate-500">Delivered every 90 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                    Save 15%
                  </span>
                </label>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-900 mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-slate-200 rounded-lg hover:border-slate-300 text-slate-900 font-medium"
                >
                  -
                </button>
                <span className="w-16 text-center text-slate-900 font-medium text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-slate-200 rounded-lg hover:border-slate-300 text-slate-900 font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending || !selectedVariant}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white text-base font-medium mb-3"
            >
              {addToCartMutation.isPending ? "Adding to Cart..." : "Add to Cart"}
            </Button>

            <Link
              to="/$countryCode/products/$handle"
              params={{ countryCode, handle: product.handle! }}
            >
              <Button variant="secondary" className="w-full h-14 border-2 border-slate-200 text-slate-900 hover:bg-slate-50 text-base font-medium">
                View Full Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-slate-900 mb-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="text-slate-600">
                {averageRating.toFixed(1)} out of 5 based on {PLACEHOLDER_REVIEWS.length} reviews
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PLACEHOLDER_REVIEWS.map((review) => (
              <div key={review.id} className="bg-frost-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <h4 className="font-medium text-slate-900 mb-2">{review.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-slate-900 mb-2">Complete Your Routine</h2>
            <p className="text-slate-600">Products that work well with your selection</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendedProducts.map((recProduct: any) => {
              const variant = recProduct.variants?.[0];
              const price = variant?.calculated_price;
              const formattedPrice = price
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency_code.toUpperCase(),
                  }).format(price.calculated_amount)
                : null;

              return (
                <Link
                  key={recProduct.id}
                  to="/$countryCode/products/$handle"
                  params={{ countryCode, handle: recProduct.handle }}
                  className="bg-frost-50 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-slate-200 flex items-center justify-center overflow-hidden">
                    {recProduct.thumbnail ? (
                      <img
                        src={recProduct.thumbnail}
                        alt={recProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-slate-400 text-sm">Product Image</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-slate-900 mb-1">{recProduct.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{recProduct.description || 'Premium skincare product'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display text-slate-900">{formattedPrice || '$--'}</span>
                      <Button variant="secondary" size="fit" className="border-slate-200 hover:bg-slate-50">
                        View Product
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
