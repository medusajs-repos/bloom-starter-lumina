interface QuizProgressProps {
  currentStep: number
  totalSteps: number
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-zinc-600">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-sm text-zinc-600">
          {Math.round((currentStep / totalSteps) * 100)}%
        </p>
      </div>
      <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}
