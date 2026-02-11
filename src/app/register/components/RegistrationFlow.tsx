"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepCard from "./StepCard";
import StepIndicator from "./StepIndicator";
import RegisterStep from "./steps/RegisterStep";
import KycStep from "./steps/KycStep";
import VerifyStep from "./steps/VerifyStep";

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RegisterStep onNext={() => setStep(2)} />;
      case 2:
        return <KycStep onNext={() => setStep(3)} />;
      case 3:
        return (
          <VerifyStep />
        );
      default:
        return null;
    }
  };

  return (
    <StepCard>
      <StepIndicator currentStep={step} onStepClick={(s) => setStep(s)} />

      <div className="flex-1 flex items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderStep()}

            {/* Optional Back Button inside the step card */}
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 w-full bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200"
              >
                Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </StepCard>
  );
}
