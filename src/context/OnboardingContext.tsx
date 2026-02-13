"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CompleteFormData } from "@/lib/schemas/onboarding";

interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Partial<CompleteFormData>;
  setFormData: (data: Partial<CompleteFormData>) => void;
  updateFormData: (step: number, data: Partial<CompleteFormData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  totalSteps: number;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CompleteFormData>>({
    owners: [
      {
        fullName: "",
        ownershipPercentage: 0,
        dateOfBirth: "",
        nationality: "",
        governmentIdNumber: "",
        email: "",
        phoneNumber: "",
        governmentIdDocument: "",
      },
    ],
  });

  const totalSteps = 7;

  const updateFormData = (step: number, data: Partial<CompleteFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        updateFormData,
        nextStep,
        previousStep,
        totalSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
