"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownersSchema, OwnersFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../../components/ui/button";
import { Upload, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export function Step5Owners() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  const [ownerFiles, setOwnerFiles] = useState<Record<number, string>>({});

  const initialOwners = (formData.owners as any) || [
    { fullName: "", ownershipPercentage: 0, dateOfBirth: "", nationality: "", governmentIdNumber: "", email: "", phoneNumber: "" },
  ];

  const form = useForm<OwnersFormData>({
    resolver: zodResolver(ownersSchema),
    defaultValues: {
      owners: initialOwners,
    },
  });

  const owners = form.watch("owners");

  const onSubmit = (data: OwnersFormData) => {
    const submitData = {
      owners: data.owners.map((owner, idx) => ({
        ...owner,
        governmentIdDocument: ownerFiles[idx] || "",
      })),
    };
    updateFormData(5, submitData);
    nextStep();
  };

  const addOwner = () => {
    form.setValue("owners", [
      ...owners,
      {
        fullName: "",
        ownershipPercentage: 0,
        dateOfBirth: "",
        nationality: "",
        governmentIdNumber: "",
        email: "",
        phoneNumber: "",
        governmentIdDocument: "",
      },
    ]);
  };

  const removeOwner = (index: number) => {
    form.setValue(
      "owners",
      owners.filter((_, i) => i !== index),
    );
    const newFiles = { ...ownerFiles };
    delete newFiles[index];
    setOwnerFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setOwnerFiles((prev) => ({ ...prev, [index]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Ownership / Director Details</h2>
        <p className="text-muted-foreground">Add all business owners and directors.</p>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          {owners.map((owner, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">Owner {index + 1}</h3>
                {owners.length > 1 && (
                  <Button type="button" variant="ghost" onClick={() => removeOwner(index)} className="text-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`owners.${index}.fullName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.ownershipPercentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Ownership %</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.dateOfBirth`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.nationality`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter nationality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.governmentIdNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Government ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`owners.${index}.phoneNumber`}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-foreground">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormLabel className="text-foreground block mb-2">Government ID Document</FormLabel>
                <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-primary rounded-lg cursor-pointertransition">
                  <div className="flex flex-col items-center">
                    <Upload className="w-5 h-5 text-brand-primary mb-1" />
                    <span className="text-sm font-medium text-foreground">{ownerFiles[index] ? "File uploaded ✓" : "Click to upload"}</span>
                  </div>
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, index)} accept=".pdf,.doc,.docx,.jpg,.png" />
                </label>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addOwner}>
            <Plus className="w-4 h-4 mr-2" />
            Add Another Owner
          </Button>
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
