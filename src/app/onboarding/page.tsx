"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { Step1BusinessInfo } from "./components/onboarding/Step1BusinessInfo";
import { Step2Address } from "./components/onboarding/Step2Address";
// import { Step3Transaction } from "./components/onboarding/Step3Transaction";
import { Step4KYC } from "./components/onboarding/Step4KYC";
import { Step5Owners } from "./components/onboarding/Step5Owners";
import { Step6BankAccount } from "./components/onboarding/Step6BankAccount";
import { Step7Review } from "./components/onboarding/Step7Review";

function OnboardingContent() {
  const { currentStep } = useOnboarding();

  return (
    <main className="bg-background w-full max-w-2xl">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
        {currentStep === 1 && <Step1BusinessInfo />}
        {currentStep === 2 && <Step2Address />}
        {/* {currentStep === 3 && <Step3Transaction />} */}
        {currentStep === 3 && <Step4KYC />}
        {currentStep === 4 && <Step5Owners />}
        {currentStep === 5 && <Step6BankAccount />}
        {currentStep === 6 && <Step7Review />}
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return <OnboardingContent />;
}
