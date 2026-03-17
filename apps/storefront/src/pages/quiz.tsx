import { useState } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"

const skinIssues = [
  { id: "acne", label: "Acne & Breakouts", description: "Persistent breakouts and blemishes" },
  { id: "dryness", label: "Dryness", description: "Tight, flaky, or rough texture" },
  { id: "oiliness", label: "Excess Oil", description: "Shiny skin and enlarged pores" },
  { id: "sensitivity", label: "Sensitivity", description: "Redness and irritation" },
  { id: "aging", label: "Fine Lines & Wrinkles", description: "Signs of aging" },
  { id: "dark-spots", label: "Dark Spots", description: "Hyperpigmentation and uneven tone" },
  { id: "dullness", label: "Dullness", description: "Lack of radiance and glow" },
  { id: "texture", label: "Uneven Texture", description: "Rough or bumpy skin" },
]

const routinePreferences = [
  { id: "minimal", label: "Minimal", description: "Quick 2-3 step routine" },
  { id: "moderate", label: "Moderate", description: "Balanced 4-5 step routine" },
  { id: "extensive", label: "Extensive", description: "Comprehensive 6+ step routine" },
]

export default function Quiz() {
  const navigate = useNavigate()
  const search = useSearch({ from: "/$countryCode/quiz" })
  const step = (search as any)?.step || "1"
  
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [selectedRoutine, setSelectedRoutine] = useState<string>("")

  const toggleIssue = (issueId: string) => {
    setSelectedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    )
  }

  const handleNext = () => {
    if (step === "1" && selectedIssues.length > 0) {
      navigate({ search: { step: "2" } } as any)
    } else if (step === "2" && selectedRoutine) {
      navigate({
        to: "/$countryCode/quiz-results" as string,
        params: { countryCode: "us" },
        search: {
          issues: selectedIssues.join(","),
          routine: selectedRoutine,
        },
      } as any)
    }
  }

  const handleBack = () => {
    if (step === "2") {
      navigate({ search: { step: "1" } } as any)
    }
  }

  return (
    <div className="content-container py-16">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 2</span>
            <span className="text-sm text-gray-600">
              {step === "1" ? "Skin Concerns" : "Routine Preference"}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: step === "1" ? "50%" : "100%" }}
            />
          </div>
        </div>

        {step === "1" ? (
          <div>
            <h1 className="text-4xl font-light mb-4">What are your main skin concerns?</h1>
            <p className="text-gray-600 mb-8">Select all that apply</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {skinIssues.map(issue => (
                <button
                  key={issue.id}
                  onClick={() => toggleIssue(issue.id)}
                  className={`p-6 text-left border-2 rounded-lg transition-all ${
                    selectedIssues.includes(issue.id)
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{issue.label}</h3>
                      <p className="text-sm text-gray-600">{issue.description}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                        selectedIssues.includes(issue.id)
                          ? "bg-black border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedIssues.includes(issue.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedIssues.length} concern{selectedIssues.length !== 1 ? "s" : ""} selected
              </div>
              <button
                onClick={handleNext}
                disabled={selectedIssues.length === 0}
                className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-light mb-4">What's your ideal routine length?</h1>
            <p className="text-gray-600 mb-8">Choose the routine that fits your lifestyle</p>
            
            <div className="space-y-4 mb-8">
              {routinePreferences.map(routine => (
                <button
                  key={routine.id}
                  onClick={() => setSelectedRoutine(routine.id)}
                  className={`w-full p-6 text-left border-2 rounded-lg transition-all ${
                    selectedRoutine === routine.id
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium mb-1">{routine.label}</h3>
                      <p className="text-sm text-gray-600">{routine.description}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                        selectedRoutine === routine.id
                          ? "bg-black border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedRoutine === routine.id && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedRoutine}
                className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
              >
                See My Recommendations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
