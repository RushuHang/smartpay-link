export interface PlatformSettings {
  platformFeePercentage: number;
  currency: string;
  enableRefunds: boolean;
  enableSmsNotifications: boolean;
  supportEmail: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Support";
  lastLogin: string;
}

export const mockSettings: PlatformSettings = {
  platformFeePercentage: 2.5, // E.g., 2.5% per transaction
  currency: "NPR",
  enableRefunds: true,
  enableSmsNotifications: false,
  supportEmail: "support@smartlink.com.np",
};

export const adminUsers: AdminAccount[] = [
  { id: "ADM-01", name: "Lead Engineer", email: "admin@smartlink.com", role: "Super Admin", lastLogin: "2026-02-20 10:00" },
  { id: "ADM-02", name: "Support Staff", email: "support@smartlink.com", role: "Support", lastLogin: "2026-02-19 15:30" },
];