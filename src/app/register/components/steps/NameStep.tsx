"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, ShieldCheck } from "lucide-react";
import { Input } from "@/components /ui/Input";
import { Button } from "@/components /ui/Button";
import Link from "next/link";

type Props = { data: any; setData: (data: any) => void; onNext: () => void };

const schema = z.object({ fullName: z.string().min(2, "Full name is required") });

export default function NameStep({ data, setData, onNext }: Props) {
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
          Enter your full name
        </p>
      </div>

      <Input
        id="fullName"
        label="Full Name"
        placeholder="John Doe"
        icon={<User size={18} />}
        error={errors.fullName?.message as string}
        {...register("fullName")}
      />

      <Button type="submit" className="w-full">Next</Button>

      <div className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/" className="text-brand-primary font-semibold hover:underline">Log in</Link>
      </div>
    </form>
  );
}
