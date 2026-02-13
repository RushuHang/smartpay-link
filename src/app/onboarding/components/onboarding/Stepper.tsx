"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { Check } from "lucide-react";

const STEPS = [
  { number: 1, title: "Business Info" },
  { number: 2, title: "Address" },
  // { number: 3, title: "Transactions" },
  { number: 3, title: "KYC" },
  { number: 4, title: "Owners" },
  { number: 5, title: "Bank Account" },
  { number: 6, title: "Review" },
];

export function Stepper() {
  const { currentStep } = useOnboarding();

  return (
    <div className="mb-8 h-full space-y-6 pt-16">
      {STEPS.map((step) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        return (
          <div key={step.number}>
            <div className="h-full">
              <p
                className={`font-medium transition-all py-3 px-4 rounded-md ${
                  isActive ? "text-brand-navy bg-[#EFF3F6]" : isCompleted ? "text-white" : "text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="inline-block h-4" /> : `${step.number}.`}
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
