"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Props = {
  currentStep: number;
  onStepClick?: (step: number) => void;
};

const steps = [
  "Name",
  "Phone", // Shortened slightly for better mobile fit
  "Email",
  "Security",
  "Verify",
];

export default function StepIndicator({ currentStep, onStepClick }: Props) {
  
  // Calculate progress percentage for the continuous line
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-12 px-4">
      <div className="relative">
        
        {/* ------------------------------------------
            Background Track Lines
           ------------------------------------------ */}
        {/* Gray Background Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full -z-10" />
        
        {/* Colored Progress Line (Animated) */}
        <motion.div 
          className="absolute top-5 left-0 h-1 bg-brand-primary rounded-full -z-10 origin-left"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* ------------------------------------------
            Steps
           ------------------------------------------ */}
        <div className="flex justify-between items-start w-full">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <div
                key={label}
                className="flex flex-col items-center group relative"
                style={{ width: "80px" }} // Fixed width to ensure text centers relative to dot
              >
                {/* Step Circle */}
                <motion.button
                  onClick={() => isCompleted && onStepClick?.(stepNumber)}
                  disabled={!isCompleted}
                  initial={false}
                  animate={{
                    backgroundColor: isActive || isCompleted ? "var(--brand-primary)" : "#ffffff",
                    borderColor: isActive || isCompleted ? "var(--brand-primary)" : "#e2e8f0",
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center
                    transition-shadow duration-300
                    ${isCompleted ? "cursor-pointer hover:opacity-90" : "cursor-default"}
                    ${isActive ? "ring-4 ring-brand-primary/20 shadow-lg shadow-brand-primary/30" : ""}
                    ${!isActive && !isCompleted ? "bg-white border-slate-200 text-slate-400" : ""}
                  `}
                  // Use CSS variable injection for framer-motion colors if needed, 
                  // or hardcode hex codes if Tailwind variables aren't resolving in JS.
                  // Assuming 'bg-brand-primary' maps to a specific hex (e.g., #2563EB).
                  style={
                    { "--brand-primary": "#0F172A" } as React.CSSProperties
                  } 
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
                        {stepNumber}
                      </span>
                    )}
                  </div>
                </motion.button>

                {/* Label */}
                <motion.span
                  animate={{
                    color: isActive ? "#0F172A" : isCompleted ? "#0F172A" : "#94a3b8",
                    fontWeight: isActive ? 600 : 500,
                    y: isActive ? 0 : 0
                  }}
                  className="mt-3 text-xs sm:text-sm text-center tracking-tight absolute top-10 w-32"
                >
                  {label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}