export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  walletBalance: number;
  avatar?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface DiamondPackage {
  id: string;
  name: string;
  diamonds: number;
  bonusDiamonds: number;
  price: number; // in BDT
  category: 'uid' | 'weekly' | 'monthly' | 'levelup' | 'special';
  isHot?: boolean;
  image?: string;
  inStock: boolean;
  displayOrder: number;
}

export type OrderStatus = 'Pending Payment' | 'Payment Verification' | 'Processing' | 'Completed' | 'Failed' | 'Cancelled' | 'Refunded';

export interface TopUpOrder {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  packageId: string;
  packageName: string;
  diamonds: number;
  price: number;
  playerUid: string;
  playerName?: string;
  paymentMethod: 'Wallet' | 'bKash' | 'Nagad' | 'Rocket';
  transactionId?: string;
  status: OrderStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket';
  senderNumber: string;
  transactionId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  adminNote?: string;
}

export interface WalletLedgerEntry {
  id: string;
  userId: string;
  type: 'deposit' | 'purchase' | 'refund' | 'admin_adjustment';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reference: string;
  createdAt: string;
}

export interface MarketplaceListing {
  id: string;
  referenceNo: string;
  title: string;
  sellerId: string;
  sellerName: string;
  sellerVerified: boolean;
  level: number;
  rank: string; // e.g., "Heroic", "Grandmaster"
  season: string;
  price: number;
  description: string;
  images: string[];
  features: string[]; // e.g. ["EVO MP40 Max", "Criminal Bundle", "Hip Hop Bundle"]
  status: 'Pending Approval' | 'Active' | 'Sold' | 'Rejected';
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'Top-Up Issue' | 'Payment/Deposit' | 'ID Marketplace' | 'Account' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  messages: {
    id: string;
    sender: 'user' | 'admin';
    senderName: string;
    message: string;
    createdAt: string;
  }[];
}

export interface SiteSettings {
  siteName: string;
  noticeBanner: string;
  bKashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  telegramLink: string;
  whatsappNumber: string;
  isMaintenanceMode: boolean;
}
