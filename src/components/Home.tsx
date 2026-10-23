import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Clock, Award, ChevronRight, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { settings, setActiveTab, language, setAiModalOpen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: language === 'bn' ? 'রাত দিন ২৪ ঘণ্টায় মাত্র ৫ সেকেন্ডে টপ-আপ!' : 'Instant 24/7 Diamond Top-Up in 5 Seconds!',
      subtitle: language === 'bn' ? 'বিকাশ, নগদ ও রকেট দিয়ে স্বয়ংক্রিয় টপ-আপ নিন।' : 'Automatic top-up with bKash, Nagad & Rocket.',
      bg: 'from-emerald-600 via-emerald-700 to-teal-950',
      badge: '🔥 Super Fast',
    },
    {
      title: language === 'bn' ? 'ফ্রি ফায়ার আইডি ক্রয়-বিক্রয় মার্কেটপ্লেস' : 'Free Fire ID Buy & Sell Marketplace',
      subtitle: language === 'bn' ? 'ভেরিফাইড সেলারদের কাছ থেকে সুরক্ষিতভাবে হিরোইক আইডি কিনুন।' : 'Buy secure Heroic & Grandmaster accounts from verified sellers.',
      bg: 'from-teal-700 via-emerald-800 to-green-950',
      badge: '💎 Verified Accounts',
    }
  ];

  return (
    <div className="pb-24 md:pb-12 space-y-6">
      {/* Notice Marquee / Banner */}
      <div className="bg-emerald-700 text-white px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0">
              {language === 'bn' ? 'নোটিশ' : 'NOTICE'}
            </span>
            <p className="text-xs md:text-sm font-medium text-emerald-100 truncate">
              {settings.noticeBanner}
            </p>
          </div>
          <a
            href={settings.telegramLink}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-lg transition shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Telegram</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Banner Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-emerald-600 to-teal-900 text-white p-6 md:p-10">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 bg-cover bg-center pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80")' }}></div>
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block bg-white/20 text-green-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              {banners[currentSlide].badge}
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              {banners[currentSlide].title}
            </h2>
            <p className="text-emerald-100 text-sm md:text-base">
              {banners[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setActiveTab('topup')}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
              >
                <span>{language === 'bn' ? 'এখনই টপ-আপ করুন' : 'Top-Up Now'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="bg-emerald-800/80 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-xl backdrop-blur-sm border border-emerald-500/30 transition text-sm"
              >
                {language === 'bn' ? 'আইডি মার্কেটপ্লেস' : 'Browse IDs'}
              </button>
            </div>
          </div>
          {/* Carousel dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{language === 'bn' ? 'ভেরিফাইড সেলার' : 'Verified Sellers'}</h4>
              <p className="text-[11px] text-gray-500">100% Safe Transfer</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{language === 'bn' ? 'ইনস্ট্যান্ট ডেলিভারি' : 'Instant Delivery'}</h4>
              <p className="text-[11px] text-gray-500">Auto 5 Sec Service</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{language === 'bn' ? '২৪ ঘণ্টা খোলা' : '24/7 Support'}</h4>
              <p className="text-[11px] text-gray-500">Live Telegram Help</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">{language === 'bn' ? 'সেরা দাম' : 'Best Prices'}</h4>
              <p className="text-[11px] text-gray-500">Lowest BDT Rates</p>
            </div>
          </div>
        </div>

        {/* Service Categories Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>{language === 'bn' ? 'ফ্রি ফায়ার ডায়মন্ড ও মেম্বারশিপ' : 'Free Fire Diamond & Membership'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* FF UID TopUp Card */}
            <div
              onClick={() => setActiveTab('topup')}
              className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-md hover:shadow-lg transition cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl">
                HOT SALE
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">FF UID TOPUP (BD)</h4>
                  <p className="text-xs text-gray-500 mt-0.5">25 Diamonds to 1015 Diamonds</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>{language === 'bn' ? 'টপ-আপ করুন' : 'Top-Up'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Weekly Offer */}
            <div
              onClick={() => setActiveTab('topup')}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Weekly Offer</h4>
                  <p className="text-xs text-gray-500 mt-0.5">450 Diamonds + Daily Drop</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>৳165 BDT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Monthly Offer */}
            <div
              onClick={() => setActiveTab('topup')}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl">
                BEST VALUE
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Monthly Offer</h4>
                  <p className="text-xs text-gray-500 mt-0.5">2600 Diamonds + VIP Rewards</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>৳790 BDT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* ID Marketplace */}
            <div
              onClick={() => setActiveTab('marketplace')}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl">
                THE VAULT
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Free Fire ID Market</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Heroic & Grandmaster Accounts</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>{language === 'bn' ? 'আইডি দেখুন' : 'Browse'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-xl gap-4">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-green-500/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Gemini AI Powered
            </span>
            <h3 className="text-xl font-black">Need Help with Top-Up or Account Appraisal?</h3>
            <p className="text-emerald-200 text-xs md:text-sm max-w-lg">
              Ask our intelligent AI assistant anything about Free Fire UID top-ups, bKash deposit verification, or upload screenshots for automated account analysis.
            </p>
          </div>
          <button
            onClick={() => setAiModalOpen(true)}
            className="bg-white text-emerald-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-emerald-50 transition shrink-0"
          >
            Open AI Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
