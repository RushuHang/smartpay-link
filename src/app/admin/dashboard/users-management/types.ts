export type Payment = {
  id: string;
  batchId: string;
  contact: string;
  email: string;
  status: "Pending" | "Completed" | "Failed"|"Active";
  date: string;
  amount: number;
  method: string;
};
