import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Wallet, Globe, User as UserIcon, LogOut, Settings, MessageSquare, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, language, setLanguage, setActiveTab, activeTab, setAuthModalOpen, logout, setAiModalOpen } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-emerald-100">
      {/* Top Bar */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>{language === 'bn' ? '২৪ ঘণ্টা সার্ভিস খোলা আছে • ইনস্ট্যান্ট অটো টপ-আপ' : '24/7 Active Service • Instant Auto Top-Up'}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-1 bg-emerald-800 px-2 py-0.5 rounded text-emerald-100 hover:bg-emerald-900 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-green-300" />
              <span>AI Support & Appraiser</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1 hover:text-emerald-200 transition font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-emerald-900 leading-tight">
              BD <span className="text-emerald-600">Gaming</span> TopUp
            </h1>
            <p className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase">
              {language === 'bn' ? 'বিশ্বস্ত গেম শপ' : 'Trusted Game Store'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'হোম' : 'Home'}
          </button>
          <button
            onClick={() => setActiveTab('topup')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'topup' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'ডায়মন্ড টপ-আপ' : 'Diamond Top-Up'}
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'marketplace' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'আইডি মার্কেটপ্লেস' : 'ID Marketplace'}
          </button>
          <button
            onClick={() => setActiveTab('add-money')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'add-money' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'টাকা অ্যাড করুন' : 'Add Money'}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${activeTab === 'orders' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'আমার অর্ডার' : 'My Orders'}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-2 rounded-lg font-bold text-sm bg-amber-500 text-white hover:bg-amber-600 transition flex items-center gap-1 shadow-sm`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>
        </nav>

        {/* User / Wallet Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-emerald-100 transition"
              >
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800">৳{currentUser.walletBalance}</span>
              </div>

              <div 
                onClick={() => setActiveTab('dashboard')}
                className="hidden sm:flex items-center gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800">{currentUser.name}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold uppercase">{currentUser.role}</span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthModalOpen(true, 'login')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-sm shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
