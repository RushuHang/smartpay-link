import React, { forwardRef } from 'react';
import { cn } from '@/src/lib/utils'; // ✅ only import
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, endIcon, className, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <label htmlFor={id} className="text-sm font-medium text-brand-navy">
          {label}
        </label>
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "flex h-11 w-full rounded-lg border border-slate-200 text-black bg-white  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              icon ? "pl-10" : "",
              endIcon ? "pr-10" : "",
              error ? "border-red-500 focus-visible:ring-red-500" : "",
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-x-1 text-red-500 text-xs animate-in slide-in-from-top-1">
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
