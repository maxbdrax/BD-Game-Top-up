import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DiamondPackage, TopUpOrder, DepositRequest, MarketplaceListing, SupportTicket, SiteSettings } from '../types';
import { INITIAL_PACKAGES, INITIAL_SETTINGS } from '../data/mockData';
import { db } from '../lib/firebase';
import { collection, doc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  packages: DiamondPackage[];
  orders: TopUpOrder[];
  deposits: DepositRequest[];
  listings: MarketplaceListing[];
  tickets: SupportTicket[];
  settings: SiteSettings;
  language: 'bn' | 'en';
  activeTab: string;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  aiModalOpen: boolean;
  isAdminUnlocked: boolean;
  setAdminUnlocked: (unlocked: boolean) => void;
  setLanguage: (lang: 'bn' | 'en') => void;
  setActiveTab: (tab: string) => void;
  setAuthModalOpen: (open: boolean, mode?: 'login' | 'register' | 'forgot') => void;
  setAiModalOpen: (open: boolean) => void;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, phone: string, pass: string) => boolean;
  logout: () => void;
  createOrder: (packageId: string, playerUid: string, playerName: string, paymentMethod: 'Wallet' | 'bKash' | 'Nagad' | 'Rocket', transactionId?: string) => { success: boolean; message: string; order?: TopUpOrder };
  createDeposit: (amount: number, paymentMethod: 'bKash' | 'Nagad' | 'Rocket', senderNumber: string, transactionId: string) => void;
  createListing: (listing: Omit<MarketplaceListing, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => void;
  createTicket: (subject: string, category: any, priority: any, message: string) => void;
  replyTicket: (ticketId: string, message: string) => void;
  // Admin actions
  updateOrderStatus: (orderId: string, status: any, adminNotes?: string) => Promise<void>;
  updateDepositStatus: (depositId: string, status: 'Approved' | 'Rejected', adminNote?: string) => Promise<void>;
  updateListingStatus: (listingId: string, status: 'Active' | 'Rejected') => Promise<void>;
  savePackage: (pkg: DiamondPackage) => Promise<void>;
  deletePackage: (pkgId: string) => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bd_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [packages, setPackages] = useState<DiamondPackage[]>(INITIAL_PACKAGES);
  const [orders, setOrders] = useState<TopUpOrder[]>([]);
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [isAdminUnlocked, setAdminUnlocked] = useState<boolean>(false);

  // Sync current user to localStorage
  useEffect(() => {
    if (currentUser) localStorage.setItem('bd_current_user', JSON.stringify(currentUser));
    else localStorage.removeItem('bd_current_user');
  }, [currentUser]);

  // Real-time Firestore sync
  useEffect(() => {
    try {
      const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
        const list: User[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as User));
        if (list.length > 0) setUsers(list);
      });

      const unsubPkgs = onSnapshot(collection(db, 'packages'), (snap) => {
        const list: DiamondPackage[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as DiamondPackage));
        if (list.length > 0) setPackages(list);
        else {
          // Initialize packages if empty
          INITIAL_PACKAGES.forEach(async (p) => {
            await setDoc(doc(db, 'packages', p.id), p);
          });
        }
      });

      const unsubOrders = onSnapshot(collection(db, 'orders'), (snap) => {
        const list: TopUpOrder[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as TopUpOrder));
        setOrders(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      });

      const unsubDeposits = onSnapshot(collection(db, 'deposits'), (snap) => {
        const list: DepositRequest[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as DepositRequest));
        setDeposits(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      });

      const unsubListings = onSnapshot(collection(db, 'listings'), (snap) => {
        const list: MarketplaceListing[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as MarketplaceListing));
        setListings(list);
      });

      const unsubTickets = onSnapshot(collection(db, 'tickets'), (snap) => {
        const list: SupportTicket[] = [];
        snap.forEach(d => list.push({ id: d.id, ...d.data() } as SupportTicket));
        setTickets(list);
      });

      const unsubSettings = onSnapshot(doc(db, 'settings', 'config'), (snap) => {
        if (snap.exists()) {
          setSettings(snap.data() as SiteSettings);
        } else {
          setDoc(doc(db, 'settings', 'config'), INITIAL_SETTINGS);
        }
      });

      return () => {
        unsubUsers();
        unsubPkgs();
        unsubOrders();
        unsubDeposits();
        unsubListings();
        unsubTickets();
        unsubSettings();
      };
    } catch (e) {
      console.error('Firestore connection error, using local state:', e);
    }
  }, []);

  const setAuthModalOpen = (open: boolean, mode: 'login' | 'register' | 'forgot' = 'login') => {
    setIsAuthModalOpen(open);
    setAuthModalMode(mode);
  };

  const login = (identifier: string) => {
    const found = users.find(u => u.email.toLowerCase() === identifier.toLowerCase() || u.phone === identifier);
    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      return true;
    }
    // Check if admin secret login
    if (identifier === 'admin@bdgaming.com' || identifier === '01900000000') {
      const adminUsr: User = {
        id: 'usr-admin',
        name: 'BD TopUp Admin',
        email: 'admin@bdgaming.com',
        phone: '01900000000',
        role: 'admin',
        walletBalance: 100000,
        createdAt: new Date().toISOString(),
        isVerified: true,
      };
      setCurrentUser(adminUsr);
      setIsAuthModalOpen(false);
      return true;
    }

    // Register new user automatically
    const newUsr: User = {
      id: `usr-${Date.now()}`,
      name: identifier.split('@')[0],
      email: identifier.includes('@') ? identifier : `${identifier}@bdgaming.com`,
      phone: identifier,
      role: 'customer',
      walletBalance: 0,
      createdAt: new Date().toISOString(),
      isVerified: true,
    };
    setDoc(doc(db, 'users', newUsr.id), newUsr);
    setCurrentUser(newUsr);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUsr: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      walletBalance: 0,
      createdAt: new Date().toISOString(),
      isVerified: true,
    };
    setDoc(doc(db, 'users', newUsr.id), newUsr);
    setCurrentUser(newUsr);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminUnlocked(false);
  };

  const createOrder = async (packageId: string, playerUid: string, playerName: string, paymentMethod: 'Wallet' | 'bKash' | 'Nagad' | 'Rocket', transactionId?: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true, 'login');
      return { success: false, message: 'Please login to place an order.' };
    }

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return { success: false, message: 'Package not found.' };

    if (paymentMethod === 'Wallet') {
      if (currentUser.walletBalance < pkg.price) {
        return { success: false, message: `Insufficient wallet balance. You need ৳${pkg.price}, but have ৳${currentUser.walletBalance}.` };
      }
      const newBalance = currentUser.walletBalance - pkg.price;
      const updatedUser = { ...currentUser, walletBalance: newBalance };
      setCurrentUser(updatedUser);
      await updateDoc(doc(db, 'users', currentUser.id), { walletBalance: newBalance });
    }

    const newOrder: TopUpOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `BDTP-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      packageId: pkg.id,
      packageName: pkg.name,
      diamonds: pkg.diamonds + pkg.bonusDiamonds,
      price: pkg.price,
      playerUid,
      playerName,
      paymentMethod,
      transactionId,
      status: paymentMethod === 'Wallet' ? 'Processing' : 'Payment Verification',
      createdAt: new Date().toISOString(),
      adminNotes: paymentMethod === 'Wallet' ? 'Paid via internal wallet. Automatic delivery queue.' : `Awaiting manual verification for ${paymentMethod} TrxID: ${transactionId}`,
    };

    await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    return { success: true, message: 'Order created successfully!', order: newOrder };
  };

  const createDeposit = async (amount: number, paymentMethod: 'bKash' | 'Nagad' | 'Rocket', senderNumber: string, transactionId: string) => {
    if (!currentUser) return;
    const newDep: DepositRequest = {
      id: `dep-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      amount,
      paymentMethod,
      senderNumber,
      transactionId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'deposits', newDep.id), newDep);
  };

  const createListing = async (listingData: Omit<MarketplaceListing, 'id' | 'referenceNo' | 'createdAt' | 'status'>) => {
    if (!currentUser) return;
    const newListing: MarketplaceListing = {
      ...listingData,
      id: `lst-${Date.now()}`,
      referenceNo: `FFID-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending Approval',
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'listings', newListing.id), newListing);
  };

  const createTicket = async (subject: string, category: any, priority: any, message: string) => {
    if (!currentUser) return;
    const newTic: SupportTicket = {
      id: `tic-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      subject,
      category,
      priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          senderName: currentUser.name,
          message,
          createdAt: new Date().toISOString(),
        }
      ],
    };
    await setDoc(doc(db, 'tickets', newTic.id), newTic);
  };

  const replyTicket = async (ticketId: string, message: string) => {
    if (!currentUser) return;
    const tic = tickets.find(t => t.id === ticketId);
    if (!tic) return;

    const updatedMessages = [
      ...tic.messages,
      {
        id: `msg-${Date.now()}`,
        sender: currentUser.role === 'admin' ? ('admin' as const) : ('user' as const),
        senderName: currentUser.name,
        message,
        createdAt: new Date().toISOString(),
      }
    ];

    await updateDoc(doc(db, 'tickets', ticketId), { messages: updatedMessages });
  };

  // Admin actions
  const updateOrderStatus = async (orderId: string, status: any, adminNotes?: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status, adminNotes: adminNotes || '' });
  };

  const updateDepositStatus = async (depositId: string, status: 'Approved' | 'Rejected', adminNote?: string) => {
    const dep = deposits.find(d => d.id === depositId);
    if (!dep || dep.status !== 'Pending') return;

    await updateDoc(doc(db, 'deposits', depositId), { status, adminNote: adminNote || '' });

    if (status === 'Approved') {
      const targetUser = users.find(u => u.id === dep.userId);
      if (targetUser) {
        const newBalance = targetUser.walletBalance + dep.amount;
        await updateDoc(doc(db, 'users', targetUser.id), { walletBalance: newBalance });
      }
    }
  };

  const updateListingStatus = async (listingId: string, status: 'Active' | 'Rejected') => {
    await updateDoc(doc(db, 'listings', listingId), { status });
  };

  const savePackage = async (pkg: DiamondPackage) => {
    await setDoc(doc(db, 'packages', pkg.id), pkg);
  };

  const deletePackage = async (pkgId: string) => {
    await deleteDoc(doc(db, 'packages', pkgId));
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await setDoc(doc(db, 'settings', 'config'), updated);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        packages,
        orders,
        deposits,
        listings,
        tickets,
        settings,
        language,
        activeTab,
        isAuthModalOpen,
        authModalMode,
        aiModalOpen,
        isAdminUnlocked,
        setAdminUnlocked,
        setLanguage,
        setActiveTab,
        setAuthModalOpen,
        setAiModalOpen,
        login,
        register,
        logout,
        createOrder,
        createDeposit,
        createListing,
        createTicket,
        replyTicket,
        updateOrderStatus,
        updateDepositStatus,
        updateListingStatus,
        savePackage,
        deletePackage,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
