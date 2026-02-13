"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components /ui/Input";
import { Button } from "@/components /ui/Button";
import { Mail, ShieldCheck } from "lucide-react";

type Props = { data: any; setData: (data: any) => void; onNext: () => void };

const schema = z.object({ email: z.string().email("Invalid email") });

export default function EmailStep({ data, setData, onNext }: Props) {
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
          Enter your email
        </p>
      </div>
      <Input
        id="email"
        label="Email Address"
        placeholder="you@example.com"
        icon={<Mail size={18} />}
        error={errors.email?.message as string}
        {...register("email")}
      />
      <Button type="submit" className="w-full">Next</Button>
    </form>
  );
}
