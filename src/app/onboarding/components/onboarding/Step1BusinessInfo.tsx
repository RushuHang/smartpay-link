"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessInfoSchema, BusinessInfoFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const BUSINESS_TYPES = [
  { value: "individual", label: "Individual" },
  { value: "sole_proprietor", label: "Sole Proprietor" },
  { value: "partnership", label: "Partnership" },
  { value: "private_limited", label: "Private Limited Company" },
  { value: "corporation", label: "Corporation" },
  { value: "non_profit", label: "Non-Profit" },
];

const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "services", label: "Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export function Step1BusinessInfo() {
  const { formData, updateFormData, nextStep } = useOnboarding();

  const form = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      legalBusinessName: (formData.legalBusinessName as string) || "",
      dbaName: (formData.dbaName as string) || "",
      businessType: (formData.businessType as any) || "individual",
      industryCategory: (formData.industryCategory as string) || "",
      businessDescription: (formData.businessDescription as string) || "",
    },
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    updateFormData(1, data);
    nextStep();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Basic Business Information</h2>
        <p className="text-muted-foreground">Let&apos;s start with the essentials about your business.</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="legalBusinessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Legal Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter legal business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dbaName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">DBA / Trade Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter DBA or trade name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Business Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Industry Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Business Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your business in detail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit">Next</Button>
        </div>
      </Form>
    </form>
  );
}
