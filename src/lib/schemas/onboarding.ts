import { z } from "zod";

export const businessInfoSchema = z.object({
  legalBusinessName: z.string().min(2, "Legal business name is required"),
  dbaName: z.string().min(2, "DBA/Trade name is required"),
  businessType: z.enum(["individual", "sole_proprietor", "partnership", "private_limited", "corporation", "non_profit"]),
  industryCategory: z.string().min(1, "Industry category is required"),
  businessDescription: z.string().min(10, "Business description must be at least 10 characters"),
});

export const addressSchema = z.object({
  registeredAddress: z.string().min(5, "Registered address is required"),
  operatingAddress: z.string().min(5, "Operating address is required"),
  sameAsRegistered: z.boolean().default(false), // remove the `?`
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  productServiceDescription: z.string().min(10, "Product/service description must be at least 10 characters"),
});

export const transactionSchema = z.object({
  monthlyTransactionVolume: z.coerce.number().min(1, "Monthly transaction volume is required"),
  averageTransactionValue: z.coerce.number().min(1, "Average transaction value is required"),
  maximumTransactionValue: z.coerce.number().min(1, "Maximum transaction value is required"),
  paymentMethods: z.array(z.enum(["cards", "bank_transfer", "wallets", "bnpl"])).min(1, "Select at least one payment method"),
  settlementPreference: z.enum(["daily", "weekly", "monthly"]),
});

export const kycSchema = z.object({
  businessRegistrationNumber: z.string().min(1, "Business registration number is required"),
  taxIdentificationNumber: z.string().min(1, "Tax identification number is required"),
  incorporationCertificate: z.any(),
  businessLicense: z.any().optional(),
});

export const ownerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  ownershipPercentage: z.coerce.number().min(1).max(100, "Ownership percentage must be between 1 and 100"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  governmentIdNumber: z.string().min(1, "Government ID number is required"),
  governmentIdDocument: z.any(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number must be at least 8 digits"),
});

export const ownersSchema = z.object({
  owners: z.array(ownerSchema).min(1, "At least one owner is required"),
});

export const bankAccountSchema = z.object({
  accountHolderName: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number/IBAN is required"),
  swiftRoutingCode: z.string().min(1, "SWIFT/Routing code is required"),
  bankStatement: z.any(),
});

export const agreementsSchema = z.object({
  merchantAgreement: z.boolean().refine((v) => v === true, "You must accept the Merchant Agreement"),
  privacyPolicy: z.boolean().refine((v) => v === true, "You must accept the Privacy Policy"),
  informationAccuracy: z.boolean().refine((v) => v === true, "You must confirm information accuracy"),
});

export const completeFormSchema = z.object({
  ...businessInfoSchema.shape,
  ...addressSchema.shape,
  ...transactionSchema.shape,
  ...kycSchema.shape,
  ...ownersSchema.shape,
  ...bankAccountSchema.shape,
  ...agreementsSchema.shape,
});

export type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
export type KYCFormData = z.infer<typeof kycSchema>;
export type OwnerFormData = z.infer<typeof ownerSchema>;
export type OwnersFormData = z.infer<typeof ownersSchema>;
export type BankAccountFormData = z.infer<typeof bankAccountSchema>;
export type AgreementsFormData = z.infer<typeof agreementsSchema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;
