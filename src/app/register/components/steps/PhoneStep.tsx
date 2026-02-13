"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components /ui/Input";
import { Button } from "@/components /ui/Button";
import { Phone, ShieldCheck } from "lucide-react";

type Props = { data: any; setData: (data: any) => void; onNext: () => void };

// Zod validation: exactly 10 digits
const schema = z.object({
  phone: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit Nepal phone number")
});

export default function PhoneStep({ data, setData, onNext }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const phoneValue = watch("phone");

  const onSubmit = (form: any) => {
    setData({ ...data, ...form });
    onNext();
  };

  // Only allow numbers while typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, ""); // remove non-digits
    setValue("phone", digitsOnly.slice(0, 10)); // max 10 digits
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" /> Personal Info
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Enter your phone number
        </p>
      </div>

      <Input
        type="tel"
        id="phone"
        label="Phone Number"
        placeholder="9812345678"
        icon={<Phone size={18} />}
        error={errors.phone?.message as string}
        value={phoneValue}
        onChange={handleInputChange}
      />

      <Button type="submit" className="w-full">Next</Button>
    </form>
  );
}
