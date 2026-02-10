import ProductActions from "@/components/product-actions"
import { ImageGalleryEnhanced } from "@/components/ui/image-gallery-enhanced"
import { ProductAccordions } from "@/components/product/product-accordions"
import { useLoaderData, useLocation, Link } from "@tanstack/react-router"
import { useProducts } from "@/lib/hooks/use-products"
import { getCountryCodeFromPath } from "@/lib/utils/region"
import { useState, useMemo, useCallback, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { Share, Star, CheckCircleSolid } from "@medusajs/icons"
import { Button } from "@/components/ui/button"
import { DEFAULT_CART_DROPDOWN_FIELDS } from "@/components/cart"
import { useAddToCart } from "@/lib/hooks/use-cart"
import { useCartDrawer } from "@/lib/context/cart"

const ProductDetails = () => {
  const loaderData = useLoaderData({
    from: "/$countryCode/products/$handle",
  })
  
  if (!loaderData) {
    return null
  }
  
  const { product, region, routineProducts, countryCode } = loaderData
  
  const location = useLocation()

  const [selectedVariant, setSelectedVariant] = useState<HttpTypes.StoreProductVariant | undefined>(undefined)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [deliveryCadence, setDeliveryCadence] = useState<'one-time' | 'monthly' | 'quarterly'>('one-time')
  const [quantity, setQuantity] = useState(1)

  const addToCartMutation = useAddToCart({
    fields: DEFAULT_CART_DROPDOWN_FIELDS,
  })
  const { openCart } = useCartDrawer()
  
  // Extract unique sizes and delivery options
  const sizeOption = product.options?.find((opt: HttpTypes.StoreProductOption) => opt.title.toLowerCase() === 'size')
  const deliveryOption = product.options?.find((opt: HttpTypes.StoreProductOption) => opt.title.toLowerCase() === 'delivery option')
  
  const availableSizes = useMemo(() => {
    if (!sizeOption?.values) return []
    return sizeOption.values.map((v: HttpTypes.StoreProductOptionValue) => v.value)
  }, [sizeOption])
  
  const availableDeliveryOptions = useMemo(() => {
    if (!deliveryOption?.values) return []
    return deliveryOption.values.map((v: HttpTypes.StoreProductOptionValue) => v.value)
  }, [deliveryOption])

  // Initialize with first size
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0])
    }
  }, [availableSizes, selectedSize])

  // Update selected variant when size or delivery changes
  useEffect(() => {
    if (!sizeOption || !deliveryOption || !selectedSize) return
    
    const deliveryValue = deliveryCadence === 'one-time' ? 'One-time' : 
                          deliveryCadence === 'monthly' ? 'Monthly' : 'Quarterly'
    
    const variant = product.variants?.find((v: HttpTypes.StoreProductVariant) => {
      const variantSize = v.options?.find((o: HttpTypes.StoreProductOptionValue) => o.option_id === sizeOption.id)?.value
      const variantDelivery = v.options?.find((o: HttpTypes.StoreProductOptionValue) => o.option_id === deliveryOption.id)?.value
      return variantSize === selectedSize && variantDelivery === deliveryValue
    })
    
    setSelectedVariant(variant)
  }, [selectedSize, deliveryCadence, product.variants, sizeOption, deliveryOption])

  const handleVariantChange = useCallback((variant: HttpTypes.StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
  }, [])

  const handleOptionsChange = useCallback((options: Record<string, string | undefined>) => {
    const definedOptions = Object.entries(options).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, string>)
    setSelectedOptions(definedOptions)
  }, [])

  const handleAddToCart = useCallback(async () => {
    if (!selectedVariant?.id) return
    
    addToCartMutation.mutateAsync(
      {
        variant_id: selectedVariant.id,
        quantity: quantity,
        country_code: countryCode,
        product,
        variant: selectedVariant,
        region,
      },
      {
        onSuccess: () => {
          console.log("Item added to cart")
          openCart()
        },
        onError: () => {
          console.error("Failed to add item to cart")
        },
      }
    )
  }, [selectedVariant, quantity, countryCode, product, region, addToCartMutation, openCart])

  const handleShare = useCallback(() => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        const input = document.createElement('input')
        input.value = url
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
  }, [])

  // Fetch related products
  const { data: relatedProductsData } = useProducts({
    query_params: { 
      fields: "id,title,handle,thumbnail,calculated_price",
      limit: 5 
    },
    region_id: region.id,
  })

  const relatedProducts =
    relatedProductsData?.pages
      .flatMap((page) => page.products)
      .filter((p) => p.id !== product.id)
      .slice(0, 4) || []

  // Reorder images based on selected color option
  const displayImages = useMemo(() => {
    const allImages = product.images || []
    
    const colorOption = product.options?.find(
      (opt: HttpTypes.StoreProductOption) => opt.title.toLowerCase() === 'color'
    )
    
    if (!colorOption) {
      return allImages
    }

    const selectedColorValue = selectedOptions[colorOption.id]
    
    if (!selectedColorValue) {
      return allImages
    }

    const matchingVariants = product.variants?.filter((variant: HttpTypes.StoreProductVariant) => {
      return variant.options?.some(
        (opt: HttpTypes.StoreProductOptionValue) => opt.option_id === colorOption.id && opt.value === selectedColorValue
      )
    }) || []

    const variantImageIds = new Set(
      matchingVariants.flatMap((v: HttpTypes.StoreProductVariant) => v.images?.map((img: HttpTypes.StoreProductImage) => img.id) || [])
    )

    const variantImages = allImages.filter((img: HttpTypes.StoreProductImage) => variantImageIds.has(img.id))
    const otherImages = allImages.filter((img: HttpTypes.StoreProductImage) => !variantImageIds.has(img.id))

    return [...variantImages, ...otherImages]
  }, [product.images, product.options, product.variants, selectedOptions])

  // Placeholder reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      verified: true,
      text: "This product has completely transformed my skin. After just two weeks, I noticed a significant improvement in texture and hydration."
    },
    {
      id: 2,
      author: "Emma K.",
      rating: 5,
      date: "2024-01-10",
      verified: true,
      text: "Perfect for my sensitive skin. No irritation at all, and it absorbs quickly without leaving a greasy residue."
    },
    {
      id: 3,
      author: "Lisa R.",
      rating: 4,
      date: "2024-01-05",
      verified: true,
      text: "Great product overall. The texture is lovely and it works well under makeup. Would love a larger size option!"
    },
    {
      id: 4,
      author: "Anna B.",
      rating: 5,
      date: "2023-12-28",
      verified: true,
      text: "I have tried many products, but this one is by far the best. My skin feels softer and looks more radiant every day."
    }
  ]

  // Placeholder recommended products
  const recommendedProducts = [
    {
      id: 1,
      title: "Gentle Cleanser",
      price: "28.00",
      image: "https://placehold.co/400x400/e8dfd6/8b7355?text=Cleanser"
    },
    {
      id: 2,
      title: "Nourishing Serum",
      price: "45.00",
      image: "https://placehold.co/400x400/e8dfd6/8b7355?text=Serum"
    },
    {
      id: 3,
      title: "SPF Protection",
      price: "32.00",
      image: "https://placehold.co/400x400/e8dfd6/8b7355?text=SPF"
    }
  ]

  const averageRating = 4.8
  const totalReviews = 247

  return (
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="max-w-6xl mx-auto px-4">
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
                  <Star key={`rating-${i}`} className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="text-sm text-slate-600">
                {averageRating} ({totalReviews} reviews)
              </span>
            </div>

            {product.description && (
              <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>
            )}

            {/* Key Benefits */}
            <div className="mb-6 p-4 bg-frost-50 rounded-lg">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleSolid className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Dermatologically tested</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleSolid className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Suitable for sensitive skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleSolid className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Free from parabens and sulfates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleSolid className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Cruelty-free and vegan</span>
                </li>
              </ul>
            </div>

            {/* Price */}
            {selectedVariant && (
              <div className="mb-6">
                <div className="text-3xl font-display text-slate-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: selectedVariant.calculated_price?.currency_code?.toUpperCase() || region.currency_code.toUpperCase(),
                  }).format(selectedVariant.calculated_price?.calculated_amount || 0)}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-900 mb-3">Select Size</label>
                <div className="flex gap-3">
                  {availableSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 hover:border-slate-300 text-slate-900'
                      }`}
                    >
                      {size}
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
                      onChange={(e) => setDeliveryCadence(e.target.value as "one-time")}
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
                      onChange={(e) => setDeliveryCadence(e.target.value as "monthly")}
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
                      onChange={(e) => setDeliveryCadence(e.target.value as "quarterly")}
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

            {/* Quantity and Add to Cart */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center border-2 border-slate-200 rounded-lg hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    type="button"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border-2 border-slate-200 rounded-lg hover:border-slate-300 font-medium"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant || addToCartMutation.isPending}
                variant="primary"
                className="w-full h-12 text-base font-medium"
              >
                {!selectedVariant
                  ? "Select options"
                  : addToCartMutation.isPending
                    ? "Adding..."
                    : "Add to cart"}
              </Button>
            </div>

            {/* Product Information Accordions */}
            <div className="mb-6">
              <ProductAccordions />
            </div>

            {/* Share Product */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-sky-700 transition-colors"
            >
              <Share className="w-4 h-4" />
              {copied ? "Link copied!" : "Share Product"}
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-slate-900 mb-2">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={`avg-${i}`} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
              ))}
            </div>
            <span className="text-slate-600">
              {averageRating} out of 5 based on {totalReviews} reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
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
                      <Star key={`review-${review.id}-${i}`} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-slate-900 mb-2">Complete Your Routine</h2>
          <p className="text-slate-600">Products that work well with your selection</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {routineProducts && routineProducts.length > 0 ? (
            routineProducts.map((prod: any) => {
              const variant = prod.variants?.[0];
              const price = variant?.calculated_price;
              const formattedPrice = price
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency_code.toUpperCase(),
                  }).format(price.calculated_amount)
                : null;

              return (
                <Link
                  key={prod.id}
                  to="/$countryCode/products/$handle"
                  params={{ countryCode, handle: prod.handle }}
                  className="bg-frost-50 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-slate-200 flex items-center justify-center overflow-hidden">
                    {prod.thumbnail ? (
                      <img
                        src={prod.thumbnail}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-slate-400 text-sm">Product Image</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-slate-900 mb-1">{prod.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{prod.description || 'Enhance your skincare routine with this complementary product.'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-display text-slate-900">{formattedPrice || '$--'}</span>
                      <button className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        View Product
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="col-span-3 text-center text-slate-500">No complementary products available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
