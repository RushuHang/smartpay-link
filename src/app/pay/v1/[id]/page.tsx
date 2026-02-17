import React from "react";
import PaymentContainer from "./components/PaymentContainer";
import { PaymentData } from "./types";

// --- Mock Data (Simulating Server-Side Fetch) ---
const MOCK_PAYMENT: PaymentData = {
  amount: "4,500.00",
  currency: "NPR",
  subtotal: "4,000.00",
  vat: "520.00",
  serviceCharge: "-20.00",
  merchantName: "Apex Tech Solutions Pvt. Ltd.",
  merchantLocation: "Lalitpur-3, Bagmati, Nepal",
  merchantPan: "601234567",
  merchantEmail: "billing@apextech.com.np",
  merchantPhone: "+977-9800000000",
  customerName: "Aarav Sharma",
  customerEmail: "aarav.sharma@example.com",
  invoiceNumber: "INV-2026-8892",
  description: "Web Hosting & Maintenance (Annual)",
  expiryMinutes: 15,
};

export default function SmartLinkPaymentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light font-sans text-slate-900 selection:bg-blue-200">
      <PaymentContainer paymentData={MOCK_PAYMENT} />
    </div>
  );
}