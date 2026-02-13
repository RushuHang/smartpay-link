"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

const FormLabel = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, FormLabelProps>(({ className, ...props }, ref) => {
  return <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium text-brand-navy", className)} {...props} />;
});

FormLabel.displayName = "FormLabel";

export { FormLabel };
