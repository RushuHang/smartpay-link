"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StepCard from "./StepCard";
import StepIndicator from "./StepIndicator";

// Steps
import NameStep from "./steps/NameStep";
import PhoneStep from "./steps/PhoneStep";
import EmailStep from "./steps/EmailStep";
import SecurityStep from "./steps/SecurityStep";
import VerifyStep from "./steps/VerifyStep";

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NameStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <PhoneStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <EmailStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <SecurityStep
            data={formData}
            setData={setFormData}
            onNext={() => setStep(5)}
          />
        );
      case 5:
        return <VerifyStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <StepCard>
      <StepIndicator
        key={step} // force remount
        currentStep={step}
        onStepClick={(s) => setStep(s)}
      />

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

            {step > 1 && step < 5 && (
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
