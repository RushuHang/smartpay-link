import * as React from "react";

import { cn } from "@/lib/utils";

const FormInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-lg border text-black px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-50 border-slate-200 focus:bg-white transition-all duration-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

FormInput.displayName = "FormInput";

export { FormInput };
