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

  // Centralized form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    dob: "",
    street: "",
    city: "",
    zip: "",
    idFile: null as File | null,
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <KycStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return <VerifyStep data={formData} />;
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
