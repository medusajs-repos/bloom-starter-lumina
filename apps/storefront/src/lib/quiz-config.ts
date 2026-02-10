// Quiz configuration and recommendation logic

export type QuizQuestionType = "single" | "multi"

export interface QuizOption {
  id: string
  label: string
  value: string
}

export interface QuizQuestion {
  id: string
  question: string
  type: QuizQuestionType
  options: QuizOption[]
  required: boolean
}

export interface QuizAnswers {
  [questionId: string]: string | string[]
}

export interface ProductRecommendation {
  productHandle: string
  variantId: string
  reason: string
}

// Quiz questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "skin_goal",
    question: "What is your main skin goal?",
    type: "single",
    required: true,
    options: [
      { id: "hydration", label: "Hydration", value: "hydration" },
      { id: "acne", label: "Acne Control", value: "acne" },
      { id: "anti_aging", label: "Anti-Aging", value: "anti_aging" },
      { id: "sensitivity", label: "Sensitivity Relief", value: "sensitivity" },
    ],
  },
  {
    id: "skin_type",
    question: "How would you describe your skin type?",
    type: "single",
    required: true,
    options: [
      { id: "dry", label: "Dry", value: "dry" },
      { id: "oily", label: "Oily", value: "oily" },
      { id: "combination", label: "Combination", value: "combination" },
      { id: "normal", label: "Normal", value: "normal" },
    ],
  },
  {
    id: "concerns",
    question: "Any current concerns? (Select all that apply)",
    type: "multi",
    required: false,
    options: [
      { id: "redness", label: "Redness", value: "redness" },
      { id: "breakouts", label: "Breakouts", value: "breakouts" },
      { id: "texture", label: "Uneven Texture", value: "texture" },
      { id: "dark_spots", label: "Dark Spots", value: "dark_spots" },
    ],
  },
  {
    id: "sensitivity",
    question: "How sensitive is your skin?",
    type: "single",
    required: true,
    options: [
      { id: "low", label: "Low", value: "low" },
      { id: "medium", label: "Medium", value: "medium" },
      { id: "high", label: "High", value: "high" },
    ],
  },
]

// Product mapping
const PRODUCT_MAP = {
  moisturizer1: {
    handle: "hydrating-moisturizer",
    variantId: "variant_01KGS5D3RYT4BZB89XREC96FZ8",
  },
  moisturizer2: {
    handle: "balancing-moisturizer",
    variantId: "variant_01KGS5P2MGRSVCBQSCBN4TQQQ1",
  },
  moisturizer3: {
    handle: "protective-moisturizer",
    variantId: "variant_01KGS6QVP79P48E8305HRR4VC6",
  },
}

// Recommendation logic - deterministic mapping
export function getRecommendation(answers: QuizAnswers): ProductRecommendation {
  const skinGoal = answers.skin_goal as string
  const skinType = answers.skin_type as string
  const sensitivity = answers.sensitivity as string
  const concerns = answers.concerns as string[] || []

  // Hydrating Moisturizer: Hydration-focused / dry or dehydrated skin
  if (
    skinGoal === "hydration" ||
    skinType === "dry" ||
    skinType === "normal" && sensitivity === "low"
  ) {
    return {
      productHandle: PRODUCT_MAP.moisturizer1.handle,
      variantId: PRODUCT_MAP.moisturizer1.variantId,
      reason:
        "Based on your answers, this hydrating formula is perfect for delivering deep moisture to dry and dehydrated skin.",
    }
  }

  // Balancing Moisturizer: Acne-prone / oily or combination skin
  if (
    skinGoal === "acne" ||
    skinType === "oily" ||
    skinType === "combination" ||
    concerns.includes("breakouts")
  ) {
    return {
      productHandle: PRODUCT_MAP.moisturizer2.handle,
      variantId: PRODUCT_MAP.moisturizer2.variantId,
      reason:
        "Based on your answers, this lightweight formula helps control oil and prevent breakouts while keeping skin balanced.",
    }
  }

  // Protective Moisturizer: Sensitive or barrier-focused needs
  if (
    skinGoal === "sensitivity" ||
    sensitivity === "high" ||
    sensitivity === "medium" ||
    concerns.includes("redness")
  ) {
    return {
      productHandle: PRODUCT_MAP.moisturizer3.handle,
      variantId: PRODUCT_MAP.moisturizer3.variantId,
      reason:
        "Based on your answers, this gentle formula is designed to soothe sensitive skin and strengthen your skin barrier.",
    }
  }

  // Default fallback to Hydrating Moisturizer
  return {
    productHandle: PRODUCT_MAP.moisturizer1.handle,
    variantId: PRODUCT_MAP.moisturizer1.variantId,
    reason:
      "Based on your answers, this formula best matches your skin's needs.",
  }
}

// Session storage helpers
const STORAGE_KEY = "skincare_quiz_answers"
const STORAGE_RECOMMENDATION_KEY = "skincare_quiz_recommendation"

export function saveAnswersToSession(answers: QuizAnswers): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
  }
}

export function loadAnswersFromSession(): QuizAnswers | null {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function saveRecommendationToSession(
  recommendation: ProductRecommendation
): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      STORAGE_RECOMMENDATION_KEY,
      JSON.stringify(recommendation)
    )
  }
}

export function loadRecommendationFromSession(): ProductRecommendation | null {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem(STORAGE_RECOMMENDATION_KEY)
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export function clearQuizSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_RECOMMENDATION_KEY)
  }
}
