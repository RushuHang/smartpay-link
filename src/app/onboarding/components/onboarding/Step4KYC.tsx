"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, KYCFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../../components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

export function Step4KYC() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  const [certFile, setCertFile] = useState<string>("");
  const [licenseFile, setLicenseFile] = useState<string>("");

  const form = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      businessRegistrationNumber: (formData.businessRegistrationNumber as string) || "",
      taxIdentificationNumber: (formData.taxIdentificationNumber as string) || "",
    },
  });

  const onSubmit = (data: KYCFormData) => {
    const submitData = {
      ...data,
      incorporationCertificate: certFile,
      businessLicense: licenseFile,
    };
    updateFormData(4, submitData);
    nextStep();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "cert" | "license") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (fileType === "cert") {
          setCertFile(result);
        } else {
          setLicenseFile(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">KYC / Business Verification</h2>
        <p className="text-muted-foreground">Verify your business with official documents.</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="businessRegistrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Business Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business registration number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxIdentificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Tax Identification Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tax ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-foreground block mb-2">Certificate of Incorporation *</FormLabel>
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-primary rounded-lg cursor-pointer  transition">
              <div className="flex flex-col items-center">
                <Upload className="w-6 h-6 text-brand-primary mb-2" />
                <span className="text-sm font-medium text-foreground">{certFile ? "File uploaded ✓" : "Click to upload or drag and drop"}</span>
              </div>
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "cert")} accept=".pdf,.doc,.docx,.jpg,.png" />
            </label>
          </div>

          <div>
            <FormLabel className="text-foreground block mb-2">Business License (Optional)</FormLabel>
            <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-muted rounded-lg cursor-pointer  transition">
              <div className="flex flex-col items-center">
                <Upload className="w-6 h-6 text-brand-primary mb-2" />
                <span className="text-sm font-medium text-foreground">{licenseFile ? "File uploaded ✓" : "Click to upload or drag and drop"}</span>
              </div>
              <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "license")} accept=".pdf,.doc,.docx,.jpg,.png" />
            </label>
          </div>

          {form.formState.errors.incorporationCertificate && (
            <p className="text-red-500 text-sm">{form.formState.errors.incorporationCertificate.message}</p>
          )}
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
