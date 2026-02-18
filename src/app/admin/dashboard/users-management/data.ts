export type UserStatus = "Active" | "Suspended" | "Pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Merchant" | "User";
  status: UserStatus;
  transactions: number;
}

export const userData: User[] = [
  { id: "1", name: "Aarav Shrestha", email: "aarav@example.com", role: "Merchant", status: "Active", transactions: 24 },
  { id: "2", name: "Sita Gurung", email: "sita@example.com", role: "User", status: "Suspended", transactions: 5 },
  { id: "3", name: "Rohan Karki", email: "rohan@example.com", role: "Merchant", status: "Pending", transactions: 0 },
  { id: "4", name: "Maya Thapa", email: "maya@example.com", role: "User", status: "Active", transactions: 12 },
];