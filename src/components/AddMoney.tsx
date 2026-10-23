import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, PlusCircle, CreditCard, ShieldCheck, CheckCircle2, Clock, XCircle } from 'lucide-react';

export const AddMoney: React.FC = () => {
  const { currentUser, settings, createDeposit, deposits, language, setAuthModalOpen } = useApp();

  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [amount, setAmount] = useState<number>(500);
  const [senderNumber, setSenderNumber] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const merchantNumber = method === 'bKash' ? settings.bKashNumber : method === 'Nagad' ? settings.nagadNumber : settings.rocketNumber;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true, 'login');
      return;
    }
    if (!senderNumber || !transactionId) {
      alert('Please fill in your mobile number and transaction ID (TrxID).');
      return;
    }

    createDeposit(Number(amount), method, senderNumber, transactionId);
    setSuccessMsg('Deposit request submitted successfully! Admin will verify and credit your wallet within 5 minutes.');
    setSenderNumber('');
    setTransactionId('');
  };

  const userDeposits = deposits.filter(d => currentUser && d.userId === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="bg-green-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Instant Wallet Recharge
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-2">Add Money to Wallet</h2>
          <p className="text-emerald-100 text-xs md:text-sm mt-1">
            Deposit funds securely using bKash, Nagad or Rocket to purchase diamonds and accounts instantly without waiting.
          </p>
        </div>
        <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 items-center justify-center backdrop-blur-sm">
          <Wallet className="w-8 h-8 text-green-300" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Deposit Form */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-600" />
            <span>Deposit Request Form</span>
          </h3>

          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Select Method */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Select Payment Provider</label>
              <div className="grid grid-cols-3 gap-3">
                {(['bKash', 'Nagad', 'Rocket'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-3 px-4 rounded-2xl font-bold text-sm border-2 transition flex items-center justify-center gap-2 ${
                      method === m
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow'
                        : 'border-gray-200 hover:border-emerald-300 text-gray-600'
                    }`}
                  >
                    <span>{m}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 text-emerald-900">
              <p className="font-bold">Step-by-Step Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-emerald-800">
                <li>Go to your {method} App or dial <span className="font-mono font-bold">*247#</span> (bKash) / <span className="font-mono font-bold">*167#</span> (Nagad).</li>
                <li>Select <span className="font-bold">Send Money / Cash Out</span> to this number:</li>
              </ol>
              <div className="bg-white border border-emerald-300 rounded-xl p-3 flex justify-between items-center font-mono font-bold text-sm text-emerald-900">
                <span>{merchantNumber}</span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded uppercase">Personal</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Amount (BDT)</label>
                <input
                  type="number"
                  min="50"
                  max="25000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Your {method} Number</label>
                <input
                  type="text"
                  required
                  placeholder="017xxxxxxxx"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Transaction ID (TrxID)</label>
              <input
                type="text"
                required
                placeholder="Enter TrxID from SMS (e.g. 8N4821K9)"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-600 font-mono font-bold uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Submit Deposit Request</span>
            </button>
          </form>
        </div>

        {/* Current Wallet Balance Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Available Wallet Balance</span>
              <Wallet className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h2 className="text-3xl font-black">৳{currentUser?.walletBalance || 0} BDT</h2>
              <p className="text-xs text-emerald-100 mt-1">Instant checkout enabled</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <h4 className="font-black text-gray-900 text-sm">Deposit History</h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userDeposits.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No deposit requests yet.</p>
              ) : (
                userDeposits.map((dep) => (
                  <div key={dep.id} className="bg-gray-50 rounded-xl p-3 border border-gray-200 space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900">{dep.paymentMethod} • ৳{dep.amount}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        dep.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        dep.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {dep.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-mono text-[11px]">
                      <span>Trx: {dep.transactionId}</span>
                      <span>{new Date(dep.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
