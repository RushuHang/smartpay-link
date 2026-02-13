"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountSchema, BankAccountFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../../components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

const MAJOR_BANKS = ["Chase Bank", "Bank of America", "Wells Fargo", "Citibank", "Goldman Sachs", "JPMorgan Chase", "Other"];

export function Step6BankAccount() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  const [bankStatementFile, setBankStatementFile] = useState<string>("");

  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountHolderName: (formData.accountHolderName as string) || "",
      bankName: (formData.bankName as string) || "",
      accountNumber: (formData.accountNumber as string) || "",
      swiftRoutingCode: (formData.swiftRoutingCode as string) || "",
    },
  });

  const onSubmit = (data: BankAccountFormData) => {
    const submitData = {
      ...data,
      bankStatement: bankStatementFile,
    };
    updateFormData(6, submitData);
    nextStep();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBankStatementFile(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Settlement Bank Account</h2>
        <p className="text-muted-foreground">Where should we send your settlement funds?</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account holder name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Bank Name</FormLabel>
                <FormControl>
                  <select {...field} className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">Select a bank</option>
                    {MAJOR_BANKS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Account Number / IBAN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number or IBAN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="swiftRoutingCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">SWIFT / Routing Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter SWIFT or routing code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-foreground block mb-2">Bank Statement or Cancelled Cheque</FormLabel>
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary rounded-lg cursor-pointer  transition">
              <div className="flex flex-col items-center">
                <Upload className="w-6 h-6 text-brand-primary mb-2" />
                <span className="text-sm font-medium text-foreground">
                  {bankStatementFile ? "File uploaded ✓" : "Click to upload or drag and drop"}
                </span>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.png" />
            </label>
          </div>

          {form.formState.errors.bankStatement && <p className="text-red-500 text-sm">{form.formState.errors.bankStatement.message}</p>}
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={previousStep}>
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </Form>
    </form>
  );
}
