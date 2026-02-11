type Props = {
  currentStep: number;
  onStepClick?: (step: number) => void;
};

export default function StepIndicator({ currentStep, onStepClick }: Props) {
  const steps = ["Register", "Verification", "Verify"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === currentStep;
          const clickable = stepNumber < currentStep;

          return (
            <div key={label} className="flex-1 text-center">
              <div
                onClick={() => clickable && onStepClick?.(stepNumber)}
                className={`text-sm font-medium ${
                  active ? "text-brand-primary" : "text-slate-400"
                } ${clickable ? "cursor-pointer hover:text-brand-primary" : ""}`}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-primary transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}
