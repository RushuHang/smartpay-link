import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void; // ✅ optional now
  onChange?: (code: string) => void;   // optional, tracks every change
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, onChange }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Track every change
  useEffect(() => {
    const currentCode = code.join('');
    onChange?.(currentCode);             // fire onChange if provided
    if (currentCode.length === length && !code.includes('')) {
      onComplete?.(currentCode);         // call onComplete only if all digits filled
    }
  }, [code, length, onChange, onComplete]);

  const processInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (isNaN(Number(val)) && val !== '') return; // only numeric input

    const newCode = [...code];

    if (val.length > 1) {
      // Handle paste
      const pasteData = val.split('').slice(0, length - idx);
      pasteData.forEach((char, i) => {
        if (idx + i < length) newCode[idx + i] = char;
      });
      setCode(newCode);
      const nextIdx = Math.min(idx + pasteData.length, length - 1);
      inputs.current[nextIdx]?.focus();
    } else {
      // Single character
      newCode[idx] = val;
      setCode(newCode);
      if (val && idx < length - 1) inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (code[idx]) {
        const newCode = [...code];
        newCode[idx] = '';
        setCode(newCode);
      } else if (idx > 0) {
        inputs.current[idx - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {code.map((char, idx) => (
        <input
          key={idx}
          ref={(el) => { inputs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={char}
          onChange={(e) => processInput(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={cn(
            "w-10 h-12 lg:w-12 lg:h-14 text-center text-black text-xl font-bold rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all",
            char
              ? "border-brand-primary ring-brand-primary/20"
              : "border-slate-200 focus:ring-brand-primary focus:border-brand-primary"
          )}
        />
      ))}
    </div>
  );
};
