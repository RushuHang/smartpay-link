"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const COUNTRIES = [{ value: "nepal", label: "Nepal" }];

export function Step2Address() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      registeredAddress: (formData.registeredAddress as string) || "",
      operatingAddress: (formData.operatingAddress as string) || "",
      sameAsRegistered: (formData.sameAsRegistered as boolean) || false,
      country: (formData.country as string) || "",
      state: (formData.state as string) || "",
      city: (formData.city as string) || "",
      postalCode: (formData.postalCode as string) || "",
      websiteUrl: (formData.websiteUrl as string) || "",
      productServiceDescription: (formData.productServiceDescription as string) || "",
    },
  });

  const sameAsRegistered = form.watch("sameAsRegistered");

  const onSubmit = (data: AddressFormData) => {
    updateFormData(2, data);
    nextStep();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Business Address & Online Presence</h2>
        <p className="text-muted-foreground">Tell us where your business operates and how to find you online.</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="registeredAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Registered Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter registered address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sameAsRegistered"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="!mt-0 text-foreground">Operating address is the same as registered</FormLabel>
              </FormItem>
            )}
          />

          {!sameAsRegistered && (
            <FormField
              control={form.control}
              name="operatingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Operating Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter operating address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Country</FormLabel>
                <FormControl>
                  {/* <select {...field} className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                    <option value="">Select country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select> */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRIES.map((COUNTRIES) => (
                        <SelectItem key={COUNTRIES.value} value={COUNTRIES.value}>
                          {COUNTRIES.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Website URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productServiceDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Product/Service Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your products or services" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={previousStep}>
            Previous
          </Button>
          <Button type="submit">
            Next
          </Button>
        </div>
      </Form>
    </form>
  );
}
