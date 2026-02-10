import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$countryCode/quiz")({
  component: Quiz,
});

type QuizAnswers = {
  currentIssues: string[];
  skincareGoals: string;
  skinSensitivity: string;
  age: string;
  hasAdditionalInfo: boolean | null;
  additionalInfo: string;
  skinType?: string;
  concerns?: string;
  sensitivity?: string;
};

function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    currentIssues: [],
    skincareGoals: "",
    skinSensitivity: "Moderately Sensitive",
    age: "",
    hasAdditionalInfo: null,
    additionalInfo: "",
  });
  const navigate = useNavigate();
  const { countryCode } = Route.useParams();

  const handleNext = () => {
    // If we're on step 5 and they said "No", skip step 6
    if (step === 5 && answers.hasAdditionalInfo === false) {
      // Navigate to results
      const productHandle = getRecommendation(answers);
      const params = new URLSearchParams({
        product: productHandle,
        currentIssues: answers.currentIssues.join(','),
        skincareGoals: answers.skincareGoals || '',
        skinSensitivity: answers.skinSensitivity || '',
        age: answers.age || '',
        additionalInfo: answers.additionalInfo || '',
      });
      window.location.href = `/${countryCode}/quiz-results?${params.toString()}`;
    } else if (step < 6) {
      setStep(step + 1);
    } else {
      // Navigate to results with product handle and quiz answers
      const productHandle = getRecommendation(answers);
      const params = new URLSearchParams({
        product: productHandle,
        currentIssues: answers.currentIssues.join(','),
        skincareGoals: answers.skincareGoals || '',
        skinSensitivity: answers.skinSensitivity || '',
        age: answers.age || '',
        additionalInfo: answers.additionalInfo || '',
      });
      window.location.href = `/${countryCode}/quiz-results?${params.toString()}`;
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleIssue = (issue: string) => {
    setAnswers((prev) => {
      const newIssues = prev.currentIssues.includes(issue)
        ? prev.currentIssues.filter((i) => i !== issue)
        : [...prev.currentIssues, issue];
      
      console.log('toggleIssue called:', issue);
      console.log('Current issues:', prev.currentIssues);
      console.log('New issues:', newIssues);
      
      return {
        ...prev,
        currentIssues: newIssues,
      };
    });
  };

  const canProceed = () => {
    const result = (() => {
      switch (step) {
        case 1:
          return answers.currentIssues.length > 0;
        case 2:
          return answers.skincareGoals !== "";
        case 3:
          return answers.skinSensitivity !== "";
        case 4:
          return answers.age !== "";
        case 5:
          return answers.hasAdditionalInfo !== null;
        case 6:
          return true; // Text field is optional
        default:
          return false;
      }
    })();
    
    console.log('canProceed check:', {
      step,
      currentIssues: answers.currentIssues,
      result
    });
    
    return result;
  };

  function getRecommendation(answers: QuizAnswers): string {
    const { currentIssues, skincareGoals, age } = answers;

    // Check for sensitive skin / calming needs
    if (
      skincareGoals === "Calming & Soothing" ||
      currentIssues.includes("Redness") ||
      answers.skinSensitivity === "Very Sensitive"
    ) {
      return "hydrating-moisturizer";
    }

    // Check for anti-aging focus
    if (
      skincareGoals === "Anti-Aging" ||
      currentIssues.includes("Fine Lines") ||
      age === "50+" ||
      age === "40-50"
    ) {
      return "protective-moisturizer";
    }

    // Default to balancing moisturizer for general hydration needs
    return "balancing-moisturizer";
  }

  return (
    <div className="min-h-screen bg-frost-50 pt-48 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-display text-slate-900">
              Find Your Perfect Moisturizer
            </h1>
            <span className="text-sm text-slate-600">Step {step} of {answers.hasAdditionalInfo === true ? 6 : answers.hasAdditionalInfo === false ? 5 : 6}</span>
          </div>
          <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / (answers.hasAdditionalInfo === true ? 6 : answers.hasAdditionalInfo === false && step > 5 ? 5 : 6)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          {step === 1 && (
            <div key="step-1" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Understanding your specific concerns helps us recommend the right active ingredients for your skin.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                What are your current skin concerns?
              </h2>
              <p className="text-slate-600">Select all that apply</p>
              <div className="space-y-3">
                {[
                  "Dryness",
                  "Oiliness",
                  "Acne",
                  "Fine Lines",
                  "Uneven Texture",
                  "Redness",
                ].map((issue) => (
                  <label
                    key={issue}
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-frost-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={answers.currentIssues.includes(issue)}
                      onChange={() => toggleIssue(issue)}
                      className="w-4 h-4 accent-sky-600"
                    />
                    <span className="text-slate-900">{issue}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div key="step-2" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Your main goal guides us to the moisturizer formula that delivers the results you're looking for.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                What is your primary skincare goal?
              </h2>
              <div className="space-y-3">
                {[
                  "Deep Hydration",
                  "Anti-Aging",
                  "Balance & Repair",
                  "Brightening",
                  "Calming & Soothing",
                ].map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-frost-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="skincareGoals"
                      checked={answers.skincareGoals === goal}
                      onChange={() =>
                        setAnswers({ ...answers, skincareGoals: goal })
                      }
                      className="w-4 h-4 accent-sky-600"
                    />
                    <span className="text-slate-900">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div key="step-3" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Sensitive skin needs gentler formulas. This helps us match you with the right ingredients.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                How sensitive is your skin?
              </h2>
              <div className="space-y-8 pt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Not Sensitive</span>
                  <span>Very Sensitive</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={
                    answers.skinSensitivity === "Not Sensitive"
                      ? 1
                      : answers.skinSensitivity === "Slightly Sensitive"
                      ? 2
                      : answers.skinSensitivity === "Moderately Sensitive"
                      ? 3
                      : answers.skinSensitivity === "Sensitive"
                      ? 4
                      : 5
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const sensitivity =
                      value === 1
                        ? "Not Sensitive"
                        : value === 2
                        ? "Slightly Sensitive"
                        : value === 3
                        ? "Moderately Sensitive"
                        : value === 4
                        ? "Sensitive"
                        : "Very Sensitive";
                    setAnswers({ ...answers, skinSensitivity: sensitivity });
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-frost-100 text-slate-900 rounded-lg font-medium">
                    {answers.skinSensitivity || "Not Sensitive"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div key="step-4" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Different ages have different skin needs. This ensures we recommend the most beneficial formula for you.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                What is your age range?
              </h2>
              <div className="space-y-3">
                {["Under 30", "30-40", "40-50", "50+"].map((ageRange) => (
                  <label
                    key={ageRange}
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-frost-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="age"
                      checked={answers.age === ageRange}
                      onChange={() => setAnswers({ ...answers, age: ageRange })}
                      className="w-4 h-4 accent-sky-600"
                    />
                    <span className="text-slate-900">{ageRange}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div key="step-5" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Optional additional information helps us provide more personalized recommendations.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                Is there anything else you would like us to know about your skin?
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setAnswers({ ...answers, hasAdditionalInfo: true })}
                  className={`w-full flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                    answers.hasAdditionalInfo === true
                      ? "border-sky-600 bg-frost-50"
                      : "border-slate-200 hover:bg-frost-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answers.hasAdditionalInfo === true ? "border-sky-600" : "border-slate-300"
                  }`}>
                    {answers.hasAdditionalInfo === true && (
                      <div className="w-2 h-2 rounded-full bg-sky-600" />
                    )}
                  </div>
                  <span className="text-slate-900">Yes</span>
                </button>
                <button
                  onClick={() => setAnswers({ ...answers, hasAdditionalInfo: false, additionalInfo: "" })}
                  className={`w-full flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                    answers.hasAdditionalInfo === false
                      ? "border-sky-600 bg-frost-50"
                      : "border-slate-200 hover:bg-frost-50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answers.hasAdditionalInfo === false ? "border-sky-600" : "border-slate-300"
                  }`}>
                    {answers.hasAdditionalInfo === false && (
                      <div className="w-2 h-2 rounded-full bg-sky-600" />
                    )}
                  </div>
                  <span className="text-slate-900">No</span>
                </button>
              </div>
            </div>
          )}

          {step === 6 && answers.hasAdditionalInfo === true && (
            <div key="step-6" className="space-y-6 animate-in slide-in-from-right duration-300">
              <p className="text-sm text-slate-500">
                Share any additional details about your skin that might help us provide better recommendations.
              </p>
              <h2 className="text-2xl font-light text-slate-900">
                Tell us more about your skin
              </h2>
              <div className="space-y-2">
                <textarea
                  value={answers.additionalInfo}
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      setAnswers({ ...answers, additionalInfo: e.target.value });
                    }
                  }}
                  placeholder="Enter any additional information (optional)"
                  className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 min-h-[150px] resize-none"
                  maxLength={250}
                />
                <div className="text-right text-sm text-slate-500">
                  {answers.additionalInfo.length} / 250 characters
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={step === 1}
              className="border-slate-300 text-slate-900 hover:bg-slate-50"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-sky-600 text-white hover:bg-sky-700"
            >
              {step === 6 || (step === 5 && answers.hasAdditionalInfo === false) ? "See Results" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
