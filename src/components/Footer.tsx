import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MessageCircle, Phone, Mail, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, language, setActiveTab } = useApp();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pt-16 pb-24 md:pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight leading-tight">
                BD <span className="text-emerald-500">Gaming</span> <span className="text-red-500">TopUp</span>
              </h3>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">
                {language === 'bn' ? 'প্রফেশনাল গেম শপ' : 'Professional Game Store'}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            {language === 'bn' 
              ? 'বাংলাদেশের সবচেয়ে দ্রুততম ও বিশ্বস্ত ফ্রি ফায়ার ডায়মন্ড টপ-আপ এবং আইডি মার্কেটপ্লেস।' 
              : 'Bangladesh’s fastest and most trusted Free Fire Diamond Top-Up & ID Marketplace with 24/7 automated service.'}
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-black text-white text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveTab('topup')} className="hover:text-emerald-400 transition text-left">Free Fire UID Top-Up</button></li>
            <li><button onClick={() => setActiveTab('marketplace')} className="hover:text-emerald-400 transition text-left">ID Marketplace (The Vault)</button></li>
            <li><button onClick={() => setActiveTab('add-money')} className="hover:text-emerald-400 transition text-left">Add Money via bKash / Nagad</button></li>
            <li><button onClick={() => setActiveTab('orders')} className="hover:text-emerald-400 transition text-left">Order Tracking & History</button></li>
            <li>
              <button onClick={() => setActiveTab('admin')} className="text-gray-400 hover:text-emerald-400 transition flex items-center gap-1 mt-1 text-[11px]">
                <Lock className="w-3 h-3 text-red-500" /> Admin Access
              </button>
            </li>
          </ul>
        </div>

        {/* Payment & Security */}
        <div className="space-y-3">
          <h4 className="font-black text-white text-sm uppercase tracking-wider">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-pink-600/20 border border-pink-500/40 text-pink-400 font-bold px-3 py-1 rounded-lg text-xs">bKash</span>
            <span className="bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold px-3 py-1 rounded-lg text-xs">Nagad</span>
            <span className="bg-purple-600/20 border border-purple-500/40 text-purple-400 font-bold px-3 py-1 rounded-lg text-xs">Rocket</span>
            <span className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs">Website Wallet</span>
          </div>
          <p className="text-[11px] text-gray-400 pt-2">
            100% Secure & encrypted payment verification.
          </p>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h4 className="font-black text-white text-sm uppercase tracking-wider">Customer Support</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <a href={settings.telegramLink} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
                Telegram Support Channel
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>{settings.whatsappNumber}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>support@bdgaming.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 BD Gaming TopUp. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-400 transition">Terms & Conditions</a>
          <a href="#" className="hover:text-emerald-400 transition">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};
