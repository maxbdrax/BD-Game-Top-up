import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Wallet, Globe, User as UserIcon, LogOut, Lock, MessageSquare, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, language, setLanguage, setActiveTab, activeTab, setAuthModalOpen, logout, setAiModalOpen } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-red-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            <span className="font-medium">{language === 'bn' ? '২৪ ঘণ্টা সার্ভিস খোলা আছে • ইনস্ট্যান্ট অটো টপ-আপ' : '24/7 Active Service • Instant Auto Top-Up'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiModalOpen(true)}
              className="flex items-center gap-1 bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-lg text-emerald-100 transition border border-white/10"
            >
              <MessageSquare className="w-3.5 h-3.5 text-red-300" />
              <span>AI Assistant</span>
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
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-gray-900 leading-tight">
              BD <span className="text-emerald-600">Gaming</span> <span className="text-red-600">TopUp</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              {language === 'bn' ? 'প্রফেশনাল গেম শপ' : 'Pro Game Store'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'হোম' : 'Home'}
          </button>
          <button
            onClick={() => setActiveTab('topup')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === 'topup' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'ডায়মন্ড টপ-আপ' : 'Diamond Top-Up'}
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === 'marketplace' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'আইডি মার্কেটপ্লেস' : 'ID Marketplace'}
          </button>
          <button
            onClick={() => setActiveTab('add-money')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === 'add-money' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'টাকা অ্যাড করুন' : 'Add Money'}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === 'orders' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'}`}
          >
            {language === 'bn' ? 'আমার অর্ডার' : 'My Orders'}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            title="Admin Login"
            className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-gray-100 transition"
          >
            <Lock className="w-4 h-4" />
          </button>
        </nav>

        {/* User / Wallet Actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-100 border border-emerald-200 px-3.5 py-1.5 rounded-2xl cursor-pointer hover:shadow-md transition"
              >
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-emerald-900">৳{currentUser.walletBalance}</span>
              </div>

              <div 
                onClick={() => setActiveTab('dashboard')}
                className="hidden sm:flex items-center gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-red-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">{currentUser.name}</p>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{currentUser.role}</span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Logout"
                className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-gray-100 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthModalOpen(true, 'login')}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black px-6 py-2.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
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
