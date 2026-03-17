import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { retrieveProduct } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { Button } from "@/components/ui/button"
import { useAddToCart, useUpdateCart } from "@/lib/hooks/use-cart"
import {
  loadAnswersFromSession,
  loadRecommendationFromSession,
  clearQuizSession,
  QUIZ_QUESTIONS,
} from "@/lib/quiz-config"
import { HttpTypes } from "@medusajs/types"
import { formatPrice } from "@/lib/utils/price"
import { sanitize } from "@/lib/utils/sanitize"

export const Route = createFileRoute("/$countryCode/quiz/confirm")({
  validateSearch: (search: Record<string, unknown>) => ({
    quantity: typeof search.quantity === "number" ? search.quantity : 1,
  }),
  loader: async ({ params, context }) => {
    const { countryCode } = params
    const { queryClient } = context

    const region = await queryClient.ensureQueryData({
      queryKey: ["region", countryCode],
      queryFn: () => getRegion({ country_code: countryCode }),
    })

    // Get recommendation from session storage (client-side only)
    if (typeof window !== "undefined") {
      const recommendation = loadRecommendationFromSession()
      if (recommendation && region) {
        const product = await queryClient.ensureQueryData({
          queryKey: ["product", recommendation.productHandle, region.id],
          queryFn: async () => {
            return await retrieveProduct({
              handle: recommendation.productHandle,
              region_id: region.id,
              fields:
                "*variants, +variants.calculated_price, *images, *options",
            })
          },
        })

        return sanitize({
          countryCode,
          region,
          product: product as HttpTypes.StoreProduct,
          recommendation,
        })
      }
    }

    return sanitize({
      countryCode,
      region,
      product: null,
      recommendation: null,
    })
  },
  component: QuizConfirm,
})

function QuizConfirm() {
  const navigate = useNavigate()
  const { countryCode } = Route.useParams()
  const { quantity } = Route.useSearch()
  const loaderData = Route.useLoaderData()

  const [recommendation, setRecommendation] = useState(
    loaderData?.recommendation
  )
  const [product, setProduct] = useState(loaderData?.product)
  const [answers, setAnswers] = useState(() => loadAnswersFromSession())

  const addToCartMutation = useAddToCart({ fields: "+items.total" })
  const updateCartMutation = useUpdateCart()

  // Load data from session on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRecommendation = loadRecommendationFromSession()
      const storedAnswers = loadAnswersFromSession()

      if (storedRecommendation) setRecommendation(storedRecommendation)
      if (storedAnswers) setAnswers(storedAnswers)

      if (storedRecommendation && !product) {
        retrieveProduct({
          handle: storedRecommendation.productHandle,
          region_id: loaderData?.region?.id,
          fields: "*variants, +variants.calculated_price, *images, *options",
        }).then(setProduct)
      }
    }
  }, [])

  // Redirect to quiz if no recommendation
  useEffect(() => {
    if (
      !recommendation &&
      typeof window !== "undefined" &&
      !loadRecommendationFromSession()
    ) {
      navigate({
        to: "/$countryCode/quiz",
        params: { countryCode },
      })
    }
  }, [recommendation, countryCode, navigate])

  const handleAddToCart = async () => {
    if (!recommendation || !product) return

    try {
      const variant = product.variants?.[0]
      if (!variant) throw new Error("No variant found")

      // Add to cart
      await addToCartMutation.mutateAsync({
        variant_id: variant.id,
        quantity,
        country_code: countryCode,
        product,
        variant,
        region: loaderData?.region,
      })

      // Attach quiz metadata to cart
      if (answers) {
        await updateCartMutation.mutateAsync({
          metadata: {
            quiz_version: "quiz_v1",
            quiz_answers: answers,
            quiz_recommended_product: recommendation.productHandle,
            quiz_completed_at: new Date().toISOString(),
          },
        })
      }

      // Clear quiz session
      clearQuizSession()

      // Redirect to cart
      navigate({
        to: "/$countryCode/cart",
        params: { countryCode },
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("Failed to add to cart. Please try again.")
    }
  }

  if (!recommendation || !product || !answers) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  const variant = product.variants?.[0]
  const price = variant?.calculated_price

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-medium text-zinc-900 mb-2">
              Confirm Your Selection
            </h1>
            <p className="text-zinc-600">
              Review your quiz results and product selection before adding to
              cart
            </p>
          </div>

          {/* Quiz Summary */}
          <div className="bg-zinc-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-zinc-900 mb-4">
              Your Answers
            </h2>
            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((question) => {
                const answer = answers[question.id]
                if (!answer) return null

                let answerText = ""
                if (question.type === "single") {
                  const option = question.options.find(
                    (opt) => opt.value === answer
                  )
                  answerText = option?.label || String(answer)
                } else if (Array.isArray(answer)) {
                  answerText = answer
                    .map(
                      (val) =>
                        question.options.find((opt) => opt.value === val)
                          ?.label || val
                    )
                    .join(", ")
                }

                return (
                  <div key={question.id} className="flex flex-col gap-1">
                    <p className="text-sm text-zinc-600">{question.question}</p>
                    <p className="text-base font-medium text-zinc-900">
                      {answerText}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Product Summary */}
          <div className="bg-white border-2 border-zinc-200 rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-lg font-medium text-zinc-900 mb-4">
                Recommended Product
              </h2>
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-32 h-32 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                      No image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-zinc-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-zinc-600 mb-3">{recommendation.reason}</p>
                  <div className="flex items-center gap-4">
                    {price && (
                      <p className="text-lg font-medium text-zinc-900">
                        {formatPrice({
                          amount: price.calculated_amount,
                          currency_code: loaderData?.region?.currency_code,
                        })}
                      </p>
                    )}
                    <p className="text-zinc-600">Quantity: {quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() =>
                navigate({
                  to: "/$countryCode/quiz-results",
                  params: { countryCode },
                })
              }
            >
              Back to Results
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
