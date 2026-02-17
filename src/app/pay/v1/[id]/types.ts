export type PaymentMethod =
  | "smartqr"
  | "card"
  | "esewa"
  | "khalti"
  | "imepay"
  | "netbanking"
  | null;

export interface PaymentData {
  amount: string;
  currency: string;
  subtotal: string;
  vat: string;
  serviceCharge: string;
  merchantName: string;
  merchantLocation: string;
  merchantPan: string;
  merchantEmail: string;
  merchantPhone: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  description: string;
  expiryMinutes: number;
}