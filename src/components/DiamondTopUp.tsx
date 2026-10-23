import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldAlert, Zap, ArrowRight, UserCheck, Wallet, CreditCard, Check } from 'lucide-react';

export const DiamondTopUp: React.FC = () => {
  const { packages, currentUser, createOrder, settings, language, setActiveTab } = useApp();

  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[2]?.id || packages[0]?.id || '');
  const [playerUid, setPlayerUid] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [isCheckingName, setIsCheckingName] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'Wallet' | 'bKash' | 'Nagad' | 'Rocket'>('Wallet');
  const [transactionId, setTransactionId] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const selectedPkg = packages.find(p => p.id === selectedPkgId);

  const handleCheckName = () => {
    if (!playerUid || playerUid.length < 6) {
      setErrorMsg('Please enter a valid Free Fire UID (at least 6 digits)');
      return;
    }
    setErrorMsg('');
    setIsCheckingName(true);
    setTimeout(() => {
      setIsCheckingName(false);
      // Simulate live player name lookup
      const fakeNames = [
        '『MAX』• ᏦᎥᏁᏳ',
        'Savage 77',
        'BD • TIGER',
        '『BAD BOY』',
        'Royal King BD'
      ];
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      setPlayerName(randomName);
    }, 700);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerUid) {
      setErrorMsg('Please enter your Free Fire Player UID.');
      return;
    }
    if (!playerName) {
      setErrorMsg('Please verify your Player UID first by clicking "Check Name".');
      return;
    }
    if (paymentMethod !== 'Wallet' && !transactionId) {
      setErrorMsg(`Please enter your ${paymentMethod} transaction ID (TrxID).`);
      return;
    }

    const res = createOrder(selectedPkgId, playerUid, playerName, paymentMethod, transactionId);
    if (res.success && res.order) {
      setOrderSuccess(res.order);
      setErrorMsg('');
    } else {
      setErrorMsg(res.message);
    }
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Order Placed Successfully!</h2>
            <p className="text-sm text-gray-600">Your order has been submitted to the queue.</p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 text-left space-y-3 text-sm border border-emerald-200">
            <div className="flex justify-between border-b border-emerald-200/60 pb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-bold text-emerald-800">{orderSuccess.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-emerald-200/60 pb-2">
              <span className="text-gray-600">Package:</span>
              <span className="font-bold text-gray-900">{orderSuccess.packageName}</span>
            </div>
            <div className="flex justify-between border-b border-emerald-200/60 pb-2">
              <span className="text-gray-600">Player UID & Name:</span>
              <span className="font-bold text-emerald-800">{orderSuccess.playerUid} ({orderSuccess.playerName})</span>
            </div>
            <div className="flex justify-between border-b border-emerald-200/60 pb-2">
              <span className="text-gray-600">Total Price:</span>
              <span className="font-bold text-emerald-700">৳{orderSuccess.price} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">{orderSuccess.status}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => { setOrderSuccess(null); setActiveTab('orders'); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition"
            >
              View My Orders
            </button>
            <button
              onClick={() => { setOrderSuccess(null); setPlayerUid(''); setPlayerName(''); }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl transition"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="bg-green-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Official Garena Partner API
          </span>
          <h2 className="text-2xl font-black mt-2">Free Fire UID Top-Up (BD)</h2>
          <p className="text-emerald-100 text-xs md:text-sm mt-1">
            Select your package, enter your UID, pay securely, and get diamonds credited instantly in 5 seconds.
          </p>
        </div>
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center backdrop-blur-sm">
          <Zap className="w-8 h-8 text-green-300" />
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="space-y-8">
        {/* Step 1: Select Package */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              1
            </div>
            <h3 className="font-black text-gray-900 text-lg">
              {language === 'bn' ? 'প্যাকেজ সিলেক্ট করুন — Diamond' : 'Select Package — Diamond'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {packages.filter(p => p.category === 'uid' || p.category === 'weekly' || p.category === 'monthly' || p.category === 'levelup').map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`border-2 rounded-2xl p-4 cursor-pointer transition flex items-center justify-between relative ${
                    isSelected ? 'border-emerald-600 bg-emerald-50/60 shadow-md' : 'border-gray-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-sm md:text-base">{pkg.name}</span>
                      {pkg.isHot && (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    {pkg.bonusDiamonds > 0 && (
                      <p className="text-xs text-emerald-600 font-semibold">+{pkg.bonusDiamonds} Bonus Diamonds</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-base md:text-lg font-black text-emerald-700">৳{pkg.price} TK</span>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Player UID & Name Check */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              2
            </div>
            <h3 className="font-black text-gray-900 text-lg">
              {language === 'bn' ? 'প্লেয়ার আইডি (UID)' : 'Player ID (UID)'}
            </h3>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Free Fire Player UID</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter UID (e.g. 1970045758)"
                value={playerUid}
                onChange={(e) => setPlayerUid(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-semibold"
              />
              <button
                type="button"
                onClick={handleCheckName}
                disabled={isCheckingName}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2 shadow shrink-0"
              >
                <UserCheck className="w-4 h-4" />
                <span>{isCheckingName ? 'Checking...' : 'নাম চেক করুন'}</span>
              </button>
            </div>

            {playerName && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
                <span className="font-medium">Player Verified:</span>
                <span className="font-black text-green-900 bg-white px-3 py-1 rounded-lg border border-green-300 shadow-sm">{playerName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Select Payment Method */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                3
              </div>
              <h3 className="font-black text-gray-900 text-lg">
                {language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}
              </h3>
            </div>
            {selectedPkg && (
              <div className="text-right">
                <span className="text-xs text-gray-500 font-semibold">Total Price: </span>
                <span className="text-lg font-black text-emerald-700">৳{selectedPkg.price} TK</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Wallet */}
            <div
              onClick={() => setPaymentMethod('Wallet')}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition flex flex-col items-center text-center space-y-2 ${
                paymentMethod === 'Wallet' ? 'border-emerald-600 bg-emerald-50 shadow-md' : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Website Wallet</h4>
                <p className="text-[10px] text-gray-500">Balance: ৳{currentUser?.walletBalance || 0}</p>
              </div>
            </div>

            {/* bKash */}
            <div
              onClick={() => setPaymentMethod('bKash')}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition flex flex-col items-center text-center space-y-2 ${
                paymentMethod === 'bKash' ? 'border-pink-600 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-pink-600 text-white flex items-center justify-center shadow font-bold text-xs">
                bKash
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">bKash Manual</h4>
                <p className="text-[10px] text-gray-500">Auto Verify</p>
              </div>
            </div>

            {/* Nagad */}
            <div
              onClick={() => setPaymentMethod('Nagad')}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition flex flex-col items-center text-center space-y-2 ${
                paymentMethod === 'Nagad' ? 'border-orange-600 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow font-bold text-xs">
                Nagad
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Nagad Manual</h4>
                <p className="text-[10px] text-gray-500">Fast Process</p>
              </div>
            </div>

            {/* Rocket */}
            <div
              onClick={() => setPaymentMethod('Rocket')}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition flex flex-col items-center text-center space-y-2 ${
                paymentMethod === 'Rocket' ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow font-bold text-xs">
                Rocket
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Rocket Manual</h4>
                <p className="text-[10px] text-gray-500">Secure Gateway</p>
              </div>
            </div>
          </div>

          {/* If manual payment method selected */}
          {paymentMethod !== 'Wallet' && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span>{paymentMethod} Payment Instructions</span>
              </div>
              <p className="text-xs text-gray-600">
                Send <span className="font-bold text-emerald-700">৳{selectedPkg?.price}</span> to our {paymentMethod} Merchant/Personal number:
              </p>
              <div className="bg-white border border-gray-300 rounded-xl p-3 flex justify-between items-center">
                <span className="font-mono font-bold text-emerald-800 text-sm md:text-base">
                  {paymentMethod === 'bKash' ? settings.bKashNumber : paymentMethod === 'Nagad' ? settings.nagadNumber : settings.rocketNumber}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold uppercase">Personal</span>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">Transaction ID (TrxID)</label>
                <input
                  type="text"
                  placeholder="Enter TrxID (e.g. 9N4821K9)"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-mono font-bold"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Order Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-base md:text-lg"
          >
            <span>{language === 'bn' ? 'অর্ডার কনফার্ম করুন' : 'Confirm & Place Order'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
