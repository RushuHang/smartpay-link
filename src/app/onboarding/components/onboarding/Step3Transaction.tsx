"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const PAYMENT_METHODS = [
  { value: "cards", label: "Credit/Debit Cards" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "wallets", label: "Digital Wallets" },
  { value: "bnpl", label: "BNPL (Buy Now, Pay Later)" },
];

export function Step3Transaction() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      monthlyTransactionVolume: (formData.monthlyTransactionVolume as number) || 0,
      averageTransactionValue: (formData.averageTransactionValue as number) || 0,
      maximumTransactionValue: (formData.maximumTransactionValue as number) || 0,
      paymentMethods: (formData.paymentMethods as any) || [],
      settlementPreference: (formData.settlementPreference as any) || "weekly",
    },
  });

  const paymentMethods = form.watch("paymentMethods");

  const onSubmit = (data: TransactionFormData) => {
    updateFormData(3, data);
    nextStep();
  };

  const togglePaymentMethod = (method: string) => {
    const current = form.getValues("paymentMethods") || [];
    if (current.includes(method as any)) {
      form.setValue("paymentMethods", current.filter((m) => m !== method) as any);
    } else {
      form.setValue("paymentMethods", [...current, method as any]);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Transaction & Payment Profile</h2>
        <p className="text-muted-foreground">Help us understand your payment processing needs.</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="monthlyTransactionVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Expected Monthly Transaction Volume</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="averageTransactionValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Average Transaction Value ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maximumTransactionValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Maximum Transaction Value ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="text-foreground block mb-3">Supported Payment Methods</FormLabel>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.value} className="flex items-center space-x-2">
                  <Checkbox
                    checked={paymentMethods?.includes(method.value as any) || false}
                    onCheckedChange={() => togglePaymentMethod(method.value)}
                  />
                  <label className="text-foreground cursor-pointer">{method.label}</label>
                </div>
              ))}
            </div>
            {form.formState.errors.paymentMethods && <p className="text-red-500 text-sm mt-2">{form.formState.errors.paymentMethods.message}</p>}
          </FormItem>

          <FormField
            control={form.control}
            name="settlementPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Settlement Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger >
                      <SelectValue placeholder="Select settlement preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={previousStep} className="border-border text-foreground hover:bg-muted">
            Previous
          </Button>
          <Button type="submit" className="bg-brand-primary hover:bg-brand-primary/90 text-brand-primary-foreground">
            Next
          </Button>
        </div>
      </Form>
    </form>
  );
}
