export type LogActionType = "Admin Action" | "Merchant Action" | "Transaction";

export interface SystemLog {
  id: string;
  actionType: LogActionType;
  event: string; // e.g., "Updated Platform Fee", "Created Payment Link"
  performedBy: string; // Name or ID of the user
  performedByRole: "Admin" | "Merchant" | "System";
  timestamp: string;
  targetId?: string; // ID of the link, merchant, or transaction affected
  details: string; // Description of the change
}

export const logData: SystemLog[] = [
  {
    id: "LOG-001",
    actionType: "Admin Action",
    event: "Platform Fee Updated",
    performedBy: "Lead Engineer",
    performedByRole: "Admin",
    timestamp: "2026-02-20 17:45:12",
    details: "Changed fee from 2.5% to 3.0%",
  },
  {
    id: "LOG-002",
    actionType: "Transaction",
    event: "Payment Received",
    performedBy: "System",
    performedByRole: "System",
    timestamp: "2026-02-20 17:30:05",
    targetId: "TXN-9901",
    details: "NPR 4,500 processed via Fonepay for Bikers Point",
  },
  {
    id: "LOG-003",
    actionType: "Merchant Action",
    event: "Link Created",
    performedBy: "Bikers Point",
    performedByRole: "Merchant",
    timestamp: "2026-02-20 16:15:00",
    targetId: "LNK-5501",
    details: "Created link: 'Annual Membership'",
  },
];