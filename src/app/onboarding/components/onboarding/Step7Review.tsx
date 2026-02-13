"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agreementsSchema, AgreementsFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function Step7Review() {
  const { formData, previousStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<AgreementsFormData>({
    resolver: zodResolver(agreementsSchema),
    defaultValues: {
      merchantAgreement: false,
      privacyPolicy: false,
      informationAccuracy: false,
    },
  });

  const onSubmit = async (data: AgreementsFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold  mb-2">Application Submitted!</h2>
        <p className=" mb-6 max-w-md">
          Thank you for completing your merchant onboarding. We've received your application and will review it within 2-3 business days.
        </p>
        <p className="text-sm ">You'll receive a confirmation email shortly with your application reference number.</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Review & Agreements</h2>
        <p>Please review the summary and accept the agreements below.</p>
      </div>

      {/* Summary Section */}
      <div className=" space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Business Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>Legal Name</p>
              <p className=" font-medium">{formData.legalBusinessName || "N/A"}</p>
            </div>
            <div>
              <p>Business Type</p>
              <p className=" font-medium">{formData.businessType || "N/A"}</p>
            </div>
            <div>
              <p>Industry</p>
              <p className=" font-medium">{formData.industryCategory || "N/A"}</p>
            </div>
            <div>
              <p>DBA Name</p>
              <p className=" font-medium">{formData.dbaName || "N/A"}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold  mb-3">Address Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>City</p>
              <p className=" font-medium">{formData.city || "N/A"}</p>
            </div>
            <div>
              <p>State</p>
              <p className=" font-medium">{formData.state || "N/A"}</p>
            </div>
            <div className="col-span-2">
              <p>Country</p>
              <p className=" font-medium">{formData.country || "N/A"}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold  mb-3">Transaction Profile</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>Monthly Volume</p>
              <p className=" font-medium">${formData.monthlyTransactionVolume || 0}</p>
            </div>
            <div>
              <p>Avg Transaction</p>
              <p className=" font-medium">${formData.averageTransactionValue || 0}</p>
            </div>
            <div className="col-span-2">
              <p>Settlement Preference</p>
              <p className=" font-medium capitalize">{formData.settlementPreference || "N/A"}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold  mb-3">Bank Account</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <p>Account Holder</p>
              <p className=" font-medium">{formData.accountHolderName || "N/A"}</p>
            </div>
            <div className="col-span-2">
              <p>Bank</p>
              <p className=" font-medium">{formData.bankName || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agreements Section */}
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="merchantAgreement"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                </FormControl>
                <div className="flex-1">
                  <FormLabel className=" cursor-pointer">I accept the Merchant Agreement</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                </FormControl>
                <div className="flex-1">
                  <FormLabel className=" cursor-pointer">I accept the Privacy Policy</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="informationAccuracy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                </FormControl>
                <div className="flex-1">
                  <FormLabel className=" cursor-pointer">I confirm that all the information provided is accurate and complete</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={previousStep} disabled={isSubmitting}>
            Previous
          </Button>
          <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </Form>
    </form>
  );
}
