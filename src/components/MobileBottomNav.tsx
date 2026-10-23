import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, PlusCircle, ShoppingBag, ClipboardList, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();

  const navItems = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'add-money', labelBn: 'অ্যাড মানি', labelEn: 'Add Money', icon: PlusCircle },
    { id: 'marketplace', labelBn: 'মার্কেটপ্লেস', labelEn: 'Marketplace', icon: ShoppingBag },
    { id: 'orders', labelBn: 'অর্ডারস', labelEn: 'My Orders', icon: ClipboardList },
    { id: 'dashboard', labelBn: 'অ্যাকাউন্ট', labelEn: 'Account', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg px-2 py-1">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1.5 px-2 rounded-xl transition ${
                isActive ? 'text-emerald-600 font-bold' : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-emerald-600' : ''}`} />
              <span className="text-[10px] mt-0.5">{language === 'bn' ? item.labelBn : item.labelEn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
