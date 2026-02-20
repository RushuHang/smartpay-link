export type LinkStatus = "Active" | "Expired" | "Paid" | "Disabled";

export interface PaymentLink {
  id: string;
  linkName: string;
  description: string;
  merchantName: string;
  amount: number;
  expiryDate: string;
  status: LinkStatus;
  views: number;
  paymentsReceived: number;
}

export const paymentLinkData: PaymentLink[] = [
  {
    id: "LNK-5501",
    linkName: "Annual Membership",
    description: "Standard gym membership fee",
    merchantName: "Bikers Point",
    amount: 15000,
    expiryDate: "2026-12-31",
    status: "Active",
    views: 120,
    paymentsReceived: 45,
  },
  {
    id: "LNK-5502",
    linkName: "Limited Edition Helmet",
    description: "Pre-order for AGV K6",
    merchantName: "Bikers Point",
    amount: 65000,
    expiryDate: "2026-02-15",
    status: "Expired",
    views: 450,
    paymentsReceived: 12,
  },
  {
    id: "LNK-5503",
    linkName: "Consultation Fee",
    description: "One-hour tech advisory",
    merchantName: "Tech Solutions",
    amount: 5000,
    expiryDate: "2026-05-20",
    status: "Disabled",
    views: 15,
    paymentsReceived: 2,
  },
];