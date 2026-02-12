"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/src/components /ui/Input";
import { Button } from "@/src/components /ui/Button";
import { Lock, ShieldCheck } from "lucide-react";

type Props = { data: any; setData: (data: any) => void; onNext: () => void };

const schema = z.object({
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string().min(8, "Minimum 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export default function SecurityStep({ data, setData, onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const onSubmit = (form: any) => {
    setData({ ...data, ...form });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" /> Personal Info
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Enter your password
        </p>
      </div>
      <Input
        id="password"
        type="password"
        label="Password"
        icon={<Lock size={18} />}
        placeholder="Minimum 8 characters, uppercase, number, special char"
        error={errors.password?.message as string}
        {...register("password")}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        icon={<Lock size={18} />}
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message as string}
        {...register("confirmPassword")}
      />

      <Button type="submit" className="w-full">Next</Button>
    </form>
  );
}
