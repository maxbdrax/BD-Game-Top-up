/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Home } from './components/Home';
import { DiamondTopUp } from './components/DiamondTopUp';
import { Marketplace } from './components/Marketplace';
import { AddMoney } from './components/AddMoney';
import { MyOrders } from './components/MyOrders';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { AiChatModal } from './components/AiChatModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && <Home />}
        {activeTab === 'topup' && <DiamondTopUp />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'add-money' && <AddMoney />}
        {activeTab === 'orders' && <MyOrders />}
        {activeTab === 'dashboard' && <CustomerDashboard />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Footer />
      <MobileBottomNav />
      <AuthModal />
      <AiChatModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
