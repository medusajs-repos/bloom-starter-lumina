import { useState } from "react"
import { QuizQuestion as QuizQuestionType } from "@/lib/quiz-config"
import { Button } from "@/components/ui/button"

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface QuizQuestionProps {
  question: QuizQuestionType
  answer: string | string[] | undefined
  onAnswer: (answer: string | string[]) => void
  onNext: () => void
  onBack?: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function QuizQuestion({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}: QuizQuestionProps) {
  const [touched, setTouched] = useState(false)

  const handleSingleSelect = (value: string) => {
    onAnswer(value)
    setTouched(true)
  }

  const handleMultiSelect = (value: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : []
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((a) => a !== value)
      : [...currentAnswers, value]
    onAnswer(newAnswers)
    setTouched(true)
  }

  const isAnswered = () => {
    if (!question.required) return true
    if (question.type === "single") {
      return !!answer && typeof answer === "string"
    }
    return Array.isArray(answer) && answer.length > 0
  }

  const showError = touched && question.required && !isAnswered()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-2">
          {question.question}
        </h2>
        {!question.required && (
          <p className="text-sm text-zinc-500">Optional</p>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option) => {
          const isSelected =
            question.type === "single"
              ? answer === option.value
              : Array.isArray(answer) && answer.includes(option.value)

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                question.type === "single"
                  ? handleSingleSelect(option.value)
                  : handleMultiSelect(option.value)
              }
              className={cn(
                "w-full p-4 border-2 rounded-lg text-left transition-all",
                "hover:border-zinc-900 hover:bg-zinc-50",
                isSelected
                  ? "border-zinc-900 bg-zinc-50"
                  : "border-zinc-200 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                    question.type === "single" ? "rounded-full" : "rounded",
                    isSelected
                      ? "border-zinc-900 bg-zinc-900"
                      : "border-zinc-300"
                  )}
                >
                  {isSelected && (
                    <div
                      className={cn(
                        "bg-white",
                        question.type === "single"
                          ? "w-2 h-2 rounded-full"
                          : "w-3 h-3 rounded-sm"
                      )}
                    />
                  )}
                </div>
                <span className="text-base text-zinc-900">{option.label}</span>
              </div>
            </button>
          )
        })}
      </div>

      {showError && (
        <p className="text-sm text-rose-600 mb-4">
          Please select at least one option to continue
        </p>
      )}

      <div className="flex items-center justify-between">
        {!isFirstStep && onBack ? (
          <Button
            type="button"
            onClick={onBack}
            variant="secondary"
            className="px-6"
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="button"
          onClick={() => {
            console.log("Button clicked. Question:", question.id, "Answer:", answer, "isAnswered:", isAnswered())
            setTouched(true)
            if (isAnswered()) {
              console.log("Calling onNext")
              onNext()
            } else {
              console.log("Not answered, not calling onNext")
            }
          }}
          disabled={question.required && !isAnswered()}
          className="px-6"
        >
          {isLastStep ? "See Results" : "Next"}
        </Button>
      </div>
    </div>
  )
}
