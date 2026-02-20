export type MerchantStatus = "Active" | "Suspended" | "Pending";

export interface Merchant {
  id: string;
  name: string;
  companyName: string;
  email: string;
  contactNumber: string;
  status: MerchantStatus;
  totalLinksCreated: number;
  totalRevenue: number; // Stored as number for calculations
  registrationDate: string;
}

export const merchantData: Merchant[] = [
  {
    id: "M-1001",
    name: "John Doe",
    companyName: "Bikers Point",
    email: "john@bikerspoint.com.np",
    contactNumber: "+977 9801234567",
    status: "Active",
    totalLinksCreated: 42,
    totalRevenue: 120500,
    registrationDate: "2024-01-15",
  },
  {
    id: "M-1002",
    name: "Sita Sharma",
    companyName: "Tech Solutions",
    email: "sita@techsolutions.com",
    contactNumber: "+977 9841122334",
    status: "Pending",
    totalLinksCreated: 0,
    totalRevenue: 0,
    registrationDate: "2024-02-10",
  },
  {
    id: "M-1003",
    name: "Aman Gupta",
    companyName: "Smart Grocery",
    email: "info@smartgrocery.com",
    contactNumber: "+977 9812345678",
    status: "Suspended",
    totalLinksCreated: 15,
    totalRevenue: 45200,
    registrationDate: "2023-11-20",
  },
  {
    id: "M-1004",
    name: "Ramesh KC",
    companyName: "Vintage Cafe",
    email: "hello@vintagecafe.com",
    contactNumber: "+977 9851098765",
    status: "Active",
    totalLinksCreated: 8,
    totalRevenue: 12400,
    registrationDate: "2024-01-25",
  }
];