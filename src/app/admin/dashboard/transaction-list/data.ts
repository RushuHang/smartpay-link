export type TransactionStatus = "Paid" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  linkTitle: string;
  merchantName: string;
  merchantId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  paymentMethod: "Fonepay" | "eSewa" | "Khalti" | "connectIPS" | "Card";
  gatewayReference: string; // The ID from the bank/gateway
}

export const transactionData: Transaction[] = [
  {
    id: "TXN-9901",
    linkTitle: "Bike Servicing - Full",
    merchantName: "Bikers Point",
    merchantId: "M-1001",
    amount: 4500,
    status: "Paid",
    createdAt: "2026-02-20 14:30:05",
    paymentMethod: "Fonepay",
    gatewayReference: "FP-882190",
  },
  {
    id: "TXN-9902",
    linkTitle: "Laptop Repair",
    merchantName: "Tech Solutions",
    merchantId: "M-1002",
    amount: 12000,
    status: "Failed",
    createdAt: "2026-02-20 15:12:40",
    paymentMethod: "connectIPS",
    gatewayReference: "CIPS-00912",
  },
  {
    id: "TXN-9903",
    linkTitle: "Custom Coffee Mug",
    merchantName: "Smart Grocery",
    merchantId: "M-1003",
    amount: 850,
    status: "Pending",
    createdAt: "2026-02-21 09:00:15",
    paymentMethod: "eSewa",
    gatewayReference: "ESEWA-7712",
  },
];