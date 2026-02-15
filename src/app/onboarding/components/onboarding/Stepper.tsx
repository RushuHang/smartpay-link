"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { motion } from "framer-motion";
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
    <div className="mb-8 h-full pt-16 px-4">
      <div className="flex flex-col space-y-0">
        {STEPS.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isLastStep = index === STEPS.length - 1;

          return (
            <div key={step.number} className="relative flex items-start gap-4 pb-8 last:pb-0">
              
              {/* ------------------------------------------
                  Vertical Connecting Lines
                 ------------------------------------------ */}
              {!isLastStep && (
                <div className="absolute left-5 top-10 bottom-0 w-[2px] -ml-[1px]">
                  {/* Gray Background Track */}
                  <div className="absolute inset-0 bg-slate-100 w-full h-full" />
                  
                  {/* Blue Progress Line */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full bg-[#0F172A]"
                  />
                </div>
              )}

              {/* ------------------------------------------
                  Step Circle Indicator
                 ------------------------------------------ */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isActive || isCompleted ? "#0F172A" : "#ffffff",
                    borderColor: isActive || isCompleted ? "#0F172A" : "#e2e8f0",
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-shadow duration-300
                    ${isActive ? "ring-4 ring-[#0F172A]/20 shadow-lg shadow-[#0F172A]/30" : ""}
                    ${!isActive && !isCompleted ? "bg-white border-slate-200 text-slate-400" : ""}
                  `}
                >
                  <div className="flex items-center justify-center">
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isActive ? "text-white" : "text-slate-500"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* ------------------------------------------
                  Label Text
                 ------------------------------------------ */}
              <div className="pt-2">
                <motion.p
                  animate={{
                    color: isActive ? "#0F172A" : isCompleted ? "#0F172A" : "#94a3b8",
                    fontWeight: isActive ? 600 : 500,
                    x: isActive ? 4 : 0, // Subtle nudge right when active
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-sm tracking-tight"
                >
                  {step.title}
                </motion.p>
                {/* Optional: Add a subtitle or description here if needed */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}