import React, { useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newCode = [...code];
    // Handle paste or single digit
    if (val.length > 1) {
      const pasteData = val.split('').slice(0, length - idx);
      pasteData.forEach((char, i) => {
        if (idx + i < length) newCode[idx + i] = char;
      });
      setCode(newCode);
      const nextIdx = Math.min(idx + pasteData.length, length - 1);
      inputs.current[nextIdx]?.focus();
    } else {
      newCode[idx] = val;
      setCode(newCode);
      if (val && idx < length - 1) inputs.current[idx + 1]?.focus();
    }
    
    if (newCode.every(c => c !== '')) onComplete(newCode.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {code.map((char, idx) => (
        <input
          key={idx}
          ref={(el) => inputs.current[idx] = el}
          type="text"
          maxLength={6}
          value={char}
          onChange={(e) => processInput(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={cn(
            "w-10 h-12 lg:w-12 lg:h-14 text-center text-xl font-bold rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all",
            char ? "border-brand-primary ring-brand-primary/20" : "border-slate-200 focus:ring-brand-primary focus:border-brand-primary"
          )}
        />
      ))}
    </div>
  );
};