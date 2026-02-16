import { Payment } from "./types";

export const fakeData: Payment[] = [
  { id: "SL-7789-01", batchId: "B-001", contact: "Binod Tamang", email: "binod@example.com", status: "Active", date: "2026-02-10", amount: 2450.00, method: "Visa ••4242" },
  { id: "PAY-8833", batchId: "B-002", contact: "Jane Smith", email: "j.smith@design.studio", status: "Completed", date: "2026-02-09", amount: 450.50, method: "Mastercard ••8821" },
  { id: "PAY-8834", batchId: "B-003", contact: "Robert Johnson", email: "finance@global.co", status: "Failed", date: "2026-02-08", amount: 3100.00, method: "Bank Transfer" },
  { id: "PAY-8835", batchId: "B-004", contact: "Alice Brown", email: "alice@tech.start", status: "Completed", date: "2026-02-07", amount: 2150.00, method: "Visa ••1122" },
  { id: "PAY-8836", batchId: "B-005", contact: "Charlie Davis", email: "billing@web.net", status: "Pending", date: "2026-02-06", amount: 900.00, method: "Amex ••3001" },
  { id: "PAY-8837", batchId: "B-006", contact: "Sarah Miller", email: "s.miller@consulting.group", status: "Completed", date: "2026-02-05", amount: 5500.00, method: "Bank Transfer" },
  { id: "PAY-8838", batchId: "B-007", contact: "David Wilson", email: "david@logistics.io", status: "Completed", date: "2026-02-05", amount: 125.00, method: "Visa ••5599" },
];
