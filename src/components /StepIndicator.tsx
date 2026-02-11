// components/StepIndicator.jsx
import React from "react";

const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto mt-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={step} className="flex-1 flex items-center">
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
                ${isCompleted ? "bg-green-500 border-green-500" : ""}
                ${isActive ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
